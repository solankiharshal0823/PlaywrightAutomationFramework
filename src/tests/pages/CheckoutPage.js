const Utils = require('../../../helpers/Utils');
const HomePage = require('./HomePage');
const { expect, test } = require("@playwright/test");

class CheckoutPage extends HomePage {
    constructor() {
        super();

        this.checkoutPageUrl = this.reader.getProperty('Checkout');

        this.radioButtonNewBillingAddress = this.page.locator('#collapse-payment-address input[type=radio][value=new]');
        this.radioButtonOldBillingAddress = this.page.locator('#collapse-payment-address input[type=radio][value=existing]');
        this.nameFieldBilling = this.page.locator('#input-payment-firstname');
        this.surnameFieldBilling = this.page.locator('#input-payment-lastname');
        this.companyFieldBilling = this.page.locator('#input-payment-company');
        this.addressOneFieldBilling = this.page.locator('#input-payment-address-1');
        this.addressTwoFieldBilling = this.page.locator('#input-payment-address-2');
        this.cityFieldBilling = this.page.locator('#input-payment-city');
        this.postcodeFieldBilling = this.page.locator('#input-payment-postcode');
        this.countrySelectBilling = this.page.locator('#input-payment-country');
        this.regionSelectBilling = this.page.locator('#input-payment-zone');
        this.continueButtonBilling = this.page.locator('#button-payment-address');

        this.radioButtonNewShippingAddress = this.page.locator('#collapse-shipping-address input[type=radio][value=new]');
        this.radioButtonOldShippingAddress = this.page.locator('#collapse-shipping-address input[type=radio][value=existing]');
        this.nameFieldShipping = this.page.locator('#input-shipping-firstname');
        this.surnameFieldShipping = this.page.locator('#input-shipping-lastname');
        this.companyFieldShipping = this.page.locator('#input-shipping-company');
        this.addressOneFieldShipping = this.page.locator('#input-shipping-address-1');
        this.addressTwoFieldShipping = this.page.locator('#input-shipping-address-2');
        this.cityFieldShipping = this.page.locator('#input-shipping-city');
        this.postcodeFieldShipping = this.page.locator('#input-shipping-postcode');
        this.countrySelectShipping = this.page.locator('#input-shipping-country');
        this.regionSelectShipping = this.page.locator('#input-shipping-zone');
        this.continueButtonShippingAddress = this.page.locator('#button-shipping-address');

        this.commentFieldDelivery = this.page.locator('#collapse-shipping-method textarea[name="comment"]');
        this.commentFieldPayment = this.page.locator('#collapse-payment-method textarea[name="comment"]');

        this.policyCheckbox = this.page.locator('#collapse-payment-method input[type=checkbox][name="agree"]');
        this.confirmOrderButton = this.page.locator('#button-confirm');

        this.radioButtonFlatShippingRateDollars = this.page.locator('#collapse-shipping-method input[type=radio][value="flat.flat"]');
        this.continueButtonShippingMethod = this.page.locator('#button-shipping-method');
        
        this.radioButtonCashOnDelivery = this.page.locator('#collapse-payment-method input[type=radio][value=cod]');
        this.continueButtonPaymentMethod = this.page.locator('#button-payment-method');
   
   
        this.subTotalValueInTable = this.page.locator('xpath=//*[@id="collapse-checkout-confirm"]//td[preceding-sibling::td/strong[text() = "Sub-Total:"]]');
        this.flatShippingValueInTable = this.page.locator('xpath=//*[@id="collapse-checkout-confirm"]//td[preceding-sibling::td/strong[text() = "Flat Shipping Rate:"]]');
        this.ecoTaxlValueInTable = this.page.locator('xpath=//*[@id="collapse-checkout-confirm"]//td[preceding-sibling::td/strong[text() = "Eco Tax (-2.00):"]]');
        this.vatValueInTable = this.page.locator('xpath=//*[@id="collapse-checkout-confirm"]//td[preceding-sibling::td/strong[text() = "VAT (20%):"]]');
        this.totalValueInTable = this.page.locator('xpath=//*[@id="collapse-checkout-confirm"]//td[preceding-sibling::td/strong[text() = "Total:"]]');

        this.productTableHeadings = this.page.locator('#collapse-checkout-confirm .table-responsive thead td');
    
        this.sectionCheckoutOptions = this.page.locator('#collapse-checkout-option');
        this.sectionPaymentAddress = this.page.locator('#collapse-payment-address');
        this.sectionShippingAddress = this.page.locator('#collapse-shipping-address');
        this.sectionPaymentMethod = this.page.locator('#collapse-payment-method');
        this.sectionShippingMethod = this.page.locator('#collapse-shipping-method');
        this.sectionCheckout = this.page.locator('#collapse-checkout-confirm');
    }

    //---------------------------------------ACTION METHODS---------------------------------------

    async fillBillingAddressFormFromData(dataTable) {
        const data = dataTable.rowsHash();
        await Utils.fillField(this.nameFieldBilling, data['First Name']);
        await Utils.fillField(this.surnameFieldBilling, data['Last Name']);
        await Utils.fillField(this.companyFieldBilling, data['Company']);
        await Utils.fillField(this.addressOneFieldBilling, data['Address 1']);
        await Utils.fillField(this.addressTwoFieldBilling, data['Address 2']);
        await Utils.fillField(this.cityFieldBilling, data['City']);
        await Utils.fillField(this.postcodeFieldBilling, data['Post Code']);
        await this.countrySelectBilling.selectOption(data['Country']);
        await this.regionSelectBilling.selectOption(data['Region / State']);
    }

    async fillShippingAddressFormFromData(dataTable) {
        const data = dataTable.rowsHash();
        await Utils.fillField(this.nameFieldShipping, data['First Name']);
        await Utils.fillField(this.surnameFieldShipping, data['Last Name']);
        await Utils.fillField(this.companyFieldShipping, data['Company']);
        await Utils.fillField(this.addressOneFieldShipping, data['Address 1']);
        await Utils.fillField(this.addressTwoFieldShipping, data['Address 2']);
        await Utils.fillField(this.cityFieldShipping, data['City']);
        await Utils.fillField(this.postcodeFieldShipping, data['Post Code']);
        await this.countrySelectShipping.selectOption(data['Country']);
        await this.regionSelectShipping.selectOption(data['Region / State']);
    }

    async returnProductRowByText(inputText) {
        const productRow = await this.page.locator(`//*[@class="table-responsive"]//tbody//tr[td[a[text()="${inputText}"]]]`);
        return productRow;
    }

    async returnHeadingByText(inputText) {
        const heading = await this.page.locator(`//*[@class="table-responsive"]//thead//td[contains(text(), "${inputText}")]`);
        return heading;
    }

    async returnTableCellByProductNameAndHeadingTitle(headingTitle, productName) {
        const heading = await this.returnHeadingByText(headingTitle);
        const position = await Utils.findElementIndex(this.productTableHeadings, heading);
        
        const productRowXPath = await this.returnProductRowByText(productName);
        const tableCell = await productRowXPath.locator(`xpath=./td[${position}]`);

        return tableCell;
    }

    async assertTotalTableMatchesInputData(dataTable){
        const data = dataTable.rowsHash();
        await expect(await this.subTotalValueInTable).toHaveText(data['Sub-Total:'])
        await expect(await this.flatShippingValueInTable).toHaveText(data['Flat Shipping Rate:'])
        await expect(await this.totalValueInTable).toHaveText(data['Total:'])
    }
    

}

module.exports = CheckoutPage;
