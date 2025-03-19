import { test, expect } from '@playwright/test';

test('Verify Premier League Table Visibility', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.dailymail.co.uk/home/index.html');

  // Click on the "Premier League" link from the primary navigation
  const premierLeagueLink = page.locator('//ul[contains(@class, "nav-primary")]//li[contains(@class, "sport")]//a[@href="/sport/premierleague/index.html"]');
  await premierLeagueLink.waitFor({ state: 'visible', timeout: 60000 });
  await premierLeagueLink.click();

  // Verify that the Premier League table is visible
  const premierLeagueTable = page.locator('div.competitionTable_2Shs1.displayMode-extraSmall_3otUd');
  const isVisible = await premierLeagueTable.isVisible();
  expect(isVisible).toBe(true);  // Assert that the table is visible
});