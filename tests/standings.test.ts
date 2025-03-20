import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';  

test.describe('Premier League Standings Scraping', () => {

  test('should fetch Liverpool position and points', async ({ page }: { page: Page }) => {
    const homePage = new HomePage(page);  

    await homePage.navigateToPremierLeagueStandings();

    const liverpool = await homePage.scrapePremierLeagueStandings();
    
    expect(liverpool).toBeDefined();
    expect(liverpool?.name).toBe('Liverpool');
    expect(liverpool?.position).toBeDefined();
    expect(liverpool?.points).toBeDefined();

    expect(Number(liverpool?.points)).toBeGreaterThan(0);
  });
});