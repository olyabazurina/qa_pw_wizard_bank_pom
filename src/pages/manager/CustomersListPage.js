import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    // Table rows — all tr elements inside tbody
    this.lastRow = page.locator('tbody tr').last();

    // Cells of the last row 
    this.lastRowFirstName = this.lastRow.locator('td').nth(0);
    this.lastRowLastName  = this.lastRow.locator('td').nth(1);
    this.lastRowPostCode  = this.lastRow.locator('td').nth(2);
    this.lastRowAccount   = this.lastRow.locator('td').nth(3);
    
    this.customerRows = page.locator('tbody tr');
    this.searchField = page.getByRole('textbox', { name: 'Search Customer' });
    this.deleteCustomerButton = page.getByRole('button', { name: 'Delete' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async assertLastRowFirstName(firstName) {
    await expect(this.lastRowFirstName).toHaveText(firstName);
  }
  async assertLastRowLastName(lastName) {
    await expect(this.lastRowLastName).toHaveText(lastName);
  }
  async assertLastRowPostCode(postalCode) {
    await expect(this.lastRowPostCode).toHaveText(postalCode);
  }
  async assertLastRowAccountEmpty() {
    await expect(this.lastRowAccount).toHaveText('');
  }
  async searchCustomer(searchText) {
    await this.searchField.fill(searchText);
  }
  async clickDeleteCustomerButton(firstName, lastName, postalCode) {
    const row = this.customerRows
      .filter({ hasText: firstName })
      .filter({ hasText: lastName })
      .filter({ hasText: postalCode });
    await row.getByRole('button', { name: 'Delete' }).click();
  }
  async assertCustomerNotPresent(firstName, lastName, postalCode) {
    const row = this.customerRows
      .filter({ hasText: firstName })
      .filter({ hasText: lastName })
      .filter({ hasText: postalCode });
    await expect(row).toHaveCount(0);
  }
  async reloadPage() {
    await this.page.reload();
  }
  async assertLastRowAccountNotEmpty() {
    await expect(this.lastRowAccount).not.toHaveText('');
  }

  async assertCustomerRowCount(count) {
  await expect(this.customerRows).toHaveCount(count);
  }

  async assertCustomerRowContains(firstName, lastName, postalCode) {
  await expect(this.customerRows.first()).toContainText(firstName);
  await expect(this.customerRows.first()).toContainText(lastName);
  await expect(this.customerRows.first()).toContainText(postalCode);
  }

}
