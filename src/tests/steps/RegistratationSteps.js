const { When, Then, Before } = require("@cucumber/cucumber");
const { expect, test } = require("@playwright/test");
const RegistrationPage = require("../pages/RegistrationPage");
const Utils = require("../../../helpers/Utils");

let registrationPageInstance;

Before(() => {
  registrationPageInstance = new RegistrationPage();
});

When('user fills in registration form with credentials:', async function (dataTable) {
  await registrationPageInstance.fillRegistrationForm(dataTable);
})

Then('user clicks Continue button below Registration form', async function () {
  await registrationPageInstance.continueButton.click();
})

Then('user checks Privacy Policy checkbox', async function () {
  await registrationPageInstance.privacyPolicyCheckBox.click();
})

When('user selects the No radiobutton from Subscription options', async function () {
  await registrationPageInstance.newsletterRadioButtonNo.click();
})

Then('an e-mail validation warning message {string} is displayed', async function (inputValidationWarningText) {
  await Utils.validationWarningMessageIsDisplayed(inputValidationWarningText, registrationPageInstance.emailTextbox);
})