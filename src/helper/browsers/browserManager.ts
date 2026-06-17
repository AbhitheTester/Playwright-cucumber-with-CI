

import { type LaunchOptions, chromium, firefox, webkit } from "@playwright/test";


const options: LaunchOptions = {
    headless: process.env.HEADLESS
        ? process.env.HEADLESS.toLowerCase() !== "false"
        : !!process.env.CI,
};

export const browseroptions = () => {
    const browserType = (process.env.BROWSER || "chromium").toLowerCase();
    switch (browserType) {
        case "chrome":
        case "chromium":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "safari":
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error(`Unsupported browser: ${browserType}`);
    }
};
