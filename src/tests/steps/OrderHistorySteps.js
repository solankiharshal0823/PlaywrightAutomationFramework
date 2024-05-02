const { When, Then, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const OrderHistoryPage = require("../pages/OrderHistoryPage");

let orderHistoryPageInstance;

Before(() => {
    orderHistoryPageInstance = new OrderHistoryPage();
});

Then('user sees a new order added with credentials:', async function (dataTable)  {
  const data = dataTable.rowsHash();

  const customerCell = await orderHistoryPageInstance.returnLatestOrderCellByTitle("Customer");
  const quantityCell = await orderHistoryPageInstance.returnLatestOrderCellByTitle("No. of Products");
  const statusCell = await orderHistoryPageInstance.returnLatestOrderCellByTitle("Status");
  const totalCell = await orderHistoryPageInstance.returnLatestOrderCellByTitle("Total");
  const dateCell = await orderHistoryPageInstance.returnLatestOrderCellByTitle("Date Added");

  await expect(customerCell).toHaveText(data['Customer']);
  await expect(quantityCell).toHaveText(data['No. of Products']);
  await expect(statusCell).toHaveText(data['Status']);
  await expect(totalCell).toHaveText(data['Total']);
  await expect(dateCell).toHaveText(data['Date Added']);
})

Then('user clicks on the View button for the new order', async function ()  {
  await orderHistoryPageInstance.viewButton.click();
})
