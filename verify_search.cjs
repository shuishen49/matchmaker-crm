const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  // Navigate to Settings
  await page.click('text=设置');

  // Go to Chat Script Library
  await page.click('text=话术库');

  // Count initial scripts
  const initialCount = await page.locator('tbody tr').count();
  console.log('Initial scripts:', initialCount);

  // Search for "开场白"
  await page.fill('input[placeholder="请输入"]', '开场白');
  // Since search is live (on change of chatSearchText), we don't necessarily need to click search button if it's already filtered.
  // Wait, I didn't add a button click handler, but the filtering is reactive to state change.

  const filteredCount = await page.locator('tbody tr').count();
  console.log('Filtered scripts (开场白):', filteredCount);

  await page.screenshot({ path: 'search_verification.png', fullPage: true });

  await browser.close();
})();
