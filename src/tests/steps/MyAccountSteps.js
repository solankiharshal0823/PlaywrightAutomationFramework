const { Then, When, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const MyAccountPage = require("../pages/MyAccountPage");
const Utils = require("../../../helpers/Utils");

let myAccountPageInstance;

Before(() => {
    myAccountPageInstance = new MyAccountPage();
});

Then('user is redirected to My Account page', async function () {
    await expect(myAccountPageInstance.page).toHaveTitle('My Account');
    await expect(myAccountPageInstance.page).toHaveURL(myAccountPageInstance.myAccountPageUrl);
});

Then('account update success message is displayed', async function () {
    await expect(myAccountPageInstance.accountUpdateSuccessMessage).toBeVisible();
});

When('user selects Edit Account option in right sub menu', async function () {
    await myAccountPageInstance.editAccountLinkRightSubMenu.click();
});

When('user sees sub menu on the {string} side of the page', async function (inputSide) {
    const side = await Utils.returnObjectPageSide(myAccountPageInstance.rightMenu, myAccountPageInstance.page);
    expect(side).toBe(inputSide);
});

When('user sees menu on the {string} side of the page', async function (inputSide) {
    const side = await Utils.returnObjectPageSide(myAccountPageInstance.leftMenu, myAccountPageInstance.page);
    expect(side).toBe(inputSide);
});

When('only the following links are present:', async function (dataTable) {
    await Utils.assertLinksArePresentInElement(dataTable, myAccountPageInstance.rightMenu);
    await Utils.assertInputTableSizeMatchesFormListSize(dataTable, myAccountPageInstance.listRightMenu);
});

When('user clicks {string} button in the sub menu', async function (inputName) {
    const link = await Utils.returnOptionFromListByText(inputName, myAccountPageInstance.rightMenu);
    await link.click();
});

When('only the following sections are present:', async function (dataTable) {
    await myAccountPageInstance.assertSectionsArePresent(dataTable);
    await Utils.assertInputTableSizeMatchesFormListSize(dataTable, myAccountPageInstance.listLeftMenu);
});

When('section {string} contains only the following options:', async function (inputHeadingText, dataTable) {
    await myAccountPageInstance.assertFieldsArePresentInElement(inputHeadingText, dataTable);
    const heading = await myAccountPageInstance.returnHeadingFromLeftMenuByText(inputHeadingText);
    const section = await Utils.returnSectionListAfterHeading(heading);
    await Utils.assertInputTableSizeMatchesFormListSize(dataTable, section);
});

When('in section {string} user clicks {string}', async function (sectionTitle, linkText) {
    const link = await myAccountPageInstance.returnAnOptionFromSection(sectionTitle, linkText);
    await link.click();
});