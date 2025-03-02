import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Events', () => {
	test('Event form shows validation errors', async ({ page }) => {
		await page.goto('/newevent');

		await page.getByRole('button', { name: 'Create Event' }).click();
		await expect(page.getByText('Please fill out this field.')).toHaveCount(2);

		await page.getByLabel('Title').fill(faker.lorem.words());
		await expect(page.getByText('Please fill out this field.')).toHaveCount(1);

		const dateInput = page.getByLabel('Date');
		await dateInput.pressSequentially('01012000');
		await dateInput.press('Tab');
		await dateInput.pressSequentially('1000a');
		await expect(page.getByText('Value must be')).toBeVisible();

		await dateInput.press('Tab');
		await dateInput.pressSequentially('01012100');

		await expect(page.getByText('Value must be')).toBeHidden();
		await expect(page.getByText('Please fill out this field.')).toBeHidden();
	});

	test('Create a new event', async ({ page }) => {
		const title = faker.lorem.words();
		const description = faker.lorem.paragraph();

		await page.goto('/');
		await page.getByRole('link', { name: 'Add Event' }).click();

		await page.getByLabel('Title').fill(title);
		await page.getByLabel('Description').fill(description);
		const dateInput = page.getByLabel('Date');
		await dateInput.pressSequentially('01012100');
		await dateInput.press('Tab');
		await dateInput.pressSequentially('1000a');

		const btn = page.getByRole('button', { name: 'Create Event' });
		await btn.click();

		await expect(btn).toBeDisabled();
		await expect(btn.locator('.loading-spinner')).toBeVisible();

		await expect(page.getByLabel('Title')).toBeDisabled();
		await expect(page.getByLabel('Title')).toBeDisabled();
		await expect(page.getByLabel('Date')).toBeDisabled();

		await expect(page.getByRole('button', { name: 'Create Event' })).toBeHidden();

		await expect(page.getByText(title)).toBeVisible();
		await expect(page.getByText(description)).toBeVisible();

		await page.goto('/');
		await expect(page.getByText(title)).toBeVisible();
		await expect(page.getByText(description)).toBeVisible();
	});

	test('Edit an event', async ({ page }) => {
		const title = faker.lorem.words();
		const description = faker.lorem.paragraph();

		await page.goto('/newevent');

		await page.getByLabel('Title').fill(title);
		await page.getByLabel('Description').fill(description);
		const dateInput = page.getByLabel('Date');
		await dateInput.pressSequentially('01012100');
		await dateInput.press('Tab');
		await dateInput.pressSequentially('1000a');

		await page.getByRole('button', { name: 'Create Event' }).click();

		await page.getByRole('link', { name: 'Edit Event' }).click();

		await expect(page.getByLabel('Title')).toHaveValue(title);
		await expect(page.getByLabel('Description')).toHaveValue(description);
		await expect(page.getByLabel('Date')).toHaveValue('2100-01-01T10:00');

		const newTitle = faker.lorem.words();
		await page.getByLabel('Title').fill(newTitle);

		await page.getByRole('button', { name: 'Update Event' }).click();

		await expect(page.getByText(newTitle)).toBeVisible();
	});

	test('Delete an event', async ({ page }) => {
		const title = faker.lorem.words();

		await page.goto('/newevent');

		await page.getByLabel('Title').fill(title);
		const dateInput = page.getByLabel('Date');
		await dateInput.pressSequentially('01012100');
		await dateInput.press('Tab');
		await dateInput.pressSequentially('1000a');

		await page.getByRole('button', { name: 'Create Event' }).click();

		await page.getByRole('button', { name: 'Delete Event' }).click();

		await expect(page.getByText(title)).toBeHidden();
	});
});
