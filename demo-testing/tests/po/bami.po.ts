import { Page } from '@playwright/test';

export class BamiPO {
	constructor(private page: Page) {}

	getSearchBox() {
		return this.page.getByPlaceholder('bijv.: Pesto, Chili con Carne');
	}

	getSubmitButton() {
		return this.page.getByRole('form').getByRole('button');
	}

	getGerechten() {
		return this.page.locator('.list-group').getByRole('link');
	}

	getTitle(title: string) {
		return this.page.getByRole('heading', { name: title });
	}

	// get searchBox() {
	//   return this.page.getByPlaceholder("bijv.: Pesto, Chili con Carne");
	// }
}

class ListVanDIngen {
	nth(item: number) {}
}
