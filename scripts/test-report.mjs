import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const timestamp = new Date()
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(/\..+/, "")
  .replace("T", "-");
const reportName = `test-report-${timestamp}.txt`;
const reportPath = resolve(reportName);

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
const child = spawn(npmCmd, ["run", "test:coverage"], {
  stdio: ["inherit", "pipe", "pipe"],
});

const output = createWriteStream(reportPath, { flags: "w" });

child.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);
  output.write(chunk);
});

child.stderr.on("data", (chunk) => {
  process.stderr.write(chunk);
  output.write(chunk);
});

child.on("close", (code) => {
  output.end();
  console.log(`Saved test report: ${reportName}`);
  process.exit(code ?? 1);
});
