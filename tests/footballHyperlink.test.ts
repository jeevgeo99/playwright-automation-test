import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';



test('Verify the Football hyperlink changes to italic style after clicking', async ({ page }) => {
    const homePage = new HomePage(page);
  
    // Navigate to the homepage
    await page.goto('https://www.dailymail.co.uk');  // Ensure this URL is correct for your test setup
    
    // Add a small delay to ensure the page has fully loaded
    await page.waitForTimeout(2000);  // Wait for 2 seconds before proceeding, adjust if necessary
  
    // Check if the "Football" link exists in the DOM
    const footballLink = page.locator('.nav-secondary-container .nav-secondary ul li.first a[href="/sport/football/index.html"]');
    
    // Log the visibility of the link to help debug
    const isFootballLinkVisible = await footballLink.isVisible();
    console.log(`Football link visibility: ${isFootballLinkVisible}`);  // Check the visibility status
  
    // Wait for the link to become visible
    await footballLink.waitFor({ state: 'visible', timeout: 60000 });  // Wait for the Football link to appear
  
    // Click on the "Football" hyperlink in the secondary navigation
    await footballLink.click();
  
    // Wait for the Football link to be visible again after the click
    const footballLinkAfterClick = page.locator('a[href="/sport/football/index.html"]');
    await footballLinkAfterClick.waitFor({ state: 'visible', timeout: 60000 });
  
    // Ensure the 'italic' style is applied
    const fontStyle = await footballLinkAfterClick.evaluate(el => {
      return window.getComputedStyle(el).fontStyle;
    });
  
    // Verify that the font style is italic after clicking
    expect(fontStyle).toBe('italic');
  });