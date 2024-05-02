const { When, Then, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");

let loginPageInstance;

Before(() => {
    loginPageInstance = new LoginPage();
});

When('user fills in login form with valid credentials', async function () {
    await loginPageInstance.fillLoginForm(loginPageInstance.reader.getProperty('LoginEmail'), loginPageInstance.reader.getProperty('LoginPassword'));
});

Then('user clicks Login button below Login form', async function () {
    await loginPageInstance.loginButton.click();
});

When('user fills in login form with credentials:', async function (dataTable) {
    await loginPageInstance.fillLoginFormFromDataTable(dataTable);
});