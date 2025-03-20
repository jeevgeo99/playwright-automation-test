import { Page, Locator,expect } from '@playwright/test';

export class HomePage {
  page: Page;
  readonly firstArticleLink: Locator;
  readonly premierLeagueLink: Locator;
  readonly galleryIcon: Locator;
  readonly prevArrow: Locator;
  readonly nextArrow: Locator;
  readonly galleryImage: Locator;
  readonly facebookShareButton: Locator;
  readonly sportsVideoThumbnail: Locator
  readonly videoResizeButton: Locator;
  readonly videoPlayer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstArticleLink = this.page.locator('.articletext a');
    this.premierLeagueLink = this.page.locator('xpath=//div[@class="page-header bdrgr2"]//ul[contains(@class, "nav-primary")]//li[contains(@class, "sport")]//a[@href="/sport/premierleague/index.html"]');
    this.facebookShareButton = this.page.locator('.article-icon-links-container .facebook button');
    this.sportsVideoThumbnail = page.locator('.mostRecent-3KtwA.desktop-XiVpc .videos-2MBW_ a .thumbContainer-345kC').first();
    
    // Video resize locators
    this.videoResizeButton = this.page.locator('.vjs-control.mol-fe-vjs-full-size-control');
    this.videoPlayer = this.page.locator('.vjs-player'); // Adjust if needed based on actual video player class
    
    // Gallery locators
    this.galleryIcon = this.page.locator('.openGalleryButton-FskZb');
    this.prevArrow = this.page.locator('.previousButton-dQPhE');
    this.nextArrow = this.page.locator('.nextButton-F7kzW');
    this.galleryImage = this.page.locator('.galleryWrapper-rsaa8 .image-ldeCw.fitImage-ejVJJ');

  }

  async navigateToHomePage() {
    await this.page.goto('https://www.dailymail.co.uk/home/index.html');
  }

    async getLastUpdatedDate(): Promise<string> {
    const lastUpdatedElement = await this.page.locator('div.h1-page-last-updated span', { hasText: /Last updated:/ }).innerText();
    return lastUpdatedElement;
  }


  async clickPrimaryNavigationLink(linkText: string) {
    await this.page.locator(`//ul[contains(@class, 'nav-primary')]//li[contains(@class, 'sport')]//a[text()='${linkText}']`).first().click();
  }

  async getNavLinkColor(linkText: string): Promise<string> {
    const color = await this.page.locator(`//ul[contains(@class, 'nav-primary')]//li[contains(@class, 'sport')]//a[text()='${linkText}']`).evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    return color;
  }

  async getFootballSecondaryNavColor(): Promise<string> {
    // Refined locator to get the first "Football" link within the secondary navigation
    const footballLink = await this.page.locator('li.first a[href="/sport/football/index.html"]').first();

    const footballColor = await footballLink.evaluate(el => {
      return window.getComputedStyle(el).color; // Get the color of the link
    });

    return footballColor;
  }

  async getSportPrimaryNavColor(): Promise<string> {
    const sportLink = await this.page.locator('ul.nav-primary li.sport a').first();

    const sportColor = await sportLink.evaluate(el => {
      return window.getComputedStyle(el).color; // Get the color of the link
    });

    return sportColor;
  }

  
// Method to click on the Football link
async clickFootballLink() {
  const footballLink = this.page.locator('li.first a[href="/sport/football/index.html"]');
  
  await footballLink.waitFor({ state: 'visible', timeout: 60000 });  
  await footballLink.click();
}

async isFootballLinkItalic(): Promise<boolean> {
  const footballLink = await this.page.locator('li.first a[href="/sport/football/index.html"]');
  
  await footballLink.waitFor({ state: 'visible', timeout: 60000 });
  
  const fontStyle = await footballLink.evaluate(el => window.getComputedStyle(el).fontStyle);
  return fontStyle === 'italic';
}




async clickFirstArticle() {
  try {
    console.log('Waiting for the first article link...');
    
    if (this.firstArticleLink) {
      await this.firstArticleLink.waitFor({ state: 'visible', timeout: 15000 }); 
      console.log('Scrolling into view...');
      await this.firstArticleLink.scrollIntoViewIfNeeded();

      console.log('Clicking the first article...');
      await this.firstArticleLink.click(); // Click on the article link
    } else {
      console.error('firstArticleLink is undefined!');
    }
  } catch (error) {
    console.error('Error while clicking the first article:', error);
    throw error; // Re-throw the error to be caught by the test
  }
}


async clickPremierLeagueLink() {
  await this.premierLeagueLink.waitFor({ state: 'visible', timeout: 60000 });
  await this.premierLeagueLink.click();
}

async isPremierLeagueTableVisible(): Promise<boolean> {
  const premierLeagueTable = this.page.locator('.page-header.bdrgr2 div.competitionTable_2Shs1.displayMode-extraSmall_3otUd');
  return premierLeagueTable.isVisible();
}


async openGallery() {
  await this.galleryIcon.waitFor({ state: 'visible', timeout: 10000 });
  await this.galleryIcon.click();
}

async isGalleryNavigationVisible(): Promise<boolean> {
  await this.prevArrow.waitFor({ state: 'visible', timeout: 10000 });
  await this.nextArrow.waitFor({ state: 'visible', timeout: 10000 });

  return (await this.prevArrow.isVisible()) && (await this.nextArrow.isVisible());
}

async navigateGallery() {
  await this.openGallery();

  const firstImageSrc = await this.galleryImage.getAttribute('src');
  
  // Click Next
  await this.nextArrow.waitFor({ state: 'visible', timeout: 10000 });
  await this.nextArrow.click();
  await this.page.waitForTimeout(2000); // Wait for image to change

  const secondImageSrc = await this.galleryImage.getAttribute('src');
  expect(firstImageSrc).not.toEqual(secondImageSrc);

  // Click Previous
  await this.prevArrow.waitFor({ state: 'visible', timeout: 10000 });
  await this.prevArrow.click();
  await this.page.waitForTimeout(2000); // Wait for image to change back

  const finalImageSrc = await this.galleryImage.getAttribute('src');
  expect(finalImageSrc).toEqual(firstImageSrc);
}



 // Click on the Facebook share icon and verify it opens Facebook
 async clickFacebookShare() {
  const [newPage] = await Promise.all([
    this.page.waitForEvent('popup'),
    this.facebookShareButton.click(),
  ]);
  expect(newPage.url()).toContain('facebook.com/sharer.php');
  console.log('Facebook share page opened successfully.');
}

//most watched sports video
async SportsVideoThumbnail() {
  await this.sportsVideoThumbnail.waitFor({ state: 'visible' });
  await this.sportsVideoThumbnail.click();
}

async clickFirstVideo() {
  await this.sportsVideoThumbnail.waitFor({ state: 'visible', timeout: 10000 });
  await this.sportsVideoThumbnail.click();
}

async resizeVideo() {
  await this.videoResizeButton.waitFor({ state: 'visible', timeout: 5000 });
  
  // Click to expand video
  await this.videoResizeButton.click();
  await this.page.waitForTimeout(2000); // Give time for full-screen transition

  // Verify video is full screen
  await expect(this.videoPlayer).toHaveClass(/vjs-fullscreen/); 

  // Click again to collapse video
  await this.videoResizeButton.click();
  await this.page.waitForTimeout(2000); 

  // Verify video is not full screen
  await expect(this.videoPlayer).not.toHaveClass(/vjs-fullscreen/); 
}

// Method to navigate to the Premier League standings page
async navigateToPremierLeagueStandings() {
  await this.premierLeagueLink.waitFor({ state: 'visible', timeout: 60000 });
  await this.premierLeagueLink.click();
}

async scrapePremierLeagueStandings() {
  // Wait for the table to load
  await this.page.waitForSelector('tbody');

  // Extract Premier League standings (position, team, points)
  const liverpoolData = await this.page.$$eval('tr.competitionTableRow_3Nd43', (rows) => {
    return rows.map((row) => {
      // Get the position, team name, and points from the table
      const position = row.querySelector('td.pos_3b93p')?.textContent?.trim();
      const name = row.querySelector('td.team-long_3K-tX')?.textContent?.trim();
      const points = row.querySelector('td.score-pts_TNAV7')?.textContent?.trim();

      return { position, name, points };
    });
  });

  // Find Liverpool's row and return its data
  const liverpool = liverpoolData.find(team => team.name?.toLowerCase() === 'liverpool');

  console.log('Liverpool Data:', liverpool);
  return liverpool;
}

}


