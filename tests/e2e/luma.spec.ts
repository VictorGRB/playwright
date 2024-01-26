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

test('Place Order with Table Rate', async ({ page }) => {

    await page.goto("");

    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/");
    expect(page.getByText('Women').isVisible());
    await addToCart(page);
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'My Cart' }).click();
    await page.waitForTimeout(1000);
    await retryProceed(page);
   
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByText('Shipping Address').isVisible();

    await page.getByLabel('Table Rate').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByText('Payment Method', { exact: true }).isVisible();
    await page.getByRole('button', { name: 'Place Order' }).click();
 
    expect (await page.getByText('Thank you for your purchase!').isVisible());
 

});

test('Place Order with Fixed Rate', async ({ page }) => {

    await page.goto("");

    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/");
    await addToCart(page);
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'My Cart' }).click();
    await page.waitForTimeout(1000);
    await retryProceed(page);
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByText('Shipping Address').isVisible();

    await page.getByLabel('Fixed').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByText('Payment Method', { exact: true }).isVisible();
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.getByText('Thank you for your purchase!', { exact: true }).isVisible();

});

test('Place Order with Discount code', async ({ page }) => {

    test.slow();
    await page.goto("");

    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/");
    await addToCart(page);
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'My Cart' }).click();
    await page.waitForTimeout(1000);
    await retryProceed(page);
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    expect(page.getByText('Shipping Address').isVisible());

    await page.getByLabel('Fixed').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByText('Payment Method', { exact: true }).isVisible();

    //Apply discount code
    if (await page.getByRole('button', { name: 'Cancel coupon' }).isVisible()) {

        await page.getByRole('button', { name: 'Cancel coupon' }).click();
        await page.getByText('Your coupon was successfully removed').isVisible();

    }
    await page.getByText('Apply Discount Code').click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Enter discount code').fill('20poff');
    await page.getByRole('button', { name: 'Apply Discount' }).click();
    await page.getByText('Your coupon was successfully applied').isVisible();
    await page.waitForTimeout(1000);
    //Remove discount code
    await page.getByRole('button', { name: 'Cancel coupon' }).click();
    await page.getByText('Your coupon was successfully removed').isVisible();
    await page.waitForTimeout(1000);
    //Apply invalid discount code
    await page.getByPlaceholder('Enter discount code').fill('invalid code');
    await page.getByRole('button', { name: 'Apply Discount' }).click();
    await page.getByText('The coupon code isn\'t valid. Verify the code and try again.').isVisible();
    await page.waitForTimeout(1000);

    //Reapply discount code
    await page.getByPlaceholder('Enter discount code').fill('20poff');
    await page.getByRole('button', { name: 'Apply Discount' }).click();
    await page.getByText('Your coupon was successfully applied').isVisible()
    await page.getByText('Discount (Get flat 20% off on all products)').isVisible();

    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.getByText('Thank you for your purchase!', { exact: true }).isVisible();


});

test('Change shipping method', async ({ page }) => {

    await page.goto("");

    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/");
    await addToCart(page);
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'My Cart' }).click();
    await page.waitForTimeout(1000);
    await retryProceed(page);
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByText('Shipping Address').isVisible();

    await page.getByLabel('Table Rate').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByText('Payment Method', { exact: true }).isVisible();

    await page.getByRole('button', { name: 'edit' }).nth(1).click();
    await page.getByLabel('Fixed').check();
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.getByText('Thank you for your purchase!', { exact: true }).isVisible();

});

test('Place Order with Cart editing', async ({ page }) => {

    test.slow();
    await page.goto("");

    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/");
    expect(page.getByText('Women').isVisible());
    await addToCart(page);
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'My Cart' }).click();
    await page.waitForTimeout(1000);
    await retryProceed(page);
    //Delete from cart
    await page.getByRole('link', { name: 'Remove' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByText('You have no items in your shopping cart.').isVisible();
    //Add to cart again
    await addToCart(page);
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'My Cart' }).click();
    await page.waitForTimeout(1000);
    await retryProceed(page);
    await page.getByRole('link', { name: 'View and Edit Cart' }).click();
    //Edit cart
    await page.getByRole('spinbutton', { name: 'Qty' }).fill('3');
    await page.getByRole('button', { name: 'Update Shopping Cart' }).click();
    //await page.getByLabel('Table Rate').check({ timeout: 7000 });
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    //await page.getByRole('button', { name: 'Next' }).click()

    await page.getByText('Shipping Address').isVisible();

    await page.getByLabel('Table Rate').check({ timeout: 7000 });
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByText('Payment Method', { exact: true }).isVisible();
    await page.getByRole('button', { name: 'Place Order' }).click();

    await page.getByText('Thank you for your purchase!', { exact: true }).isVisible();

});

test('Place Order with Reorder', async ({ page }) => {

    await page.goto("");

    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/");
    await page.getByRole('banner').locator('button').filter({ hasText: 'Change' }).click();
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.getByRole('link', { name: 'Reorder' }).first().click();

    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByText('Shipping Address').isVisible();

    await page.getByLabel('Fixed').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByText('Payment Method', { exact: true }).isVisible();
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.getByText('Thank you for your purchase!', { exact: true }).isVisible();

});

test('Place Order with multiple addresses ', async ({ page }) => {

    test.setTimeout(50000);
    await page.goto("");

    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/");
    expect(page.getByText('Women').isVisible());
    await addToCart(page);
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'My Cart' }).click();
    await page.waitForTimeout(1000);
    await retryProceed(page);

    await page.getByRole('link', { name: 'View and Edit Cart' }).click();
    await page.getByRole('spinbutton', { name: 'Qty' }).fill('3');
    await page.getByRole('button', { name: 'Update Shopping Cart' }).click();
    await page.getByRole('link', { name: 'Check Out with Multiple Addresses' }).click();
    // await page.locator('#ship_0_591742_address').selectOption('24553');
    // await page.locator('#ship_1_591742_address').selectOption('24554');
    // await page.locator('#ship_2_591742_address').selectOption('24555');
    await page.getByRole('button', { name: 'Go to Shipping Information' }).click();
    await page.getByRole('button', { name: 'Go to Shipping Information' }).click();
    await page.getByLabel('Table Rate $').check();
    // await page.locator('#s_method_727830_tablerate_bestway').check();
    // await page.locator('#s_method_727831_tablerate_bestway').check();
    // await page.locator('#s_method_727832_flatrate_flatrate').check();
    await page.getByRole('button', { name: 'Continue to Billing Information' }).click();
    await page.getByRole('button', { name: 'Go to Review Your Order' }).click();
    await page.getByRole('button', { name: 'Place Order' }).click();

    await page.getByText('Thank you for your purchase!', { exact: true }).isVisible();
});