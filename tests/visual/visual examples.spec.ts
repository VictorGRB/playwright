// @ts-check
import { test, expect } from '@playwright/test';

test('dashboard', async ({ page }) => {

    await page.goto(" ");
    await expect(page).toHaveScreenshot();

});