import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer can switch between accounts', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Hermoine Granger');
  await customerLoginPage.clickLoginButton();
  
// Account 1001 - Dollar
  await accountPage.selectAccount('1001');
  await accountPage.assertAccountLineContainsText('Account Number : 1001');
  await accountPage.assertAccountLineContainsText('Balance : 5096');
  await accountPage.assertAccountLineContainsText('Currency : Dollar');

  // Account 1002 - Pound
  await accountPage.selectAccount('1002');
  await accountPage.assertAccountLineContainsText('Account Number : 1002');
  await accountPage.assertAccountLineContainsText('Balance : 0');
  await accountPage.assertAccountLineContainsText('Currency : Pound');

  // Account 1003 - Rupee
  await accountPage.selectAccount('1003');
  await accountPage.assertAccountLineContainsText('Account Number : 1003');
  await accountPage.assertAccountLineContainsText('Balance : 0');
  await accountPage.assertAccountLineContainsText('Currency : Rupee');
});
