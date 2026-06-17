import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { PageFixture } from "../../hook/fixture.ts";

setDefaultTimeout(60000);

async function enterUsername(username: string) {
  await PageFixture.page.locator("#userEmail").fill(username);
}

async function enterPassword(password: string) {
  await PageFixture.page.locator('[type="password"]').fill(password);
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

Given('User is on Login Page', async function () {
  const baseUrl = getRequiredEnv("BaseURL");

  await PageFixture.page.goto(baseUrl, { waitUntil: "domcontentloaded" });
PageFixture.logger.info(`Navigated to Login Page: ${baseUrl}`);
});

When('User enters username {string}', async function (username: string) {
  await enterUsername(username);
});

When('User enters username as {string}', async function (username: string) {
  await enterUsername(username);
});

When('User enters password {string}', async function (password: string) {
  await enterPassword(password);
});

When(/^User enters username as ([^\s"]+)$/, async function (username: string) {
  await enterUsername(username);
});

When('User enters password as {string}', async function (password: string) {
  await enterPassword(password);
});

When('User enters username as {string} and password as {string}', async function (username: string, password: string) {
  await enterUsername(username);
  await enterPassword(password);
});

When('User enters username from environment', async function () {
  await enterUsername(getRequiredEnv("APP_USERNAME"));
});

When('User enters password from environment', async function () {
  await enterPassword(getRequiredEnv("APP_PASSWORD"));
});


When('User clicks on login button', async function () {
  await PageFixture.page.locator("[type='submit']").click();
  await PageFixture.page.waitForLoadState("networkidle");
  await PageFixture.page.waitForURL("**/dashboard/**", { timeout: 120000 });
  PageFixture.logger.info("Clicked on login button and navigated to Dashboard Page");
});

Then('User is on Dashboard Page', async function () {
  await expect(PageFixture.page.getByText("Automation Practice", { exact: true })).toBeVisible();

  PageFixture.logger.info("User is on Dashboard Page");
});
