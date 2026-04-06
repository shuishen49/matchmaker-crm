import { chromium } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const BASE_URL = process.env.SCREENSHOT_BASE_URL || 'http://127.0.0.1:4173/matchmaker-crm/';
const outDir = path.join(projectRoot, 'docs', 'screenshots');

async function clickMenu(page, label) {
  const item = page.locator('div.cursor-pointer', { hasText: label }).first();
  await item.waitFor({ state: 'visible', timeout: 10000 });
  await item.click();
  await page.waitForTimeout(500);
}

async function run() {
  await fs.mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  const page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  // login page
  await page.screenshot({ path: path.join(outDir, 'login.png'), fullPage: true });

  // login
  await page.getByRole('button', { name: '登 录' }).click();
  await page.waitForTimeout(900);

  // dashboard
  await page.screenshot({ path: path.join(outDir, 'dashboard.png'), fullPage: true });

  // resources
  await clickMenu(page, '销售');
  await page.screenshot({ path: path.join(outDir, 'resources.png'), fullPage: true });

  // service + finance
  await clickMenu(page, '服务');
  await page.waitForTimeout(400);
  await clickMenu(page, '财务');
  await page.screenshot({ path: path.join(outDir, 'service-finance.png'), fullPage: true });

  // records + settings
  await clickMenu(page, '记录');
  await page.waitForTimeout(400);
  await clickMenu(page, '设置');
  await page.screenshot({ path: path.join(outDir, 'records-settings.png'), fullPage: true });

  await browser.close();
  console.log('README screenshots generated in:', outDir);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
