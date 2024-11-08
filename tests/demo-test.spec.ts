import { test, expect } from "@playwright/test";
test.describe("Login Flow", () => {
  const url = "https://example.com/login";
  const username = "testuser";
  const password = "password123";

  test("should display login page", async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveTitle(/Login/i);
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await page.goto(url);

    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);

    await page.click('button[type="submit"]');

    await page.waitForNavigation();

    await expect(page).toHaveURL(/dashboard/);
  });

  test("should show error message with invalid credentials", async ({
    page,
  }) => {
    await page.goto(url);

    await page.fill('input[name="username"]', "wronguser");
    await page.fill('input[name="password"]', "wrongpassword");

    await page.click('button[type="submit"]');

    const errorMessage = await page.locator(".error-message");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Invalid username or password/);
  });
});
