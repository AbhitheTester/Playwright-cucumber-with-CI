// generate-report.ts
// @ts-ignore
import { generate } from "multiple-cucumber-html-reporter";

generate({
  jsonDir: "test-results",
  reportPath: "test-results/html-report",
  metadata: {
    browser: {
      name: process.env.BROWSER || "chromium",
      version: "latest"
    },
    device: process.env.CI ? "Jenkins agent" : "Local test machine",
    platform: {
      name: process.platform,
      version: process.version
    }
  }
});
