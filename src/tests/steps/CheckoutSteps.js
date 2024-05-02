const { When, Then, Before } = require("@cucumber/cucumber");
const { expect, test } = require("@playwright/test");
const CheckoutPage = require("../pages/CheckoutPage");
const Utils = require("../../../helpers/Utils");

let checkoutPageInstance;

Before(() => {
  checkoutPageInstance = new CheckoutPage();
});

Then('user fills in the new Billing address form with following credentials:', async function (dataTable) {
  await checkoutPageInstance.fillBillingAddressFormFromData(dataTable);
})

Then('user selects option in Delivery Details: I want to use a new address', async function () {
  await checkoutPageInstance.radioButtonNewShippingAddress.check();
})

Then('user clicks the Continue button at the bottom of the Billing Details form', async function () {
  await checkoutPageInstance.continueButtonBilling.click();
})

Then('user fills in the new Delivery address form with following credentials:', async function (dataTable) {
  await checkoutPageInstance.fillShippingAddressFormFromData(dataTable);
})

Then('user selects option in Billing Details: I want to use a new address', async function () {
  await checkoutPageInstance.radioButtonNewBillingAddress.check();
})

Then('user selects in Payment Method: Cash On Delivery', async function () {
  await checkoutPageInstance.radioButtonCashOnDelivery.check();
})

Then('user clicks the Continue button at the bottom of the Delivery Method form', async function () {
  await checkoutPageInstance.continueButtonShippingMethod.click();
})

Then('user types Delivery comment {string}', async function (inputText) {
  const commentField = await checkoutPageInstance.commentFieldDelivery;
  await Utils.fillField(commentField, inputText);
})

Then('user types Payment comment {string}', async function (inputText) {
  const commentField = await checkoutPageInstance.commentFieldPayment;
  await Utils.fillField(commentField, inputText);
})

Then('user selects in Delivery Method: Flat Shipping Rate - $5.00', async function () {
  await checkoutPageInstance.radioButtonFlatShippingRateDollars.check();
})

Then('user clicks the Continue button at the bottom of the Delivery Details form', async function () {
  await checkoutPageInstance.continueButtonShippingAddress.click();
})

Then('user sees the subtotal table and it has following product credentials:', async function (dataTable) {
  const data = dataTable.rowsHash();
  const productName = await data['Product Name'];
  let productRow;

  while (!productRow) {
    productRow = await checkoutPageInstance.returnProductRowByText(productName);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await expect(productRow).not.toBeNull;

  const nameCell = await checkoutPageInstance.returnTableCellByProductNameAndHeadingTitle("Product Name", productName);
  const quantityCell = await checkoutPageInstance.returnTableCellByProductNameAndHeadingTitle("Quantity", productName);
  const priceCell = await checkoutPageInstance.returnTableCellByProductNameAndHeadingTitle("Unit Price", productName);
  const totalCell = await checkoutPageInstance.returnTableCellByProductNameAndHeadingTitle("Total", productName);

  await expect(nameCell).toHaveText(data['Product Name']);
  await expect(quantityCell).toHaveText(data['Quantity']);
  await expect(priceCell).toHaveText(data['Unit Price']);
  await expect(totalCell).toHaveText(data['Total']);
})

Then('user clicks the Continue button at the bottom of the Payment Method form', async function () {
  await checkoutPageInstance.continueButtonPaymentMethod.click();
})

Then('user ticks-in checkbox: I have read and agree to the Terms & Conditions', async function () {
  await checkoutPageInstance.policyCheckbox.check();
})

Then('user clicks the Confirm Order button at the bottom of the Confirm Order form', async function () {
  await checkoutPageInstance.confirmOrderButton.click();
})

Then('user sees the subtotal table and it has following sub-total results:', async function (dataTable) {
  await checkoutPageInstance.assertTotalTableMatchesInputData(dataTable);
})


