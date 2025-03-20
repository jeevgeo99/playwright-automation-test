import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test('Click on the video resize button and check video resizing', async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('https://www.dailymail.co.uk/video/index.html');
    
    await expect(homePage.sportsVideoThumbnail).toBeVisible();
    await homePage.sportsVideoThumbnail.click();
    
    const resizeButton = page.locator('.vjs-control.mol-fe-vjs-full-size-control');
    await expect(resizeButton).toBeVisible();

    await resizeButton.click();

    await expect(page.locator('.vjs-fullscreen')).toBeVisible();
    
    await resizeButton.click();

    await expect(page.locator('.vjs-fullscreen')).not.toBeVisible();
});