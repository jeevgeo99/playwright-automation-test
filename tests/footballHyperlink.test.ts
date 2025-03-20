import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';


test('Verify the Football hyperlink changes to italic style after clicking', async ({ page }) => {
    const homePage = new HomePage(page);
  
    await page.goto('https://www.dailymail.co.uk');  
    
    await page.waitForTimeout(2000);  
  
    const footballLink = page.locator('.nav-secondary-container .nav-secondary ul li.first a[href="/sport/football/index.html"]');
    
    const isFootballLinkVisible = await footballLink.isVisible();
    console.log(`Football link visibility: ${isFootballLinkVisible}`);  
  
    await footballLink.waitFor({ state: 'visible', timeout: 60000 });  
  
    await footballLink.click();
  
    const footballLinkAfterClick = page.locator('a[href="/sport/football/index.html"]');
    await footballLinkAfterClick.waitFor({ state: 'visible', timeout: 60000 });
  
    const fontStyle = await footballLinkAfterClick.evaluate(el => {
      return window.getComputedStyle(el).fontStyle;
    });
  
    expect(fontStyle).toBe('italic');
  });