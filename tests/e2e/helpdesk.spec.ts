// @ts-check
import { test, expect } from '@playwright/test';

// test('links', async ({ page }) => {

//     await page.goto("/dashboard/schedule");
//     await expect(page).toHaveURL(/schedule/);
//     await page.getByRole('button', { name: 'New appointment' }).click();

// });
test('logout', async ({ page }) => {


    await page.goto(" ");
    await page.getByRole('button', { name: 'profile picture' }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    //expect(page.locator('[id="mat-input-2"]')).toContainText('HelpDesk');
    // expect.soft(page.locator('#login-title-container')).toContainText('HelpDesk');
    // expect.soft(page.locator('#login-title-container')).toHaveText('HelpDesk');
    // expect.soft(page.locator('[id="mat-input-2"]')).toContainText('HelpDesk');
    // expect.soft(page.locator('[id="mat-input-2"]')).toHaveText('HelpDesk');
    //await page.getByText("HelpDesk").
    await expect(page.getByText('HelpDesk') !== undefined).toBeTruthy();
    await expect(page.getByText('HelpDesk')).toBeVisible();
    //await page.locator('#login-title-container').textContent();
    //expect(page.locator('[id="mat-input-2"]')).toHaveText('HelpDesk');
    //*[@id="login-title-container"]/span

});

test('login success', async ({ page }) => {

    await page.goto(" ");
    await page.getByRole('button', { name: 'profile picture' }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.getByLabel('Email *').fill('victor.garbo@hpm.ro');
    await page.getByLabel('Password *').fill('Victor123!');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await expect(page).toHaveURL(/dashboard/);

});

test('NEGATIVE: login fail', async ({ page }) => {

    await page.goto(" ");
    await page.getByRole('button', { name: 'profile picture' }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.getByLabel('Email *').fill('victor.garbo@hpm.ro');
    await page.getByLabel('Password *').fill('Victor');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await expect(page.locator('snack-bar-container')).toHaveText('Authentication data are incorrect.')

});

test('NEGATIVE: change phone number to invalid', async ({ page }) => {

    await page.goto(" ");
    await page.getByRole('button', { name: 'profile picture' }).click();
    await page.getByRole('menuitem', { name: 'Profile settings' }).click();
    await page.locator('#mat-input-6').fill('0011');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('snack-bar-container')).toHaveText('Operator validation failed: Invalid `phone`.')

});

test('Forgotten password reset success', async ({ page }) => {

    await page.goto(" ");
    await page.getByRole('button', { name: 'profile picture' }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.getByRole('link', { name: 'Forgot your password?' }).click();
    await page.locator('[id="mat-input-2"]').fill('victor.garbo@hpm.ro');
    await page.getByRole('button', { name: 'Send email' }).click();
    await expect(page.locator('snack-bar-container')).toHaveText('An email to reset your password has been sent to victor.garbo@hpm.ro')

});

test('NEGATIVE: Forgotten password reset fail', async ({ page }) => {

    await page.goto(" ");
    await page.getByRole('button', { name: 'profile picture' }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.getByRole('link', { name: 'Forgot your password?' }).click();
    await page.locator('[id="mat-input-2"]').fill('victorgarbo@hpm.ro');
    await page.getByRole('button', { name: 'Send email' }).click();
    await expect(page.locator('snack-bar-container')).toHaveText('Resource not found')

});

test('mute button', async ({ page }) => {

    await page.goto(" ");
    await expect(page).toHaveURL(/dashboard/);
    //mute button
    await page.locator('#ring-btn').hover();
    await expect(page.locator('#cdk-overlay-1')).toHaveText('Ringing on');

    await page.locator('#ring-btn').click();

    await page.locator('#ring-btn').hover();
    await expect(page.locator('#cdk-overlay-2')).toHaveText('Ringing off');

});

test('create appointment', async ({ page }) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);
    await page.goto(" ");
    await expect(page).toHaveURL(/dashboard/);
    //create appointment
    await page.getByText('Schedule').click();
    await expect(page).toHaveURL(/schedule/);

    await page.getByRole('button', { name: 'New appointment' }).click();
    await page.getByLabel('Date *').click();
    await page.getByLabel('Date *').fill('03/03/2030');
    await page.getByLabel('Start interval time *').click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: 'PM' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByLabel('Duration *').locator('div').nth(2).click();
    await page.getByRole('option', { name: '15 minutes' }).locator('span').first().click();
    await page.getByLabel('Type of meeting *').locator('div').nth(3).click();
    await page.getByRole('option', { name: 'Online' }).locator('span').first().click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('snack-bar-container')).toHaveText('Appointment has been added to the calendar.');

});

test('NEGATIVE: create overlapping appointment', async ({ page }) => {
    //login
    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    // await delay(1000);
    await page.goto(" ");
    await expect(page).toHaveURL(/dashboard/);

    //create appointment
    await page.getByText('Schedule').click();
    await expect(page).toHaveURL(/schedule/);

    await page.getByRole('button', { name: 'New appointment' }).click();
    await page.getByLabel('Date *').click();
    await page.getByLabel('Date *').fill('03/03/2030');
    await page.getByLabel('Start interval time *').click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: 'PM' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByLabel('Duration *').locator('div').nth(2).click();
    await page.getByRole('option', { name: '15 minutes' }).locator('span').first().click();
    await page.getByLabel('Type of meeting *').locator('div').nth(3).click();
    await page.getByRole('option', { name: 'Online' }).locator('span').first().click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('snack-bar-container')).toHaveText('The provided interval intersects with an existing one.');

});

test('delete appointment', async ({ page }) => {
    //login
    await page.goto(" ");
    await expect(page).toHaveURL(/dashboard/);

    //delete appointment
    await page.getByText('Schedule').click();
    await expect(page).toHaveURL(/schedule/);

    await page.getByRole('button', { name: 'Delete appointments' }).click();
    await page.getByLabel('Start date *').click();
    await page.getByLabel('Start date *').fill('3/3/2030');
    await page.getByLabel('End date *').click();
    await page.locator('div').filter({ hasText: /^End date \*$/ }).nth(1).click();
    await page.getByLabel('End date *').fill('3/3/2030');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('snack-bar-container')).toHaveText('1 appointments have been deleted.')
});

test('create operator', async ({ page }) => {

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);
    await page.goto(" ");
    await page.getByText('Operators').click();

    await expect(page).toHaveURL(/operators/);
    await page.getByRole('button', { name: 'New operator' }).click();
    await page.getByLabel('Name *').fill('viictor');
    await page.getByLabel('Email *').fill('viictor@mailinator.com');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('snack-bar-container')).toHaveText('Successfully added An activation email has been sent')

});

test('NEGATIVE: create duplicate operator', async ({ page }) => {

    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    // await delay(1000);
    await page.goto(" ");
    await page.getByText('Operators').click();
    await expect(page).toHaveURL(/operators/);
    await page.getByRole('button', { name: 'New operator' }).click();
    await page.getByLabel('Name *').fill('viictor');
    await page.getByLabel('Email *').fill('viictor@mailinator.com');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('snack-bar-container')).toHaveText('Operator already exists');
    //bug detected, wrong error message

});

test('delete operator', async ({ page }) => {

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await page.goto(" ");
    await page.getByText('Operators').click();
    await expect(page).toHaveURL(/operators/);
    await page.getByPlaceholder('Filter by name, email,').fill('viictor');
    await page.getByText('Page:1').click();
    //await new Promise(() => {})
    await delay(1000);
    await page.locator('button').filter({ hasText: 'delete' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.locator('snack-bar-container')).toHaveText('The operator has been successfully deleted.');

});

