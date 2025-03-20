import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Click first video in sports section', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('https://www.dailymail.co.uk/video/index.html');
    await expect(homePage.sportsVideoThumbnail).toBeVisible();
    await homePage.sportsVideoThumbnail.click();
    await expect(page).toHaveURL(/video-\d+/); 
});