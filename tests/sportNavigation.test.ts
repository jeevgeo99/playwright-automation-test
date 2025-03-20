import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Verify the Sport primary navigation color matches Football secondary navigation color', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToHomePage();
  await homePage.clickPrimaryNavigationLink('Sport');
  const sportColor = await homePage.getNavLinkColor('Sport');
  const footballColor = await homePage.getFootballSecondaryNavColor();
  console.log('Sport Primary Navigation Color:', sportColor);
  console.log('Football Secondary Navigation Color:', footballColor);
  expect(sportColor).toBe(footballColor);
});