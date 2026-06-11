import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.postCode = page.getByRole('textbox', { name: 'Post Code' });
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' })
    // рядки таблиці — всі tr всередині tbody
    this.lastRow = page.locator('tbody tr').last();

    // клітинки всередині останнього рядка
    this.lastRowFirstName = this.lastRow.locator('td').nth(0);
    this.lastRowLastName  = this.lastRow.locator('td').nth(1);
    this.lastRowPostCode  = this.lastRow.locator('td').nth(2);
    this.lastRowAccount   = this.lastRow.locator('td').nth(3);
  }
  
    async open () {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
    }
    async fillTheFirstName (firstName) {
      await this.firstName.fill(firstName);
    }
    async fillTheLastName (lastName) {
      await this.lastName.fill(lastName);
    }
    async fillThePostCode (postCode) {
      await this.postCode.fill(postCode);
    }
    async clickAddCustomerButton () {
      await this.addCustomerButton.click();
    }    
    async clickCustomersButton () {
      await this.customersButton.click();
    }
    async assertLastRowFirstName(firstName) {
      await expect(this.lastRowFirstName).toHaveText(firstName);
    }
    async assertLastRowLastName(lastName) {
      await expect(this.lastRowLastName).toHaveText(lastName);
    }
    async assertLastRowPostCode(postCode) {
      await expect(this.lastRowPostCode).toHaveText(postCode);
    }
    async assertLastRowAccountEmpty() {
      await expect(this.lastRowAccount).toHaveText('');
    }

}
