import { expect, test } from '@playwright/test';

test('recept vinden', async ({ page }) => {
	await page.goto('https://www.bami.nl/');

	await page.getByPlaceholder('bijv.: Pesto, Chili con Carne').fill('pesto');
	await page.getByRole('form').getByRole('button').click();
	await page.getByText('Pestokip uit de oven').click();

	await expect(page.getByRole('table').first()).toHaveScreenshot('jouw-naam.png');
});
