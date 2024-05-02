const Utils = require('../../../helpers/Utils');
const HomePage = require('./HomePage');
const { expect } = require("@playwright/test");

class ShoppingCartPage extends HomePage {
    constructor() {
        super();

        this.shoppingCartPageUrl = this.reader.getProperty('ShoppingCart');
        
        this.checkoutButton = this.page.getByRole('link', { name: 'Checkout', exact: true });
        
        this.shoppingCartContentTable = this.page.locator('xpath=//*[@class="table-responsive"]');
        this.subTotalValueInFinalTable = this.page.locator('xpath=//td[preceding-sibling::td/strong[text() = "Sub-Total:"]]');
        this.ecoTaxValueInFinalTable = this.page.locator('xpath=//td[preceding-sibling::td/strong[text() = "Eco Tax (-2.00):"]]');
        this.vatValueInFinalTable = this.page.locator('xpath=//td[preceding-sibling::td/strong[text() = "VAT (20%):"]]');
        this.totalValueInFinalTable = this.page.locator('xpath=//td[preceding-sibling::td/strong[text() = "Total:"]]');

        this.productTableHeadings = this.page.locator('#content .table-responsive thead td');
    }

    //---------------------------------------ACTION METHODS---------------------------------------

    async returnProductRowByText(inputText) {
        const productRow = await this.page.locator(`//*[@class="table-responsive"]//tbody//tr[td[a[text()='${inputText}']]]`);
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

    async returnQuantityInputFieldByProductNameAndHeadingTitle(productName) {
        const productRowXPath = await this.returnProductRowByText(productName);
        const quantityInputField = await productRowXPath.locator(`xpath=//*[name()='input'][contains(@name, 'quantity')]`);

        return quantityInputField;
    }
    

    async assertSubtotalTableMatchesInputData(dataTable){
        const data = dataTable.rowsHash();
        expect(await this.subTotalValueInFinalTable).toHaveText(data['Sub-Total:'])
        expect(await this.ecoTaxValueInFinalTable).toHaveText(data['Eco Tax (-2.00):'])
        expect(await this.vatValueInFinalTable).toHaveText(data['VAT (20%):'])
        expect(await this.totalValueInFinalTable).toHaveText(data['Total:'])
    }

    

}

module.exports = ShoppingCartPage;
