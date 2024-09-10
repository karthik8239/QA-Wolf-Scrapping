// scraper.js

const { chromium } = require('playwright');

// Function to launch the browser and create a new page
async function launchBrowser(headless) {
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    return {browser, page};
  } catch(error){
    console.error('Error launching browser:', error);
    // Ensure to return null or an empty object when an error occurs
    console.error('Error Launching browser');
    return { browser: null, page: null }; 
  }
}

// Function to scrape articles from the current page
async function scrapeArticles(page) {
  return await page.$$eval('tr.athing', (rows) => {
    return rows.map(row => {
      const title = row.querySelector('.titleline > a')?.innerText;
      const rank = row.querySelector('.rank')?.innerText?.replace('.', '');
      const ageLink = row.nextElementSibling?.querySelector('.age > a');
      const ageText = ageLink?.innerText;
      const articleTime = ageLink?.title;  // Extract timestamp
      return { rank, title, ageText, articleTime };
    });
  });
}

// Function to click the "More" button to load more articles
async function clickMoreButton(page) {
  await page.click('a.morelink');
  await page.waitForTimeout(2000); // Wait for the page to load
}

// Function to check if articles are sorted by time (newest to oldest)
function areArticlesSorted(articles) {
  for (let i = 0; i < articles.length - 1; i++) {
    if (new Date(articles[i].articleTime) < new Date(articles[i + 1].articleTime)) {
      return false;
    }
  }
  return true;
}

// Export all functions to be used in other files
module.exports = {
  launchBrowser,
  scrapeArticles,
  clickMoreButton,
  areArticlesSorted
};
