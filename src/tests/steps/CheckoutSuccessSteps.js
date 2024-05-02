const { When, Then, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const CheckoutSuccessPage = require("../pages/CheckoutSuccessPage");

let checkoutSuccessPageInstance;

Before(() => {
  checkoutSuccessPageInstance = new CheckoutSuccessPage();
});


Then('user clicks the Continue button at the bottom of the page', async function()  {
  await checkoutSuccessPageInstance.continueButton.click();
})

