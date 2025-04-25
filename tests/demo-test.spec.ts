import { test, chromium, expect } from "@playwright/test";
test.skip("Whole Flow", async ({ page }) => {
  const url = "http://localhost:3000/auth/login";
  const username = "kashish@mentorskool.com";
  const password = "root_user";

  // const browser = await chromium.launch();
  // const context = await browser.newContext({
  //   httpCredentials: {
  //     username: "mskl",
  //     password: "root_user",
  //   },
  // });

  // const page = await context.newPage();

  await page.goto(url);
  await page.getByRole("textbox", { name: "Email" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.click('button[type="submit"]');
  // await page.click('button[type="submit"]');
  // await expect(page).toHaveURL(/https:\/\/www\.stag-creator\.enqurious\.com/);

  await page
    .getByRole("button", { name: "new Scenario creation button" })
    .click();
  await page.fill(
    'input[name="content.name"]',
    "scenario creation for playwright testing"
  );
  await page.locator("button#generate-slug").click();
  await page.getByPlaceholder("Type here...").fill("scenario description");

  await page.getByRole("combobox", { name: "Industry" }).click();
  await page.locator('ul[role="listbox"] li').first().click();
  await page.getByRole("combobox", { name: "Industry" }).click();
  await page.locator('ul[role="listbox"] li').last().click();

  await page.getByRole("combobox", { name: "Skills" }).click();
  const allSkills = await page.locator('ul[role="listbox"] li').all();
  await expect(allSkills.length).toBeGreaterThan(0); // Ensure there are skills available
  for (let i = 0; i < 4 && i < Math.min(4, allSkills.length); i++) {
    await allSkills[i].click(); // Click each skill (up to 4)
  }

  await page.getByRole("combobox", { name: "Tools" }).click();
  const allTools = await page.locator('ul[role="listbox"] li').all();
  await expect(allTools.length).toBeGreaterThan(0); // Ensure there are tools available
  for (let i = 0; i < 4 && i < Math.min(4, allTools.length); i++) {
    await allSkills[i].click(); // Click each skill (up to 4)
  }

  await page.getByRole("combobox", { name: "Level" }).click();
  await page.getByRole("option", { name: "Beginner" }).click();

  const addPrerequisiteButton = page.getByRole("button", {
    name: "Add pre-requisite",
  });
  await page.fill(
    'input[name="content.preRequisites.0.content"]',
    "first prerequisite"
  );
  await addPrerequisiteButton.click();
  await page.fill(
    'input[name="content.preRequisites.1.content"]',
    "second prerequisite"
  );
  await addPrerequisiteButton.click();
  await page.fill(
    'input[name="content.preRequisites.2.content"]',
    "third prerequisite"
  );
  // count all the prerequisites and they should be four
  const prerequisitesCount = await page
    .locator('[data-testid^="remove-pre-requisite-"]')
    .count();

  await expect(prerequisitesCount).toBe(3);
  // Remove the last two prerequisites
  await page
    .locator(`[data-testid="remove-pre-requisite-${prerequisitesCount - 1}"]`)
    .click();
  await page
    .locator(`[data-testid="remove-pre-requisite-${prerequisitesCount - 2}"]`)
    .click();
  const updatedPrerequisitesCount = await page
    .locator('[data-testid^="remove-pre-requisite-"]')
    .count();
  await expect(updatedPrerequisitesCount).toBe(1);

  const addLearningObjectiveButton = page.getByRole("button", {
    name: "Add objective",
  });

  await page.fill(
    'input[name="content.learningObjectives.0.content"]',
    "first learningObjective"
  );

  await addLearningObjectiveButton.click();

  await page.fill(
    'input[name="content.learningObjectives.1.content"]',
    "second learningObjective"
  );

  await addLearningObjectiveButton.click();

  await page.fill(
    'input[name="content.learningObjectives.2.content"]',
    "third learningObjective"
  );

  const learningObjectivesCount = await page
    .locator('[data-testid^="remove-learning-objective-"]')
    .count();

  await expect(learningObjectivesCount).toBe(3);

  await page
    .locator(
      `[data-testid="remove-learning-objective-${learningObjectivesCount - 1}"]`
    )
    .click();
  await page
    .locator(
      `[data-testid="remove-learning-objective-${learningObjectivesCount - 2}"]`
    )
    .click();
  const updatedLearningObjectivesCount = await page
    .locator('[data-testid^="remove-learning-objective-"]')
    .count();
  await expect(updatedLearningObjectivesCount).toBe(1);

  await page.fill('input[name="content.durationOfCompletion"]', "120");

  await page.fill('input[name="content.value"]', "12");
  await page.getByRole("button", { name: "Create" }).click();
  await page
    .getByRole("link", { name: /scenario creation for playwright testing/ })
    .first()
    .click();
  await page.getByRole("button", { name: "Go to content" }).click();
  await page.getByRole("link", { name: "Edit" }).click();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("menuitem", { name: "Markdown instruction" }).click();
  await page.getByRole("textbox", { name: "Type here..." }).click();
  await page
    .getByRole("textbox", { name: "Type here..." })
    .fill("this is markdown instruction");
  await page.locator("id=add-input-button").first().click();
  await page.getByRole("menuitem", { name: "Multiple choice" }).click();
  // await page
  //   .locator('[data-testid="radio-question"]')
  //   .fill("this is mcq question");

  await page
    .getByTestId("radio-question")
    .getByRole("textbox", { name: "Question" })
    .fill("i am radio question");
  await page
    .getByTestId("radio-option-0")
    .getByRole("textbox", { name: "option" })
    .fill("option 1");
  await page.getByTestId("add-radio-option-0").click();
  await page
    .getByTestId("radio-option-1")
    .getByRole("textbox", { name: "option" })
    .fill("option 2");
  await page.getByTestId("add-radio-option-1").click();
  await page
    .getByTestId("radio-option-2")
    .getByRole("textbox", { name: "option" })
    .fill("option 3");
  await page.getByTestId("add-radio-option-2").click();
  await page
    .getByTestId("radio-option-3")
    .getByRole("textbox", { name: "option" })
    .fill("option 4");
  await page.getByTestId("add-radio-option-3").click();
  await page
    .getByTestId("radio-option-4")
    .getByRole("textbox", { name: "option" })
    .fill("option 5");
  await page.getByTestId("remove-radio-option-4").click();
  await page.getByRole("radio").first().check();

  await page.locator("id=add-input-button").first().click();

  await page.getByRole("menuitem", { name: "Checkbox" }).click();
  await page
    .getByTestId("checkbox-question")
    .getByRole("textbox", { name: "Question" })
    .fill("i am checkbox question");
  await page
    .getByTestId("checkbox-option-0")
    .getByRole("textbox", { name: "option" })
    .fill("option 1");

  await page.getByTestId("add-checkbox-option-0").click();
  await page
    .getByTestId("checkbox-option-1")
    .getByRole("textbox", { name: "option" })
    .fill("option 2");
  await page.getByTestId("add-checkbox-option-1").click();
  await page
    .getByTestId("checkbox-option-2")
    .getByRole("textbox", { name: "option" })
    .fill("option 3");
  await page.getByTestId("add-checkbox-option-2").click();
  await page
    .getByTestId("checkbox-option-3")
    .getByRole("textbox", { name: "option" })
    .fill("option 4");
  await page.getByRole("checkbox").first().check();

  await page.locator("id=add-input-button").first().click();
  await page.getByRole("menuitem", { name: "Short answer" }).click();
  await page
    .getByTestId("short-answer-question")
    .getByRole("textbox", { name: "Question" })
    .fill("i am short answer question");

  await page.locator("id=add-input-button").first().click();
  await page.getByRole("menuitem", { name: "Code" }).click();
  await page
    .getByTestId("code-input-question")
    .getByRole("textbox", { name: "Question" })
    .fill("this is code input question");

  await page.locator("id=add-input-button").first().click();
  await page.getByRole("menuitem", { name: "File upload" }).click();
  await page
    .getByTestId("file-upload-question")
    .getByRole("textbox", { name: "Question" })
    .fill("this is file upload question");

  await page
    .getByRole("link", { name: "scenario creation for playwright testing" })
    .click();

  await page.getByRole("button", { name: "Click to Publish" }).click();

  await page.getByRole("textbox").first().fill("Publish scenario");
  await page.getByRole("button", { name: "Publish" }).click();
  await page.getByRole("link", { name: "Enqurious logo" }).click();

  await page
    .getByTestId(/content-card-menu-/)
    .first()
    .click();

  await page.getByRole("menuitem", { name: "Un-publish" }).click();
  await page.getByRole("button", { name: "Un-publish" }).click();

  await page
    .getByTestId(/content-card-menu-/)
    .first()
    .click();

  await page.getByRole("menuitem", { name: "Archive" }).click();
  await page.getByRole("button", { name: "Archive" }).click();

  await page.goto("http://localhost:3000/archive");
  await page
    .getByTestId(/archived-card-menu-/)
    .last()
    .click();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await page.getByRole("textbox").click();
  await page
    .getByRole("textbox")
    .fill("delete scenario creation for playwright testing");
  await page.getByRole("button", { name: "Delete" }).click();
  // await page
  //   .getByTestId("checkbox-tags")
  //   .getByRole("combobox", { name: "Tags" })
  //   .click();
  // const allTags = await page.locator('ul[role="listbox"] li').all();
  // console.log({ allTags });
  // await expect(allTags.length).toBeGreaterThan(0);
  // for (let i = 0; i < 4 && i < Math.min(4, allTags.length); i++) {
  //   await allTags[i].click();
  // }
  // await page
  //   .locator("data-testid=radio-question").cl
  //   .fill("this is radio question");
  await page.waitForTimeout(10000);
});
