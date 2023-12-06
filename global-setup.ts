import { Browser,Page,chromium, expect } from "@playwright/test";

async function globalSetup(){
    const browser: Browser = await chromium.launch();
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto("https://stage.helpdesk.hypertalk.net/back-office/");
    await page.getByLabel('Email *').fill('victor.garbo@hpm.ro');
    await page.getByLabel('Password *').fill('Victor123!');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await expect(page).toHaveURL(/dashboard/);

    await page.context().storageState({path:"./LoginAuth.json"})

    await browser.close();
}
export default globalSetup;