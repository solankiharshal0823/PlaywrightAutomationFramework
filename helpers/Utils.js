const { expect } = require("@playwright/test");

class Utils {

    //---------------------------------------ACTION METHODS---------------------------------------
    static async fillField(field, text) {
        await field.fill('');
        await field.type(text);
    }

    static async visitPage(page, url) {
        await page.goto(url);
    }

    static async removeAllSpaces(inputText) {
        return inputText.replace(/\s/g, "");
    }

    //---------------------------------------ASSERTION METHODS------------------------------------
    static async assertLinkIsPresentInListElementByText(inputText, listElement) {
        const link = await listElement.locator(`xpath=//a[text()='${inputText}']`);
        expect(link).not.toBeNull();
    }

    static async validationWarningMessageIsDisplayed(inputValidationWarningText, field) {
        const validationMessage = await this.returnHTMLValidationWarningMessageText(field);
        expect(validationMessage).toBe(inputValidationWarningText, "Warning message doesn't match!");
    }

    static async assertLinksArePresentInElement(dataTable, element) {
        const data = dataTable.raw();
        for (const row of data) {
            const link = row[0];
            if (link && link.trim()) {
                this.assertLinkIsPresentInListElementByText(link, element)
            }
        }
    }

    static async assertInputTableSizeMatchesFormListSize(dataTable, element) {
        const data = dataTable.raw();
        const elementListSize = await element.count();
        expect(data.length).toBe(elementListSize);
    }

    static async assertElementTextMatchesInput(inputTitle, element) {
        const elementText = await element.textContent();
        expect(elementText).toBe(inputTitle);
    }

    //---------------------------------------FIND METHODS-----------------------------------------
    static async returnOptionFromListByText(inputText, listElement) {
        const link = await listElement.locator(`xpath=//a[text()='${inputText}']`);
        return link;
    }

    static async returnErrorMessageElementByText(inputErrorMessage, page) {
        counter++;
        return await page.$(`xpath=//div[@class='text-danger' and text()='${inputErrorMessage}']`);
    }

    static async returnHTMLValidationWarningMessageText(field) {
        return await field.evaluate(field => field.validationMessage);
    }

    static async returnSectionElementAfterHeading(heading) {
        const sectionElementLocator = heading.locator('xpath=following-sibling::ul');
        const sectionElement = await sectionElementLocator.first();
        return sectionElement;
    }

    static async returnSectionListAfterHeading(headingElement) {
        const sectionElement = await this.returnSectionElementAfterHeading(headingElement);
        const sectionList = await sectionElement.locator('li');
        return sectionList;
    }
    //--------------------------------------POSITION METHODS--------------------------------------
    static async returnObjectPageSide(element, page) {
        const side = 'Left';
        const elementLocation = await this.returnElementLocation(element);
        const pageWidth = await this.returnPageWidth(page);
        if (elementLocation.x > pageWidth / 2) {
            return 'Right';
        }
        return side;
    }

    static async returnElementLocation(element) {
        const location = await element.boundingBox();
        return { x: location.x, y: location.y };
    }

    static async returnPageWidth(page) {
        const viewportSize = page.viewportSize();
        return viewportSize.width;
    }

    static async findElementIndex(collection, element) {
        const count = await collection.count();
        for (let i = 0; i < count; i++) {
            const currentElement = await collection.nth(i);
            const currentElementText = await currentElement.innerText();
            if (currentElementText === await element.innerText()) {
                return i + 1;
            } 
        }
        return -1;
    }







};

module.exports = Utils;