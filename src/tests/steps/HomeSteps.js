const { Given, Then, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const HomePage = require("../pages/HomePage");
const Utils = require("../../../helpers/Utils");

let homePageInstance;

Before(() => {
  homePageInstance = new HomePage();
});

Given('user is at DemoShop HOME page', async function () {
  await Utils.visitPage(homePageInstance.page, homePageInstance.homePageUrl);
  await expect(homePageInstance.page).toHaveTitle('Your Store');
  await expect(homePageInstance.page).toHaveURL(homePageInstance.homePageUrl);
});

Then('user clicks Account icon at NAVIGATION BAR', async function () {
  await homePageInstance.myAccountIcon.click();
});


Then('user is NOT logged in', async function () {
  await expect(homePageInstance.isLoggedIn()).toBeFalsy;
})

Then('user is redirected to {string} page',{ timeout: 150000 }, async function (inputPageTitle) {
  const readerInput = await Utils.removeAllSpaces(inputPageTitle);
  const expectedPageUrl = await homePageInstance.reader.getProperty(readerInput);

  await homePageInstance.page.waitForURL(expectedPageUrl);

  await expect(homePageInstance.page).toHaveTitle(inputPageTitle);
  await expect(homePageInstance.page).toHaveURL(expectedPageUrl);
})

Then('user clicks {string} at Account dropdown menu', async function (inputString) {
  await homePageInstance.selectOptionFromNavigationBarDropdown(inputString);
})

Then('user remains on {string} page', async function (inputPageTitle) {
  const readerInput = await Utils.removeAllSpaces(inputPageTitle);
  const expectedPageUrl = await homePageInstance.reader.getProperty(readerInput);
  await expect(homePageInstance.page).toHaveTitle(inputPageTitle);
  await expect(homePageInstance.page).toHaveURL(expectedPageUrl);
})

Then('a warning appears: {string}', async function (inputAlertText) {
  const actualAlertText = await homePageInstance.alertDangerElement.textContent();
  await expect(actualAlertText).toBe(inputAlertText, "Warning text does not match!");
})

Then('the following error messages are displayed:', async function (datatable) {
  await homePageInstance.assertErrorMessagesAreDisplayed(datatable);
})

Then('no other input error message is displayed', async function () {
  await homePageInstance.assertNoOtherErrorMessageIsDisplayed();
})

Then('an error message {string} is displayed', async function (inputErroMessage) {
  await homePageInstance.assertAnErrorMessageIsDisplayed(inputErroMessage);
})

Then('user clicks on Shopping Cart in Navigation bar', async function() {
  await homePageInstance.shoppingCart.click();
})


