// @ts-check
import { test, expect } from '@playwright/test';

test('dashboard', async ({ page }) => {

    await page.goto(" ");
    await expect(page.getByText('Speech recognition')).toBeVisible();
    await page.waitForTimeout(1000)
    expect (await page.screenshot()).toMatchSnapshot('victor.png');

});  

test('header', async ({ page }) => {

    await page.goto(" ");
    await expect(page.getByText('Speech recognition')).toBeVisible();
    await page.waitForTimeout(1000)
    await expect(await page.locator('mat-toolbar').screenshot()).toMatchSnapshot('header.png');

});  

test('hamburger', async ({ page }) => {

    await page.goto(" ");
    await expect(page.getByText('Speech recognition')).toBeVisible();
    await page.waitForTimeout(1000)
    await expect(await page.getByText('lunch_dining').screenshot()).toMatchSnapshot('hamburger.png');

});  

test('admin icon', async ({ page }) => {

    await page.goto(" ");
    await expect(page.getByText('Speech recognition')).toBeVisible();
    await page.waitForTimeout(1000)
    await expect(await page.getByText('admin_panel_settings').screenshot()).toMatchSnapshot('adminIcon.png');

});  

test('admin role', async ({ page }) => {

    await page.goto(" ");
    await expect(page.getByText('Speech recognition')).toBeVisible();
    await page.waitForTimeout(1000)
    await expect(await page.locator(':text-is("Admin")').screenshot()).toMatchSnapshot('admin.png');

});  

test('callers waiting', async ({ page }) => {

    await page.goto(" ");
    await expect(page.getByText('Speech recognition')).toBeVisible();
    await page.waitForTimeout(1000)
    await expect(await page.locator(':text-is("Callers waiting:")').screenshot({mask:[page.locator('#number-of-callers-waiting')]})).toMatchSnapshot('callers.png');

});  

test('change language', async ({ page }) => {

    await page.goto(" ");
    await expect(page.getByText('Speech recognition')).toBeVisible();
    await page.waitForTimeout(1000)
    await expect(await page.locator('[alt="Change language"]').screenshot()).toMatchSnapshot('change language.png');

});  

test('user status', async ({ page }) => {

    await page.goto(" ");
    await expect(page.getByText('Speech recognition')).toBeVisible();
    await page.waitForTimeout(1000)
    await expect(await page.locator('#status-button').screenshot()).toMatchSnapshot('user status.png');

});  

test('change password page', async ({ page }) => {

    await page.goto(" ");
    await expect(page.getByText('Speech recognition')).toBeVisible();
    await page.waitForTimeout(1000)
    await page.getByText('vpn_key').click();
    await expect(await page.locator('[role="dialog"]').screenshot()).toMatchSnapshot('change password.png');

});  