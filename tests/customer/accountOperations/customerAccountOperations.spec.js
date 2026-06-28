import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test.beforeEach(async ({ page }) => {
    const loginPage =  new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);
    
    await loginPage.open();
    await loginPage.selectCustomer('Harry Potter');
    await loginPage.clickLoginButton();
    await accountPage.selectAccount('1004');
});

test('Assert customer can reset transactions', async ({ page }) => {
    
    const amount = faker.number.int(100).toString();
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new TransactionsPage(page);

    await accountPage.clickDepositButton();
    await accountPage.fillAmountInputField(amount);
    await accountPage.clickDepositFormButton();
    await accountPage.assertDepositSuccessfulMessageIsVisible();
    await page.waitForTimeout(1500); // Angular needs time to process the deposit before navigating to Transactions
    //otherwise the transaction row may not appear in the table.
    await accountPage.clickTransactionsButton();

    await transactionsPage.assertFirstRowIsVisible();
    await transactionsPage.clickResetButton();
    await transactionsPage.assertFirstRowIsHidden();

});
    test('Assert customer can navigate back from transactions', async ({ page }) => {
    const accountPage = new CustomerAccountPage(page);
    const transactionsPage = new TransactionsPage(page);

    await accountPage.clickTransactionsButton();
    await transactionsPage.clickBackButton();
    await accountPage.assertPageUrl();
});
