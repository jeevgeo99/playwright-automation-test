import { test, expect } from '@playwright/test';

test('Verify Gallery Arrows and Navigation', async ({ page }) => {
  // Navigate to the page where the gallery exists
  await page.goto('https://www.dailymail.co.uk');  

  const galleryButton = page.locator('.openGalleryButton-FskZb');
  await galleryButton.click();

  const galleryOverlay = page.locator('.overlay-pHN6p');
  await expect(galleryOverlay).toBeVisible();

  const galleryImages = page.locator('.slide-xw_1h img');

  const totalImages = await galleryImages.count();

  expect(totalImages).toBeGreaterThan(0); // Ensure there are images

  // Check the first image
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
  expect(secondImageSrc).not.toBe(firstImageSrc); // Ensure that the image changed

  await previousButton.click();

  const firstImageAfterPrev = await galleryImages.nth(0).getAttribute('src');
  expect(firstImageAfterPrev).toBe(firstImageSrc); // Ensure the image returned to the first one

  isPreviousDisabled = await previousButton.getAttribute('disabled');
  expect(isPreviousDisabled).toBeFalsy(); // The Previous button should be enabled after clicking Next

  await nextButton.click();

  let isNextDisabledAfterNext = await nextButton.getAttribute('disabled');
  expect(isNextDisabledAfterNext).toBeFalsy(); // The Next button should be enabled when there are more images

  const lastImageSrc = await galleryImages.nth(totalImages - 1).getAttribute('src');
  await nextButton.click(); // Go to the last image
  const lastImageSrcAfterClick = await galleryImages.nth(totalImages - 1).getAttribute('src');
  expect(lastImageSrcAfterClick).toBe(lastImageSrc); // Ensure we're at the last image

  isNextDisabledAfterNext = await nextButton.getAttribute('disabled');
  expect(isNextDisabledAfterNext).toBeTruthy(); // Next button should be disabled on the last image
});