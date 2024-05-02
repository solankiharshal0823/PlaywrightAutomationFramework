const { Then, When, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const MyAccountInformationPage = require("../pages/MyAccountInformationPage");

let myAccountInformationPageInstance;

Before(() => {
    myAccountInformationPageInstance = new MyAccountInformationPage();
});

Then('user fills in personal details editing form:', async function (dataTable) {
    await myAccountInformationPageInstance.fillInformationEditingForm(dataTable);
});

Then('user clicks Continue button below personal details editing form', async function () {
    await myAccountInformationPageInstance.buttonContinue.click();
});

Then('user clicks Back button below personal details editing form', async function () {
    await myAccountInformationPageInstance.buttonBack.click();
});

Then('input fields are prefilled with default users credentials', async function () {
    await myAccountInformationPageInstance.assertEditingFormPrefilledWithDefaultData();
});