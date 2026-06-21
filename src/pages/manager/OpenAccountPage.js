import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.getByTestId('currency');
    this.usersDropdown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  async selectCurrency (currency) {
    await this.currencyDropdown.selectOption(currency);
  }
  async assertCurrency (currency) {
    await expect(this.currencyDropdown).toHaveValue(currency);
  }
  async selectCustomer(fullName) {
    await this.usersDropdown.selectOption({ label: fullName });
  }
  async clickProcessButton () {
    await this.processButton.click();
  }
  async reloadPage () {
    await this.page.reload();
  }
  async clickCustomersButton () {
    await this.customersButton.click();
  }
}
