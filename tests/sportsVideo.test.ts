import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Click first video in sports section', async ({ page }) => {
    const homePage = new HomePage(page);

    // Navigate to the video section of the website
    await page.goto('https://www.dailymail.co.uk/video/index.html');
    
    // Ensure the first video thumbnail is visible before clicking
    await expect(homePage.sportsVideoThumbnail).toBeVisible();
    
    // Click the first video thumbnail
    await homePage.sportsVideoThumbnail.click();

    // Verify that the URL contains 'video' (or a specific pattern)
    await expect(page).toHaveURL(/video-\d+/); // Adjust this regex if needed for your use case
});