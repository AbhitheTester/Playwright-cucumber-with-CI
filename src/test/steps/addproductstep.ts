import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test"; 

import { PageFixture } from "../../hook/fixture";



When("user searches for product {string}", async function (productName: string) {
 // await page.locator("[placeholder='Search for Products']").fill(productName);
const searchBox = PageFixture.page.getByRole('textbox', { name: 'search' })
PageFixture.logger.info(`Searching for product: ${productName}`);
await searchBox.click();
    await searchBox.fill(productName);
  await searchBox.press("Enter");
});

When("user adds product to cart", async function () { 
  PageFixture.logger.info("Adding product to cart");
  await  PageFixture.page.getByRole("button",{name:"Add To Cart"}).first().click();  
    
});

Then("cart count should be greater than 0", async function () {
 const cartCount =  PageFixture.page
    .getByRole('button', { name: /Cart/i })
    .locator('label');
    await expect(cartCount).toBeVisible();
    console.log(await cartCount.count());

await expect(cartCount).toHaveText('1');
PageFixture.logger.info("Cart count is greater than 0, product added successfully");
});
