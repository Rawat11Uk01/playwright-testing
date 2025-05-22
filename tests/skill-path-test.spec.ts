import { expect, test } from "@playwright/test";
test.skip("skill path creation Flow", async ({ page }) => {
  const url = "http://localhost:3000/auth/login";
  const username = "";
  const password = "";
  await page.goto(url);
  await page.getByRole("textbox", { name: "Email" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:3000");
  await page.goto("http://localhost:3000/manage-skill-path");
  await page.getByRole("button", { name: "Create path" }).click();
  await page
    .getByRole("textbox", { name: "Name" })
    .fill(`Playwright test path`);
  await page.getByTestId("generate-slug-button").click();
  await page.waitForTimeout(2000); // Wait for 2 seconds to observe the result
  await page.getByPlaceholder("Type here...").fill("skill path description");
  await page.getByRole("button", { name: "Create" }).click();
  await page.waitForTimeout(2000); // Wait for 2 seconds to observe the result
  await page
    .getByRole("link", { name: /Playwright test path/ })
    .first()
    .click();
  await page.getByRole("link", { name: "Edit" }).click();

  // add scenario
  await page.getByRole("button", { name: "Add Module" }).click();
  await page.getByRole("menuitem", { name: "Scenario", exact: true }).click();
  await page.getByRole("combobox", { name: "Select scenarios" }).click();
  await page.locator('ul[role="listbox"]').waitFor();
  const allScenarios = await page.locator('ul[role="listbox"] li').all();
  await expect(allScenarios.length).toBeGreaterThan(0); // Ensure there are tools available
  for (let i = 0; i < 4 && i < Math.min(4, allScenarios.length); i++) {
    await allScenarios[i].click(); // Click each skill (up to 4)
  }
  await page.getByRole("button", { name: "Close" }).click();
  const addButton = await page.getByRole("button", { name: "Add" });
  await addButton.click();

  // add project
  await page.getByRole("button", { name: "Add Module" }).click();
  await page.getByRole("menuitem", { name: "Project" }).click();
  await page.getByLabel("Open", { exact: true }).click();
  await page.locator('ul[role="listbox"]').waitFor();
  const allProjects = await page.locator('ul[role="listbox"] li').all();

  for (let i = 0; i < 4 && i < Math.min(4, allProjects.length); i++) {
    await allProjects[i].click(); // Click each skill (up to 4)
  }
  await page.getByRole("button", { name: "Close" }).click();
  await addButton.click();

  // add masterclass
  await page.getByRole("button", { name: "Add Module" }).click();
  await page.getByRole("menuitem", { name: "Masterclass" }).click();
  await page.getByLabel("Open", { exact: true }).click();
  await page.locator('ul[role="listbox"]').waitFor();
  const allMasterclasses = await page.locator('ul[role="listbox"] li').all();
  for (let i = 0; i < 4 && i < Math.min(4, allMasterclasses.length); i++) {
    await allMasterclasses[i].click(); // Click each skill (up to 4)
  }
  await page.getByRole("button", { name: "Close" }).click();
  await addButton.click();

  // add scenario bundle
  await page.getByRole("button", { name: "Add Module" }).click();
  await page.getByRole("menuitem", { name: "Scenario bundle" }).click();
  await page
    .getByRole("textbox", { name: "Name" })
    .fill("Scenario bundle name");

  await page.getByRole("combobox", { name: "Intent" }).click();
  await page.getByRole("option", { name: "Assessment" }).click();

  await page
    .getByRole("textbox", { name: "Description" })
    .fill("Scenario bundle description");

  await page.getByRole("combobox", { name: "Select scenario" }).click();
  await page.locator('ul[role="listbox"]').waitFor();
  const allScenarioBundleScenarios = await page
    .locator('ul[role="listbox"] li')
    .all();
  await expect(allScenarioBundleScenarios.length).toBeGreaterThan(0);
  for (
    let i = 0;
    i < 4 && i < Math.min(4, allScenarioBundleScenarios.length);
    i++
  ) {
    await allScenarioBundleScenarios[i].click(); // Click each skill (up to 4)
  }
  await page.getByRole("button", { name: "Close" }).click();
  await addButton.click();
  await page.getByRole("link", { name: "playwright test path" }).click();

  await page.getByRole("button", { name: "Click to Publish" }).click();

  await page.getByRole("button", { name: "Publish" }).click();
  await page.waitForTimeout(2000); // Wait for 2 seconds to observe the result
  await page.goto("http://localhost:3000/manage-skill-path");
  await page
    .getByTestId(/skill-path-card-menu-/)
    .first()
    .click();
  await page.getByRole("menuitem", { name: "Un-publish" }).click();
  await page.getByRole("button", { name: "Un-publish" }).click();
  await page
    .getByTestId(/skill-path-card-menu-/)
    .first()
    .click();
  await page.getByRole("menuitem", { name: "Archive" }).click();
  await page.getByRole("button", { name: "Archive" }).click();
  await page.waitForTimeout(1000);

  await page.goto("http://localhost:3000/archive");
  await page.getByRole("tab", { name: "Skill Path" }).click();

  await page
    .getByTestId(/archived-card-menu-/)
    .last()
    .click();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("delete Playwright test path");
  await page.getByRole("button", { name: "Delete" }).click();
  // await page.waitForRequest(
  //   (request) =>
  //     request.url().includes("/skill-path") && request.method() === "DELETE"
  // );
  await page.waitForTimeout(5000);
});
