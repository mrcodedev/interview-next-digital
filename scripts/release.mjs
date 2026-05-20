#!/usr/bin/env node

import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";

const PACKAGE_JSON_PATH = new URL("../package.json", import.meta.url);
const CHANGELOG_PATH = new URL("../CHANGELOG.md", import.meta.url);

const RELEASE_TYPES = {
  major: "Major",
  minor: "Minor",
  patch: "Patch",
};

function incrementVersion(currentVersion, releaseType) {
  const [major, minor, patch] = currentVersion.split(".").map(Number);

  if ([major, minor, patch].some((part) => Number.isNaN(part))) {
    throw new Error(`Invalid semver version: ${currentVersion}`);
  }

  if (releaseType === "major") {
    return `${major + 1}.0.0`;
  }

  if (releaseType === "minor") {
    return `${major}.${minor + 1}.0`;
  }

  return `${major}.${minor}.${patch + 1}`;
}

function toIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function buildChangelogEntry({ version, releaseType, description }) {
  return `## v${version} - ${toIsoDate()}\n\n- **Type:** ${RELEASE_TYPES[releaseType]}\n- **Description:** ${description}\n\n`;
}

function prependEntry(existingChangelog, entry) {
  const trimmed = existingChangelog.trimEnd();

  if (trimmed.length === 0) {
    return `# Changelog\n\nAll notable changes to this project are documented here.\n\n${entry}`;
  }

  if (trimmed.startsWith("# Changelog")) {
    const [headerLine, ...restLines] = trimmed.split("\n");
    const rest = restLines.join("\n").trimStart();
    return `${headerLine}\n\n${entry}${rest}\n`;
  }

  return `${entry}${trimmed}\n`;
}

function createGitTag(version) {
  execSync(`git tag v${version}`, { stdio: "inherit" });
}

async function run() {
  const rl = createInterface({ input, output });

  try {
    const packageJsonContent = await readFile(PACKAGE_JSON_PATH, "utf8");
    const packageJson = JSON.parse(packageJsonContent);
    const currentVersion = packageJson.version;

    if (!currentVersion) {
      throw new Error("package.json is missing the version field");
    }

    output.write(`\nCurrent version: v${currentVersion}\n`);

    const releaseTypeInput = (await rl.question("Release type (major/minor/patch): "))
      .trim()
      .toLowerCase();

    if (!Object.hasOwn(RELEASE_TYPES, releaseTypeInput)) {
      throw new Error("Release type must be major, minor, or patch");
    }

    const description = (await rl.question("Release description: ")).trim();

    if (!description) {
      throw new Error("Release description is required");
    }

    const createTagInput = (await rl.question("Create git tag? (y/N): ")).trim().toLowerCase();

    const shouldCreateTag = createTagInput === "y" || createTagInput === "yes";

    const nextVersion = incrementVersion(currentVersion, releaseTypeInput);

    packageJson.version = nextVersion;
    await writeFile(PACKAGE_JSON_PATH, `${JSON.stringify(packageJson, null, 2)}\n`);

    let existingChangelog = "";

    try {
      existingChangelog = await readFile(CHANGELOG_PATH, "utf8");
    } catch {
      existingChangelog = "";
    }

    const entry = buildChangelogEntry({
      version: nextVersion,
      releaseType: releaseTypeInput,
      description,
    });

    const newChangelog = prependEntry(existingChangelog, entry);
    await writeFile(CHANGELOG_PATH, newChangelog);

    if (shouldCreateTag) {
      createGitTag(nextVersion);
    }

    output.write(`\nRelease prepared: v${nextVersion}\n`);
    output.write("Updated files: package.json, CHANGELOG.md\n");

    if (shouldCreateTag) {
      output.write(`Created tag: v${nextVersion}\n`);
    }

    output.write(
      '\nNext step: git add package.json CHANGELOG.md && git commit -m "chore(release): v' +
        `${nextVersion}\"\n`
    );
  } finally {
    rl.close();
  }
}

run().catch((error) => {
  console.error(`\nRelease script failed: ${error.message}`);
  process.exit(1);
});
