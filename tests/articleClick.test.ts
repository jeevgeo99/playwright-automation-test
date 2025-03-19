import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Test: Click on the first article', async ({ page }) => {
    // Create an instance of the HomePage class
    const homePage = new HomePage(page);
  
    // Go to the desired website (example: Daily Mail)
    await page.goto('https://www.dailymail.co.uk/sport/football/index.html', {
      waitUntil: 'domcontentloaded', // Wait for the page to load completely
    });
  
    // Perform the click action
    await homePage.clickFirstArticle();
  
    // Add your assertions to validate that the article page has loaded
    const articleTitle = page.locator('h1'); // Assuming the article has an <h1> tag for the title
    await expect(articleTitle).toBeVisible(); // Ensure the article title is visible
  
    // Additional assertions can be added based on your test requirements
  });