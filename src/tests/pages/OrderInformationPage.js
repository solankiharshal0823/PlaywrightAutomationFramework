const Utils = require('../../../helpers/Utils');
const HomePage = require('./HomePage');
const { expect, test } = require("@playwright/test");

class OrderInformationPage extends HomePage {
    constructor() {
        super();

        this.orderInformationPageUrl = this.reader.getProperty('OrderInformation');

        this.continueButton = this.page.getByRole('link', { name: 'Continue' });

        this.paymentMethod = this.page.locator('//b[contains(text(), "Payment Method:")]/following-sibling::text()[1]')
        this.shippingMethod = this.page.locator('//b[contains(text(), "Shipping Method:")]/following-sibling::text()[1]')
        this.methods = this.page.locator('//*[@id="content"]/table[1]/tbody/tr/td[2]');


        this.addressTableHeadingsRow = this.page.locator('//*[@id="content"]/table[2]/thead/tr');
        this.addressTableHeadings = this.page.locator('//*[@id="content"]/table[2]/thead/tr/td');
        this.addressTableRow = this.page.locator('//*[@id="content"]/table[2]/tbody/tr');

        this.productTableHeadingsRow = this.page.locator('//*[@id="content"]/div[1]/table/thead/tr');
        this.productTableHeadings= this.page.locator('//*[@id="content"]/div[1]/table/thead/tr/td');


        this.subTotalValueInTable = this.page.locator('(//*//tfoot//td[preceding-sibling::td/b[text() = "Sub-Total"]])[1]');
        this.flatShippingValueInTable = this.page.locator('(//*//tfoot//td[preceding-sibling::td/b[text() = "Flat Shipping Rate"]])[1]');
        this.totalValueInTable = this.page.locator('(//*//tfoot//td[preceding-sibling::td/b[text() = "Total"]])[1]');
    
    
        this.orderComment = this.page.locator('//*[@id="content"]/table[3]/tbody/tr/td');
    
    }

    //---------------------------------------ACTION METHODS---------------------------------------

    async returnHeadingByText(inputText, headingRow) {
        const heading = await headingRow.locator(`xpath=/td[contains(text(), "${inputText}")]`);
        return heading;
    }
    

    async returnLatestOrderAddressCellByTitle(headingTitle) {
        const heading = await this.returnHeadingByText(headingTitle, await this.addressTableHeadingsRow);
        
        const position = await Utils.findElementIndex(this.addressTableHeadings, heading);
    
        const tableCell = await this.addressTableRow.locator(`xpath=/td[${position}]`);
    
        return tableCell;
    }

    async returnProductRowByText(inputText) {
        const productRow = await this.page.locator(`//*[@class="table-responsive"]//tbody//tr[contains(td, "${inputText}")]`);
        return productRow;
    }

    async returnProductTableCellByProductNameAndHeadingTitle(headingTitle, productName) {
        const heading = await this.returnHeadingByText(headingTitle, await this.productTableHeadingsRow);
        const position = await Utils.findElementIndex(this.productTableHeadings, heading);
        
        const productRowXPath = await this.returnProductRowByText(productName);
        const tableCell = await productRowXPath.locator(`xpath=./td[${position}]`);

        return tableCell;
    }
    
    async assertAddressTableMatchesInput(dataTable, headingTitle) {
        const data = dataTable.raw();
        const collection = await this.returnLatestOrderAddressCellByTitle(headingTitle);
    
        const innerHTML = await collection.innerHTML();
        const textElements = await innerHTML.split('<br>').map(element => element.trim());
    
        for (let i = 0; i < textElements.length; i++) {
            await expect(textElements[i]).toBe(data[i][0].trim());
        }
    }

    async assertPaymentMethod(inputMethod, inputChoice) {
        const innerHTML = await this.methods.innerHTML();
        await expect(innerHTML).toContain(`<b>${inputMethod}:</b> ${inputChoice}`);
    }
    

    async assertProductTotalTableMatchesInputData(dataTable){
        const data = dataTable.rowsHash();
        await expect(await this.subTotalValueInTable).toHaveText(data['Sub-Total:'])
        await expect(await this.flatShippingValueInTable).toHaveText(data['Flat Shipping Rate:'])
        await expect(await this.totalValueInTable).toHaveText(data['Total:'])
    }
    



}

module.exports = OrderInformationPage;
