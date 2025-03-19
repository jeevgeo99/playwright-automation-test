import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage'; // Import the updated HomePage class

test('Verify Premier League Table Visibility', async ({ page }) => {
  const homePage = new HomePage(page); // Create an instance of the HomePage class

  // Navigate to the homepage
  await homePage.navigateToHomePage();

  // Click on the Premier League link from the primary navigation
  await homePage.clickPremierLeagueLink();

  // Wait for the Premier League table to appear
  const premierLeagueTable = page.locator('.page-header.bdrgr2 div.competitionTable_2Shs1.displayMode-extraSmall_3otUd');

  // Verify that the Premier League table is visible
  await expect(premierLeagueTable).toBeVisible();
});