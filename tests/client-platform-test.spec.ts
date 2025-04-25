import { test, chromium, expect } from "@playwright/test";

test("client flow test", async ({ page }) => {
  const url = "http://localhost:3000/auth/login";
  const username = "admin@globalmart.com";
  const password = "root_user";

  await page.goto(url);
  await page.getByRole("textbox", { name: "Email" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:3000");
  await page.goto("http://localhost:3000/explore/scenario");

  await page
    .getByRole("link", { name: /playwright test for client and learners/ })
    .first()
    .click();

  await page.getByRole("button", { name: "Deploy Scenario" }).click();

  await page.getByRole("combobox", { name: "Intent" }).click();
  await page.locator('ul[role="listbox"] li').first().click();

  await page.getByRole("combobox", { name: "Label" }).click();
  await page.locator('ul[role="listbox"] li').first().click();
  await page
    .getByLabel("Description *")
    .fill("this is a test deployment of scenario");

  // await page.getByLabel("Select learners", { exact: true }).click();
  await page
    .getByLabel("Select learners", { exact: true })
    .scrollIntoViewIfNeeded();
  // await page.getByRole("combobox", { name: "users" }).scrollIntoViewIfNeeded();
  await page.getByLabel("Select learners", { exact: true }).click();

  await page.getByRole("option", { name: /Kashish rawat/ }).click();
  await page.getByRole("button", { name: "Deploy" }).click();
  // await expect(allLearners.length).toBeGreaterThan(0); // Ensure there are skills available
  // for (let i = 0; i < 4 && i < Math.min(4, allLearners.length); i++) {
  //   await allLearners[i].click(); // Click each skill (up to 4)
  // }

  await page.waitForTimeout(10000);
});
