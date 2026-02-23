import { chromium } from "@playwright/test";

let browser = await chromium.launch({ headless: false });

let page = await browser.newPage();

await page.goto("https://www.bami.nl/");


// a11y accessibility <== locator

await page.getByRole('link', { name: 'Ingrediënten'}).click();

await page.screenshot({ path: "bami2.png" });

await browser.close();
