import { test, expect } from '@playwright/test';

test('Verify Gallery Arrows and Navigation', async ({ page }) => {
  await page.goto('https://www.dailymail.co.uk');  

  const galleryButton = page.locator('.openGalleryButton-FskZb');
  await galleryButton.click();

  const galleryOverlay = page.locator('.overlay-pHN6p');
  await expect(galleryOverlay).toBeVisible();

  const galleryImages = page.locator('.slide-xw_1h img');

  const totalImages = await galleryImages.count();
  expect(totalImages).toBeGreaterThan(0); 
  let firstImageSrc = await galleryImages.nth(0).getAttribute('src');
  const previousButton = page.locator('.previousButton-dQPhE');
  const nextButton = page.locator('.nextButton-F7kzW');

  await expect(previousButton).toBeVisible();
  await expect(nextButton).toBeVisible();

  let isPreviousDisabled = await previousButton.getAttribute('disabled');
  expect(isPreviousDisabled).toBeTruthy();

  let isNextDisabled = await nextButton.getAttribute('disabled');
  expect(isNextDisabled).toBeFalsy();

  await nextButton.click();

  const secondImageSrc = await galleryImages.nth(1).getAttribute('src');
  expect(secondImageSrc).not.toBe(firstImageSrc); 

  await previousButton.click();

  const firstImageAfterPrev = await galleryImages.nth(0).getAttribute('src');
  expect(firstImageAfterPrev).toBe(firstImageSrc); 

  isPreviousDisabled = await previousButton.getAttribute('disabled');
  expect(isPreviousDisabled).toBeFalsy(); 

  await nextButton.click();
  let isNextDisabledAfterNext = await nextButton.getAttribute('disabled');
  expect(isNextDisabledAfterNext).toBeFalsy(); 

  const lastImageSrc = await galleryImages.nth(totalImages - 1).getAttribute('src');
  await nextButton.click(); 
  const lastImageSrcAfterClick = await galleryImages.nth(totalImages - 1).getAttribute('src');
  expect(lastImageSrcAfterClick).toBe(lastImageSrc); 

  isNextDisabledAfterNext = await nextButton.getAttribute('disabled');
  expect(isNextDisabledAfterNext).toBeTruthy(); 
});