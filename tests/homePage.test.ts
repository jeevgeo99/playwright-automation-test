
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Verify Last Updated Date and Navigation Color', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToHomePage();
  const lastUpdated = await homePage.getLastUpdatedDate();
  console.log('Last Updated:', lastUpdated);
  const dateFormat = /\d{2}:\d{2} GMT, \d{1,2} \w+ \d{4}/;
  expect(lastUpdated).toMatch(dateFormat);

  await homePage.clickPrimaryNavigationLink('Sports');

  const sportsColor = await homePage.getNavLinkColor('Sports');
  const footballColor = await homePage.getFootballSecondaryNavColor();
  console.log('Sports Primary Navigation Color:', sportsColor);
  console.log('Football Secondary Navigation Color:', footballColor);

  expect(sportsColor).toBe(footballColor);


});




