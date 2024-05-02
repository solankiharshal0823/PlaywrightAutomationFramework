const Utils = require('../../../helpers/Utils');
const HomePage = require('./HomePage');

class RegistrationPage extends HomePage {
    constructor() {
        super();

        this.registrationPageUrl = this.reader.getProperty('RegisterAccount');
        this.firstNameTextbox = this.page.getByPlaceholder('First Name');
        this.lastNameTextbox = this.page.getByPlaceholder('Last Name');
        this.emailTextbox = this.page.getByPlaceholder('E-Mail');
        this.telephoneTextbox = this.page.getByPlaceholder('Telephone');
        this.passwordTextbox = this.page.getByPlaceholder('Password', { exact: true });
        this.passwordConfirmTextbox = this.page.getByPlaceholder('Password Confirm');
        this.newsletterRadioButtonNo = this.page.getByLabel('No');
        this.privacyPolicyCheckBox = this.page.getByRole('checkbox');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    //---------------------------------------ACTION METHODS---------------------------------------
    async fillRegistrationForm(dataTable) {
        const data = dataTable.rowsHash();
        await Utils.fillField(this.firstNameTextbox, data['First Name']);
        await Utils.fillField(this.lastNameTextbox, data['Last Name']);
        await Utils.fillField(this.emailTextbox, data['E-Mail']);
        await Utils.fillField(this.telephoneTextbox, data['Telephone']);
        await Utils.fillField(this.passwordTextbox, data['Password']);
        await Utils.fillField(this.passwordConfirmTextbox, data['Password Confirm']);
    }

}

module.exports = RegistrationPage;
