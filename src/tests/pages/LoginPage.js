const Utils = require('../../../helpers/Utils');
const HomePage = require('./HomePage');

class LoginPage extends HomePage {
    constructor() {
        super();

        this.loginPageUrl = this.reader.getProperty('AccountLogin');
        this.emailTextbox = this.page.getByPlaceholder('E-Mail Address');
        this.passwordTextbox = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }

    //---------------------------------------ACTION METHODS---------------------------------------
    async fillLoginForm(username, password) {
        await Utils.fillField(this.emailTextbox, username);
        await Utils.fillField(this.passwordTextbox, password);
    }

    async fillLoginFormFromDataTable(dataTable) {
        const data = dataTable.rowsHash();
        await Utils.fillField(this.emailTextbox, data['E-Mail']);
        await Utils.fillField(this.passwordTextbox, data['Password']);
    }
}

module.exports = LoginPage;
