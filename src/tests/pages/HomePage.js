const PropertiesReader = require('../../../helpers/PropertiesReader');
const { expect, test } = require("@playwright/test");
const Utils = require('../../../helpers/Utils');
const Hooks = require("../steps/Hooks");

class HomePage {
    constructor() {
        this.page = Hooks.getPage();
        this.reader = new PropertiesReader('configs/environment.properties');

        this.errorCounter = 0;

        this.homePageUrl = this.reader.getProperty('YourStore');
        this.shoppingCart = this.page.locator('xpath=//a[@title="Shopping Cart"]');
        this.myAccountDropdownOptionOrderHistory = this.page.getByRole('link', { name: 'Order History' });
        this.myAccountDropdownOptionLogin = this.page.getByRole('link', { name: 'Login' });
        this.desktopsDropdownTab = this.page.getByRole('link', { name: 'Desktops', exact: true });
        this.desktopsShowAll = this.page.getByRole('link', { name: 'Show All Desktops' });
        this.myAccountIcon = this.page.locator('xpath=//a[@title="My Account"]');
        this.listDropdownMyAccount = this.page.locator('xpath=//ul[@class="dropdown-menu dropdown-menu-right"]');
        this.alertDangerElement = this.page.locator('xpath=//*[@class="alert alert-danger alert-dismissible"]');
        this.alertSuccessElement = this.page.locator('xpath=//*[@class="alert alert-success alert-dismissible"]');
        this.errorMessages = this.page.locator('xpath=//div[@class="text-danger"]');
        this.phonesAndPDAsTab = this.page.getByRole('link', { name: 'Phones & PDAs' });


    }

    //---------------------------------------ACTION METHODS---------------------------------------
    async isLoggedIn() {
        let isLoggedIn = false;
        await this.myAccountIcon.click();
        try {
            await Utils.assertLinkIsPresentInListElementByText("Login", listDropdownMyAccount);
        } catch (e) {
            isLoggedIn = true;
        }
        await this.myAccountIcon.click();
        return isLoggedIn;
    }

    async selectOptionFromNavigationBarDropdown(optionName) {
        const option = await this.listDropdownMyAccount.locator(`xpath=//a[text()='${optionName}']`);
        await option.click();
    }

    //---------------------------------------ASSERTION METHODS------------------------------------
    async assertErrorMessagesAreDisplayed(dataTable) {
        const data = dataTable.raw();
        for (const row of data) {
            const errorMessage = row[0];
            this.assertAnErrorMessageIsDisplayed(errorMessage);
        }
    }

    async assertNoOtherErrorMessageIsDisplayed() {
        const actualErrorCount = await this.errorMessages.count();
        expect(actualErrorCount).toBe(this.errorCounter, "Number of displayed errors doesn't match!");
        this.errorCounter = 0;
    }

    async assertAnErrorMessageIsDisplayed(inputErrorMessage) {
        if (inputErrorMessage && inputErrorMessage.trim()) {
            const errorMessageElement = await this.page.locator(`xpath=//div[@class='text-danger' and text()='${inputErrorMessage}']`);
            const elementText = await errorMessageElement.textContent();
            expect(inputErrorMessage).toBe(elementText);
            expect(errorMessageElement).not.toBe(null, `Error message '${inputErrorMessage}' is not displayed!`);
            this.errorCounter++;
        }
    }




}

module.exports = HomePage;
