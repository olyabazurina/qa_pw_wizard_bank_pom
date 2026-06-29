import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test.beforeEach(async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();
  await accountPage.selectAccount('1004');
});

test('Assert customer can successfully withdraw money', async ({ page }) => {

  const amount = faker.number.int(100).toString();
  const accountPage = new CustomerAccountPage(page);
  
  await accountPage.clickDepositButton();
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();
  await accountPage.clickWithdrawlButton();
  await page.waitForTimeout(1000); 
  // Angular needs time to switch the form before the input field can be filled
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickWithdrawlFormButton();
  await accountPage.assertWithdrawSuccessfulMessageIsVisible();
});