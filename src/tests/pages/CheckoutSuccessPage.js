const Utils = require('../../../helpers/Utils');
const HomePage = require('./HomePage');

class CheckoutSuccessPage extends HomePage {
    constructor() {
        super();

        this.checkoutSuccessPageUrl = this.reader.getProperty('Yourorderhasbeenplaced!');

        this.continueButton = this.page.getByRole('link', { name: 'Continue' });
    }

    //---------------------------------------ACTION METHODS---------------------------------------

}

module.exports = CheckoutSuccessPage;
