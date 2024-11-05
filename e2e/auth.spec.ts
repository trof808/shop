import { test, expect, type Page } from '@playwright/test';
import { v4 } from 'uuid';

test.describe.serial('auth', () => {
	let page: Page;
	const uuid = v4();
	let randomEmail = `${uuid}@test.com`;
	let randomPassword = uuid;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});

	test.afterAll(async () => {
		await page.close();
	});

	test('should open product page', async () => {
		await page.goto('http://localhost:3000');
	});

	test('should display Log in button and Sign in', async () => {
		const logInButton = await page.getByTestId('logIn');
		const signInButton = await page.getByTestId('signIn');
		const logOutButton = await page.getByTestId('logOut');

		await expect(logInButton).toBeVisible();
		await expect(signInButton).toBeVisible();
		await expect(logOutButton).not.toBeVisible();
	});

	test('should register a user', async () => {
		const authTitle = await page.getByTestId('authTitle');
		const logInButton = await page.getByTestId('logIn');
		const signInButton = await page.getByTestId('signIn');
		const inputEmail = await page.getByTestId('inputEmail');
		const inputPassword = await page.getByTestId('inputPassword');
		const buttonAuth = await page.getByTestId('buttonAuth');
		const logOutButton = await page.getByTestId('logOut');

		await signInButton.click();

		await page.waitForURL('http://localhost:3000/register');

		await expect(authTitle).toHaveText('Sign in');
		await expect(inputEmail).toBeVisible();
		await expect(inputPassword).toBeVisible();

		await inputEmail.fill(randomEmail);
		await inputPassword.fill(randomPassword);

		await buttonAuth.click();

		await page.waitForURL('http://localhost:3000');

		await expect(logOutButton).toBeVisible();
		await expect(logInButton).not.toBeVisible();
		await expect(signInButton).not.toBeVisible();
	});

	test('should logout', async () => {
		const authTitle = await page.getByTestId('authTitle');
		const logInButton = await page.getByTestId('logIn');
		const signInButton = await page.getByTestId('signIn');
		const logOutButton = await page.getByTestId('logOut');

		await logOutButton.click();

		await expect(authTitle).toHaveText('Log in');

		await page.goto('http://localhost:3000');

		await expect(logInButton).toBeVisible();
		await expect(signInButton).toBeVisible();
		await expect(logOutButton).not.toBeVisible();
	});

	test('should log in a user', async () => {
		const authTitle = await page.getByTestId('authTitle');
		const logInButton = await page.getByTestId('logIn');
		const signInButton = await page.getByTestId('signIn');
		const inputEmail = await page.getByTestId('inputEmail');
		const inputPassword = await page.getByTestId('inputPassword');
		const buttonAuth = await page.getByTestId('buttonAuth');
		const logOutButton = await page.getByTestId('logOut');

		await logInButton.click();

		await page.waitForURL('http://localhost:3000/login');

		await expect(authTitle).toHaveText('Log in');
		await expect(inputEmail).toBeVisible();
		await expect(inputPassword).toBeVisible();

		await inputEmail.fill(randomEmail);
		await inputPassword.fill(randomPassword);

		await buttonAuth.click();

		await page.waitForURL('http://localhost:3000');

		await expect(logOutButton).toBeVisible();
		await expect(logInButton).not.toBeVisible();
		await expect(signInButton).not.toBeVisible();
	});
});
