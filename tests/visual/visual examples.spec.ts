// @ts-check
import { test, expect, Page } from '@playwright/test';

async function addToCart(page: Page) {
    await page.getByRole('menuitem', { name: 'Women' }).hover();
    await page.getByRole('menuitem', { name: 'Tops' }).hover();
    await page.getByRole('menuitem', { name: 'Jackets' }).click();
    await page.getByLabel('Items').getByText('Jackets').isVisible();
    await page.locator('li').filter({ hasText: 'Olivia 1/4 Zip Light Jacket' }).getByLabel('M', { exact: true }).click();
    await page.locator('li').filter({ hasText: 'Olivia 1/4 Zip Light Jacket' }).getByLabel('Purple').click();
    await page.locator('li').filter({ hasText: 'Olivia 1/4 Zip Light Jacket' }).locator('button').click();
}

async function retryProceed(page: Page) {
    if (await page.getByRole('button', { name: 'Proceed to Checkout' }).isHidden()) {

        await page.getByRole('link', { name: 'My Cart' }).click();
        retryProceed(page);
    }
}

test('purchase flow', async ({ page }) => {

    test.slow();
    await page.goto(" ");
    await expect(page.getByText('What\'s New')).toBeVisible();
    await page.waitForTimeout(1000);
    //Homepage screenshot assertion 
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');

    await addToCart(page);
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'My Cart' }).click();
    await page.waitForTimeout(3000);
    await retryProceed(page);

    //Cart screenshot assertion
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot('cart.png');

    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByText('Shipping Address').isVisible();

    //Shipping screenshot assertion
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot('shipping.png');

    await page.getByLabel('Table Rate').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByText('Payment Method', { exact: true }).isVisible();

    //Payment screenshot assertion
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot('payment.png');

    await page.getByRole('button', { name: 'Place Order' }).click();
    expect(await page.getByText('Thank you for your purchase!').isVisible());

    //Thanks screenshot assertion
    expect(await page.screenshot({ mask: [page.getByText('Your order number is:')] })).toMatchSnapshot('thanks.png');

});  