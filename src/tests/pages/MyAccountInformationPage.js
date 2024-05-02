const Utils = require('../../../helpers/Utils');
const HomePage = require('./HomePage');
const { expect } = require("@playwright/test");

class MyAccountInformationPage extends HomePage {
    constructor() {
        super();

        this.myAccountInformationPageUrl = this.reader.getProperty('MyAccountInformation');

        this.firstNameTextbox = this.page.getByPlaceholder('First Name');
        this.lastNameTextbox = this.page.getByPlaceholder('Last Name');
        this.telephoneTextbox = this.page.getByPlaceholder('Telephone');
        this.emailTextbox = this.page.getByPlaceholder('E-Mail');
        this.buttonContinue = this.page.getByRole('button', { name: 'Continue' });
        this.buttonBack = this.page.getByRole('button', { name: 'Back' });
    }

    //---------------------------------------ACTION METHODS---------------------------------------
    async fillInformationEditingForm(dataTable) {
        const data = dataTable.rowsHash();
        await Utils.fillField(this.firstNameTextbox, data['First Name']);
        await Utils.fillField(this.lastNameTextbox, data['Last Name']);
        await Utils.fillField(this.telephoneTextbox, data['Telephone']);
        await Utils.fillField(this.emailTextbox, data['E-Mail']);
    }

    //---------------------------------------ASSERTION METHODS------------------------------------
    async assertEditingFormPrefilledWithDefaultData() {
        const nameFieldText = await this.firstNameTextbox.inputValue();
        const defaultNameText = await this.reader.getProperty('LoginName')
        expect(nameFieldText).toBe(defaultNameText);

        const surnameFieldText = await this.lastNameTextbox.inputValue();
        const defaultSurnameText = await this.reader.getProperty('LoginSurname')
        expect(surnameFieldText).toBe(defaultSurnameText);

        const telephoneFieldText = await this.telephoneTextbox.inputValue();
        const defaultTelephoneText = await this.reader.getProperty('LoginTelephone')
        expect(telephoneFieldText).toBe(defaultTelephoneText);

        const emailFieldText = await this.emailTextbox.inputValue();
        const defaultEmailText = await this.reader.getProperty('LoginEmail')
        expect(emailFieldText).toBe(defaultEmailText);
    }
}

module.exports = MyAccountInformationPage;
