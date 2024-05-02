const { When, Then, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const OrderInformationPage = require("../pages/OrderInformationPage");

let orderInformationPageInstance;

Before(() => {
  orderInformationPageInstance = new OrderInformationPage();
});

Then('user sees {string} in order details: {string}', async function (inputMethod, inputText) {
  await orderInformationPageInstance.assertPaymentMethod(inputMethod, inputText);
})

Then('user sees Shipping method in order details: {string}', async function (inputText) {
  const shippingMethod = await orderInformationPageInstance.shippingMethod;
  await expect(shippingMethod).toHaveText(inputText);
})

Then('user sees Order Comments {string}', async function (inputText) {
  const comment = await orderInformationPageInstance.orderComment;
  await expect(comment).toHaveText(inputText);
})

Then('user sees sub-total table:', async function (dataTable) {
  await orderInformationPageInstance.assertProductTotalTableMatchesInputData(dataTable);
})

Then('user sees products table:', { timeout: 150000 }, async function (dataTable) {
  const data = dataTable.rowsHash();
  const productName = await data['Product Name'];
  let productRow;

  while (!productRow) {
    productRow = await orderInformationPageInstance.returnProductRowByText(productName);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await expect(productRow).not.toBeNull;

  const nameCell = await orderInformationPageInstance.returnProductTableCellByProductNameAndHeadingTitle("Product Name", productName);
  const quantityCell = await orderInformationPageInstance.returnProductTableCellByProductNameAndHeadingTitle("Quantity", productName);
  const priceCell = await orderInformationPageInstance.returnProductTableCellByProductNameAndHeadingTitle("Price", productName);
  const totalCell = await orderInformationPageInstance.returnProductTableCellByProductNameAndHeadingTitle("Total", productName);

  await expect(nameCell).toHaveText(data['Product Name']);
  await expect(quantityCell).toHaveText(data['Quantity']);
  await expect(priceCell).toHaveText(data['Unit Price']);
  await expect(totalCell).toHaveText(data['Total']);
})

Then('user in {string} table following credentials:', async function (inputText, dataTable) {
  await orderInformationPageInstance.assertAddressTableMatchesInput(dataTable, inputText);
})
