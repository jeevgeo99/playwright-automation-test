import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Test: Click on the first article', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('https://www.dailymail.co.uk/sport/football/index.html', {
      waitUntil: 'domcontentloaded', 
    });
  
    await homePage.clickFirstArticle();
    const articleTitle = page.locator('h1'); 
    await expect(articleTitle).toBeVisible(); 
  
  });