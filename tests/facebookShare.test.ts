import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Verify Facebook share functionality', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.clickFacebookShare();
});