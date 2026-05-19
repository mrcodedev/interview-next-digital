import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const reportPath = resolve("coverage", "index.html");

if (process.env.CI === "true") {
  console.log("CI detected: skipping browser open for coverage report.");
  process.exit(0);
}

if (!existsSync(reportPath)) {
  console.error("Coverage report not found. Run npm run test:coverage first.");
  process.exit(1);
}

const launch = () => {
  if (process.platform === "darwin") {
    return spawn("open", [reportPath], { detached: true, stdio: "ignore" });
  }

  if (process.platform === "win32") {
    return spawn("cmd", ["/c", "start", "", reportPath], {
      detached: true,
      stdio: "ignore",
    });
  }

  return spawn("xdg-open", [reportPath], { detached: true, stdio: "ignore" });
};

try {
  const child = launch();
  child.on("error", () => {
    console.log(`Could not open browser automatically. Open this file manually: ${reportPath}`);
  });
  child.unref();
  console.log(`Coverage report ready: ${reportPath}`);
} catch {
  console.log(`Could not open browser automatically. Open this file manually: ${reportPath}`);
}
