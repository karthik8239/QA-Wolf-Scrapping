# Hacker News Scraper - 100 Articles

This project contains a web scraper built using Playwright that scrapes the 100 most recent articles from the "newest" section of [Hacker News](https://news.ycombinator.com/newest). The scraper loads 30 articles at a time, clicking the "More" button to load additional articles until 100 articles are gathered.

## Project Structure

- **`main.js`**: The entry point that manages the scraping flow by interacting with the helper functions.
- **`scraper.js`**: Contains the functions responsible for launching the browser, scraping articles, clicking the "More" button, and verifying the sorting order.

---

## Function Walkthrough

### `main.js`

#### 1. `scrapeFirst100Articles()`

This function orchestrates the scraping of 100 articles from Hacker News.

- **Description**: 
  - Launches the browser and navigates to the Hacker News "newest" page.
  - Gathers batches of articles using the `scrapeArticles()` function and clicks the "More" button after each batch until 100 articles are collected.
  - Verifies the sorting order by calling `areArticlesSorted()` and logs the result.

- **Key Steps**:
  - Ensures that the loop continues until at least 100 articles are scraped.
  - Uses `clickMoreButton()` to load additional articles as necessary.

---

### `scraper.js`

#### 1. `launchBrowser(headless)`

This function launches the Chromium browser using Playwright.

- **Description**: 
  - Takes a `headless` parameter to control whether the browser runs in headless mode (no GUI) or with a visible window.
  
- **Parameters**:
  - `headless` (Boolean): If `true`, the browser runs headlessly. If `false`, the browser opens with a GUI.

- **Returns**:
  - A `browser` instance and a `page` object for navigating and interacting with web pages.

---

#### 2. `scrapeArticles(page)`

This function scrapes the current page for articles and returns their details.

- **Description**: 
  - Extracts the article's title, rank, age, and timestamp using CSS selectors.

- **Parameters**:
  - `page` (Object): The Playwright page object representing the current page.

- **Returns**:
  - An array of article objects, each containing:
    - `rank`: The rank of the article.
    - `title`: The title of the article.
    - `ageText`: The relative age (e.g., "5 minutes ago").
    - `articleTime`: The absolute timestamp of the article in ISO format.

---

#### 3. `clickMoreButton(page)`

This function clicks the "More" button to load the next batch of articles.

- **Description**: 
  - Finds the "More" button using a CSS selector and clicks it.
  - Waits 2 seconds after clicking to ensure the new articles are loaded.

- **Parameters**:
  - `page` (Object): The Playwright page object representing the current page.

---

#### 4. `areArticlesSorted(articles)`

This function checks if the articles are sorted from newest to oldest based on their `articleTime`.

- **Description**: 
  - Compares the timestamps of each article with the next one in the list to verify if they are in descending order.

- **Parameters**:
  - `articles` (Array): An array of article objects, each containing an `articleTime` key.

- **Returns**:
  - `true` if the articles are sorted correctly from newest to oldest, `false` otherwise.

---

## Example of Articles Object

After scraping, the articles will be in the following format:

```json
[
  {
    "rank": "1",
    "title": "First Article Title",
    "ageText": "2 minutes ago",
    "articleTime": "2024-09-05T14:32:00Z"
  },
  {
    "rank": "2",
    "title": "Second Article Title",
    "ageText": "4 minutes ago",
    "articleTime": "2024-09-05T14:30:00Z"
  },
  ...
]
