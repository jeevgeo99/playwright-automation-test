Playwright Test Automation

Description: This project uses Playwright for automating tests on a website, specifically testing the functionality of the homepage and other interactive elements.

Prerequisites
Node.js (v16.0.0 or higher)
npm (comes with Node.js)

Installation
Clone the repository: 
git clone https://github.com/your-username/your-repo-name.git

cd your-repo-name

Install dependencies:
npm install

Install Playwright browsers:
npx playwright install

Running Tests
Run All Tests - npx playwright test

Run a Specific Test - 

npx playwright test tests/homePage.spec.ts

Run Tests in Headed Mode (with UI) - 

npx playwright test --headed
