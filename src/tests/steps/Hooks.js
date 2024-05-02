const { BeforeAll, After, Before, Status } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");
const fs = require('fs');

let browser;
let page;
let launchOptions;
let context;

class Hooks {
  static async beforeAll() {
    console.log("BeforeAll hook started");
    const configData = fs.readFileSync("test-config.json", "utf8");
    const configFile = JSON.parse(configData);
    launchOptions = configFile.launchOptions;
    console.log("Using launch options:", launchOptions);
    console.log("BeforeAll hook completed");
  }

  static async beforeEach() {
    console.log("BeforeEach hook started");
    browser = await chromium.launch(launchOptions);
    context = await browser.newContext({ viewport: launchOptions.viewport })
    page = await context.newPage();
    console.log("BeforeEach hook completed");
  }

  static async afterEach(scenario) {
    console.log("AfterEach hook started");
    await Hooks.embedScreenshot.call(this, scenario);
    // await Hooks.logout();
    await page.context().clearCookies();
    await browser.close();
    console.log("AfterEach hook completed");
  }

  static async logout() {
    console.log("Logout hook started");
    await page.getByRole('link', { name: ' My Account' }).click();
    await page.locator('#top-links').getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveTitle("Account Logout");
    console.log("Logout hook completed");
  }

  static async embedScreenshot(scenario) {
    const { result, pickle } = scenario;
    if (result.status === Status.FAILED) {
      const name = pickle.name;
      const screenshotName = name.replace(/\s/g, '_');

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');

      const timestamp = `${day}.${month}.${year}_${hours}.${minutes}.${seconds}`;
      const path = `reports/screenshots/${screenshotName}_${timestamp}.png`;
      const fullName = `${screenshotName}_${timestamp}.png`;
      const screen = await page.screenshot({
        path:path,
        fullPage: true
      });
      await this.attach(screen, 'image/png', fullName);
    }
  }


  static getPage() {
    return page;
  }
}

BeforeAll(Hooks.beforeAll);
Before(Hooks.beforeEach);
After(Hooks.afterEach);

module.exports = Hooks;


// tagging for scenarios
// tagging for features
// configurable in terminal
// parallel configuration

//scenario name_timestamp