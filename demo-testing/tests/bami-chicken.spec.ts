import { test, expect } from '@playwright/test';

test.describe('bami.nl — chicken recipe', () => {
  test('searches for chicken (kip) and opens a recipe', async ({ page }) => {
    await page.goto('https://bami.nl');

    // Dismiss cookie/consent if present
    const cookieButton = page.getByRole('button', { name: /akkoord|accepteren|cookies|accept/i });
    if (await cookieButton.count() > 0) await cookieButton.first().click();

    // Perform search for "kip" (chicken)
    const searchbox = page.getByRole('searchbox');
    if (await searchbox.count() > 0) {
      await searchbox.fill('kip');
      await Promise.all([page.waitForNavigation(), searchbox.press('Enter')]);
    } else {
      const searchButton = page.getByRole('button', { name: /zoeken|search/i });
      if (await searchButton.count() > 0) {
        await searchButton.click();
        const textbox = page.getByRole('textbox');
        await textbox.fill('kip');
        await Promise.all([page.waitForNavigation(), textbox.press('Enter')]);
      } else {
        // Fallback: use query param search
        await page.goto('https://bami.nl/?s=kip');
      }
    }

    // Expect at least one recipe link in results and open it
    const resultLink = page.getByRole('link', { name: /recept|kip|chicken/i }).first();
    await expect(resultLink).toBeVisible();
    await Promise.all([page.waitForNavigation(), resultLink.click()]);

    // On recipe page: title visible and page mentions chicken
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(page.locator('text=/kip|chicken/i')).toBeVisible();
  });
});