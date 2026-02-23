import test, { expect } from '@playwright/test';

test('timeout', async ({ page }) => {
	await page.clock.install();
	await page.goto('http://localhost:4200/timers');
	await page.getByRole('button', { name: 'Start timeout' }).click();

	// await page.clock.fastForward(10000);
	await page.clock.runFor(10000);

	await expect(page.getByText('Hello changing world!')).toBeVisible();
});

test('interval', async ({ page }) => {
	await page.clock.install();
	await page.goto('http://localhost:4200/timers');
	await page.getByRole('button', { name: 'Start interval' }).click();

	// await page.clock.fastForward(10000); [// laptop dicht en na 10 seconden weer openen, triggert evenhandlers eenmalig
	await page.clock.runFor(10000); // verloopt tijd op natuurlijkere wijze

	await expect(page.getByText('Seconds passed: 10')).toBeVisible();
});

test('intercepting requests with mock data', async ({ page }) => {
	await page.route('http://localhost:4200/api/products', async req => {
		await req.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify([
				{ id: 14, description: 'Telefoon', price: 1419 },
				{ id: 28, description: 'Muis', price: 12 },
			]),
		});
	});

	await page.goto('http://localhost:4200/form-with-network');
	await expect(page.getByRole('table')).toContainText('Muis');
});

test('intercepting requests with limbo', async ({ page }) => {
	await page.route('**/api/products', () => new Promise(() => {}));
	await page.goto('http://localhost:4200/form-with-network');

	// await page.waitForLoadState('networkidle');
	// await page.waitForTimeout(10000); ❌❌❌❌⛑️⛑️⛑️⛑️
	// page.on('request')

    await expect(page.getByRole('progressbar')).toBeVisible();
	await expect(page.getByRole('table')).not.toBeVisible();
	await page.waitForTimeout(10000); // ❌❌❌❌⛑️⛑️⛑️⛑️
    await expect(page.getByRole('progressbar')).toBeVisible();
	await expect(page.getByRole('table')).not.toBeVisible();
});
