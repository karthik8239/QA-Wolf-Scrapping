//index.js

const { launchBrowser, scrapeArticles, clickMoreButton, areArticlesSorted } = require('./scraper');

async function scrapeFirst100Articles() {
  // Launch the browser and page
  const { browser, page } = await launchBrowser(true);

  // Go to Hacker News 'newest' page
  await page.goto('https://news.ycombinator.com/newest');

  let articles = [];

  // Continue clicking "More" and scraping until we have at least 100 articles
  while (articles.length < 100) {
    const newArticles = await scrapeArticles(page);
    articles = [...articles, ...newArticles];  // Add the new articles to the list

    // If we have enough articles, stop the loop
    if (articles.length >= 100) break;

    // Click the "More" button to load the next set of articles(from 30..to 60..and so on )
    await clickMoreButton(page);
  }

  // Slice the articles to keep only the first 100
  articles = articles.slice(0, 100);

  // Check if the articles are sorted correctly
  const sorted = areArticlesSorted(articles);
  if (sorted) {
    console.log("The first 100 articles are correctly sorted from newest to oldest.");
  } else {
    console.log("The articles are not sorted correctly.");
  }

  // Log the articles
  console.log(articles);

  // Close the browser
  await browser.close();
}

// Run the script
scrapeFirst100Articles();
