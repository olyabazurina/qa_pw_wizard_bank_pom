import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Customer can successfully log in', async ({ page }) => {
    const bankHomePage = new BankHomePage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const customerAccountPage = new CustomerAccountPage(page);

    await bankHomePage.open();
    await bankHomePage.clickCustomerLoginButton();
    await customerLoginPage.waitForOpened();

    await customerLoginPage.selectCustomer('Hermoine Granger');
    await customerLoginPage.clickLoginButton();
    await customerAccountPage.assertLogoutButtonIsVisible();
});