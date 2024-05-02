const { When, Then, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const PhonesAndPDAsPage = require("../pages/PhonesAndPDAsPage");

let phonesAndPDAsPageInstance;

Before(() => {
    phonesAndPDAsPageInstance = new PhonesAndPDAsPage();
});


Then('user clicks on ADD TO CART button for product {string}', async function(productName) {
  const addToCartButton = await phonesAndPDAsPageInstance.returnAddToCartButtonByProductName(productName);
  await addToCartButton.click();
})
