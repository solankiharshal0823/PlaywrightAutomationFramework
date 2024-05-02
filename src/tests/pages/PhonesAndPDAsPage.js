const Utils = require('../../../helpers/Utils');
const HomePage = require('./HomePage');

class PhonesAndPDAsPage extends HomePage {
    constructor() {
        super();
        this.phonesAndPDAsPageUrl = this.reader.getProperty('Phones&PDAs');
    }

    //---------------------------------------ACTION METHODS---------------------------------------
    async returnProductCaptionByProductName(inputProductName) {
        const caption = await this.page.locator(`xpath=//div[contains(@class, 'product-thumb')]//*[contains(@class, 'caption')][.//*[text()='${inputProductName}']]`);
        return caption;
    }
    
    async returnButtonGroupByProductName(inputProductName) {
        const productCaption = await this.returnProductCaptionByProductName(inputProductName);
        const buttonGroup = await productCaption.locator('xpath=following-sibling::div');
        return buttonGroup;
    }
    
    async returnAddToCartButtonByProductName(inputProductName) {
        const buttonGroup = await this.returnButtonGroupByProductName(inputProductName);
        const addToCartButtonLocator = await buttonGroup.locator('xpath=.//button[contains(@onclick, "cart.add")]');
        return addToCartButtonLocator;
    }
    
    
    
}

module.exports = PhonesAndPDAsPage;
