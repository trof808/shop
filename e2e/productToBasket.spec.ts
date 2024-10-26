import { test, expect, type Page } from '@playwright/test';

test.describe.serial('productToBasket', () => {
	let page: Page;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});

	test.afterAll(async () => {
		await page.close();
	});

	test('shpuld open product page', async () => {
		await page.goto('http://localhost:3000');
	});

	test('should display product on the page', async () => {
		const productFirstItem = await page.getByTestId('productCard').first();
		const { addToBasketFirstBtn, removeToBasketFirstBtn, countInBasket } =
			await getProductItemElements(page);

		await expect(productFirstItem).toBeVisible();

		await expect(addToBasketFirstBtn).toBeVisible();
		await expect(addToBasketFirstBtn).not.toBeDisabled();
		await expect(removeToBasketFirstBtn).not.toBeVisible();

		await expect(countInBasket).not.toBeVisible();
	});

	test('should click on the button to add an item to the basket', async () => {
		const { addToBasketFirstBtn, removeToBasketFirstBtn, countInBasket } =
			await getProductItemElements(page);

		await addToBasketFirstBtn.click();

		await expect(removeToBasketFirstBtn).toBeVisible();
		await expect(removeToBasketFirstBtn).not.toBeDisabled();

		await expect(countInBasket).toBeVisible();
		await expect(countInBasket).toHaveText('1');
	});

	test('should display a block with the basket', async () => {
		const basketBlock = await page.getByTestId('basketBlock');

		await expect(basketBlock).toBeInViewport();
	});
});

async function getProductItemElements(page: Page) {
	const addToBasketFirstBtn = await page.getByTestId('addToBasketBtn').first();
	const removeToBasketFirstBtn = await page
		.getByTestId('removeFromBasketBtn')
		.first();
	// тут вроде можно без await
	const countInBasket = await page.getByTestId('countInBasket').first();
	return { addToBasketFirstBtn, removeToBasketFirstBtn, countInBasket };
}
