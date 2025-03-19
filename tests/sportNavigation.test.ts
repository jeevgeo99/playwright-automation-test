import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Verify the Sport primary navigation color matches Football secondary navigation color', async ({ page }) => {
  const homePage = new HomePage(page);

  // Navigate to the home page
  await homePage.navigateToHomePage();

  // Click on "Sport" in the primary navigation
  await homePage.clickPrimaryNavigationLink('Sport');

  // Get the color of the "Sport" primary navigation link
  const sportColor = await homePage.getNavLinkColor('Sport');

  // Get the color of the "Football" secondary navigation link
  const footballColor = await homePage.getFootballSecondaryNavColor();

  // Log the colors (optional)
  console.log('Sport Primary Navigation Color:', sportColor);
  console.log('Football Secondary Navigation Color:', footballColor);

  // Verify that the colors match
  expect(sportColor).toBe(footballColor);
});