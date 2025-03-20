import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage'; 

test('Verify Premier League Table Visibility', async ({ page }) => {
  const homePage = new HomePage(page); 
  await homePage.navigateToHomePage();
  await homePage.clickPremierLeagueLink();
  const premierLeagueTable = page.locator('.page-header.bdrgr2 div.competitionTable_2Shs1.displayMode-extraSmall_3otUd');
  await expect(premierLeagueTable).toBeVisible();
});