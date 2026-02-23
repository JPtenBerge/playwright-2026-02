import { test, expect } from '@playwright/test';


test('recept vinden', async ({ page }) => {

    await page.goto('https://www.bami.nl/');

    await page.getByPlaceholder('bijv.: Pesto, Chili con Carne').fill('pesto');
    await page.getByPlaceholder('bijv.: Pesto, Chili con Carne').press('Enter');
    // await page.getByRole('form').getByRole('button').click();

    await page.getByText('Pestokip uit de oven').click();

    await expect(page.getByRole('heading', { name: 'Pestokip uit de oven ' })).toBeVisible();

});

test('recept vinden', async ({ page }) => {

    await page.goto('https://www.bami.nl/');
    await page.getByRole('textbox', { name: 'bijv.: Pesto, Chili con Carne' }).fill('pesto');
    await page.getByRole('button').click();
    await page.getByRole('link', { name: 'Pesto Italiaans saus met' }).click();
    await expect(page.locator('h1')).toContainText('Pesto');
});
