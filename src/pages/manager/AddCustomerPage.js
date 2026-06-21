import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCode = page.getByRole('textbox', { name: 'Post Code' });
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' })
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
    async fillThePostCode (postalCode) {
      await this.postalCode.fill(postalCode);
    }
    async clickAddCustomerButton () {
      await this.addCustomerButton.click();
    }    
    async clickCustomersButton () {
      await this.customersButton.click();
    }
    async reloadPage () {
      await this.page.reload()
    }
}
