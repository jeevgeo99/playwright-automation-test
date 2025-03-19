import { Page, Locator } from '@playwright/test';

export class HomePage {
  page: Page;
  readonly firstArticleLink: Locator;
  readonly premierLeagueLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstArticleLink = this.page.locator('.articletext a');
    this.premierLeagueLink = this.page.locator('.page-header.bdrgr2 //ul[contains(@class, "nav-primary")]//li[contains(@class, "sport")]//a[@href="/sport/premierleague/index.html"]');
  }

  async navigateToHomePage() {
    await this.page.goto('https://www.dailymail.co.uk/home/index.html');
  }

    async getLastUpdatedDate(): Promise<string> {
    const lastUpdatedElement = await this.page.locator('div.h1-page-last-updated span', { hasText: /Last updated:/ }).innerText();
    return lastUpdatedElement;
  }


  // Method to click on a primary navigation link
  async clickPrimaryNavigationLink(linkText: string) {
    await this.page.locator(`//ul[contains(@class, 'nav-primary')]//li[contains(@class, 'sport')]//a[text()='${linkText}']`).first().click();
  }

  // Method to get the color of a primary navigation link (e.g., "Sport")
  async getNavLinkColor(linkText: string): Promise<string> {
    const color = await this.page.locator(`//ul[contains(@class, 'nav-primary')]//li[contains(@class, 'sport')]//a[text()='${linkText}']`).evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    return color;
  }

  // // Method to get the color of the "Football" secondary navigation link
  // async getFootballSecondaryNavColor(): Promise<string> {
  //   const footballColor = await this.page.locator('li.first a[href*="/sport/football"]').evaluate(el => {
  //     return window.getComputedStyle(el).color;
  //   });
  //   return footballColor;
  // }



  async getFootballSecondaryNavColor(): Promise<string> {
    // Refined locator to get the first "Football" link within the secondary navigation
    const footballLink = await this.page.locator('li.first a[href="/sport/football/index.html"]').first();

    const footballColor = await footballLink.evaluate(el => {
      return window.getComputedStyle(el).color; // Get the color of the link
    });

    return footballColor;
  }

  // Method to get the color of the "Sport" primary navigation link
  async getSportPrimaryNavColor(): Promise<string> {
    // Refined locator to get the "Sport" link within the primary navigation
    const sportLink = await this.page.locator('ul.nav-primary li.sport a').first();

    const sportColor = await sportLink.evaluate(el => {
      return window.getComputedStyle(el).color; // Get the color of the link
    });

    return sportColor;
  }

  
// Method to click on the Football link
async clickFootballLink() {
  const footballLink = this.page.locator('li.first a[href="/sport/football/index.html"]');
  
  await footballLink.waitFor({ state: 'visible', timeout: 60000 });  // Increase the timeout if necessary
  await footballLink.click();
}

async isFootballLinkItalic(): Promise<boolean> {
  const footballLink = await this.page.locator('li.first a[href="/sport/football/index.html"]');
  
  await footballLink.waitFor({ state: 'visible', timeout: 60000 });
  
  const fontStyle = await footballLink.evaluate(el => window.getComputedStyle(el).fontStyle);
  return fontStyle === 'italic';
}




// async clickFirstArticle() {
//   try {
//     console.log('Waiting for the first article link...');
    
//     // Ensure the locator has the correct value before calling `waitFor`
//     if (this.firstArticleLink) {
//       // Wait for up to 15 seconds for the article link to be visible
//       await this.firstArticleLink.waitFor({ state: 'visible', timeout: 15000 }); 
//       console.log('Scrolling into view...');
//       // Ensure the link is in view before clicking
//       await this.firstArticleLink.scrollIntoViewIfNeeded();

//       console.log('Clicking the first article...');
//       await this.firstArticleLink.click(); // Click on the article link
//     } else {
//       console.error('firstArticleLink is undefined!');
//     }
//   } catch (error) {
//     console.error('Error while clicking the first article:', error);
//     throw error; // Re-throw the error to be caught by the test
//   }
// }




async clickPremierLeagueLink() {
  const premierLeagueLink = this.page.locator('.page-header.bdrgr2 //ul[contains(@class, "nav-primary")]//li[contains(@class, "sport")]//a[@href="/sport/premierleague/index.html"]');
  await premierLeagueLink.waitFor({ state: 'visible', timeout: 60000 });
  await premierLeagueLink.click();
}

// Method to verify if the Premier League table is visible after navigating to the page
async isPremierLeagueTableVisible(): Promise<boolean> {
  const premierLeagueTable = this.page.locator('.page-header.bdrgr2 div.competitionTable_2Shs1.displayMode-extraSmall_3otUd');
  return premierLeagueTable.isVisible();
}





}
