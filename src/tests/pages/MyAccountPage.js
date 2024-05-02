const HomePage = require('./HomePage');
const Utils = require('../../../helpers/Utils');
const { expect } = require("@playwright/test");

class MyAccountPage extends HomePage {
    constructor() {
        super();
        this.myAccountPageUrl = this.reader.getProperty('MyAccount');
        this.accountUpdateSuccessMessage = this.page.getByText('Success: Your account has');
        this.editAccountLinkRightSubMenu = this.page.getByRole('link', { name: 'Edit Account' });
   
        this.leftMenu = this.page.locator('#content');
        this.listLeftMenu = this.page.locator('xpath=//*[@id="content"]/h2');
        this.rightMenu = this.page.locator('#column-right');
        this.listRightMenu = this.page.locator('#column-right .list-group a');
   
    }
    
    //---------------------------------------ASSERTION METHODS------------------------------------
    async assertSectionsArePresent(dataTable) {
        const data = dataTable.raw();
        for (const row of data) {
            const sectionTitle = row[0];
            const heading = await this.returnHeadingFromLeftMenuByText(sectionTitle);
            await Utils.assertElementTextMatchesInput(sectionTitle, heading);
            const section = await Utils.returnSectionElementAfterHeading(heading);
            expect(section).toBeTruthy();
        }
    }
    
    async assertFieldsArePresentInElement(sectionTitle, dataTable) {
        const heading = await this.returnHeadingFromLeftMenuByText(sectionTitle);
        const section = await Utils.returnSectionElementAfterHeading(heading);
        const data = dataTable.raw();
        for (const row of data) {
            const link = row[0];
            const element = await Utils.returnOptionFromListByText(link, section);
            await Utils.assertElementTextMatchesInput(link, element);
            expect(element).not.toBeNull();
        }
    }

    //---------------------------------------FIND METHODS-----------------------------------------
    async returnAnOptionFromSection(sectionTitle, linkText) {
        const heading = await this.returnHeadingFromLeftMenuByText(sectionTitle);
        const section = await Utils.returnSectionElementAfterHeading(heading);
        const element = await Utils.returnOptionFromListByText(linkText, section);
        return element;
    }
    
    async returnHeadingFromLeftMenuByText(inputTitle) {
        const heading = await this.leftMenu.locator(`xpath=//h2[text()='${inputTitle}']`);
        return heading;
    }

};

module.exports = MyAccountPage;