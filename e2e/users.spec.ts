import { expect, test } from "@playwright/test";
import { MOCK_USER, setupApiMocks } from "./mocks/api";

test.describe("UsersPage", () => {
  test.beforeEach(async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/users");
  });

  test("renders the page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /usuarios/i })).toBeVisible();
  });

  test("renders a card for each user", async ({ page }) => {
    await expect(page.getByText(MOCK_USER.name)).toBeVisible();
    await expect(page.getByText(`@${MOCK_USER.username}`)).toBeVisible();
  });

  test("navigates to user detail page when clicking a user card", async ({ page }) => {
    await page.getByRole("link", { name: new RegExp(MOCK_USER.name, "i") }).click();
    await expect(page).toHaveURL(/\/users\/1/);
    await expect(page.getByText(MOCK_USER.name)).toBeVisible();
  });
});
