const Utils = require('../../../helpers/Utils');
const HomePage = require('./HomePage');

class OrderHistoryPage extends HomePage {
    constructor() {
        super();

        this.orderHistoryPageUrl = this.reader.getProperty('OrderHistory');

        this.continueButton = this.page.getByRole('link', { name: 'Continue' });

        // this.orderHistoryTable = this.page.locator('.table-responsive > table');
        this.productTableHeadings = this.page.locator('.table-responsive > table thead td');
        this.firstTableRow = this.page.locator('.table-responsive > table tbody tr:nth-of-type(1)');
        this.viewButton = this.page.locator('#content > div.table-responsive > table > tbody > tr:nth-child(1) > td:nth-child(7) > a');

    }

    //---------------------------------------ACTION METHODS---------------------------------------
    async returnHeadingByText(inputText) {
        const heading = await this.page.locator(`//table[contains(@class, 'table table-bordered table-hover')]//thead//td[contains(text(), "${inputText}")]`);
        return heading;
    }

    async returnLatestOrderCellByTitle(headingTitle) {
        const heading = await this.returnHeadingByText(headingTitle);
        
        const position = await Utils.findElementIndex(this.productTableHeadings, heading);

        const tableCell = await this.firstTableRow.locator(`td:nth-child(${position})`);

        return tableCell;
    }

}

module.exports = OrderHistoryPage;
