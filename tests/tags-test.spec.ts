import { test } from "@playwright/test";
test.skip("industry flow Flow", async ({ page }) => {
  const url = "http://localhost:3000/auth/login";
  const username = "";
  const password = "";
  await page.goto(url);
  await page.getByRole("textbox", { name: "Email" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:3000");
  await page.goto("http://localhost:3000/manage-tags");
  await page.getByRole("button", { name: "Create tag" }).click();
  await page.getByLabel("Name *").click();
  await page.getByLabel("Name *").fill("test-tag-007");
  await page.getByLabel("Category *").click();
  await page.getByRole("option", { name: "skill" }).click();
  await page.getByRole("button", { name: "Create" }).click();
  await page
    .getByRole("row", { name: /test-tag-007/ })
    .getByLabel("Edit tag")
    .click();
  await page.getByLabel("Name *").click();
  await page.getByLabel("Name *").fill("test-tag-007-updated");
  await page.getByRole("button", { name: "Save" }).click();
  await page
    .getByRole("row", { name: /test-tag-007-updated/ })
    .getByLabel("Delete tag")
    .click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("delete test-tag-007-updated");
  await page.getByRole("button", { name: "Delete" }).click();
  await page.waitForTimeout(10000); // Wait for 10 seconds to observe the result
});
