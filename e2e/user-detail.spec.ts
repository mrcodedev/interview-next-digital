import { expect, test } from "@playwright/test";
import { MOCK_ALBUMS, MOCK_TODOS, MOCK_USER, setupApiMocks } from "./mocks/api";

test.describe("UserDetailPage", () => {
  test.beforeEach(async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/users/1");
  });

  test("renders the user name and username", async ({ page }) => {
    await expect(page.getByText(MOCK_USER.name)).toBeVisible();
    await expect(page.getByText(`@${MOCK_USER.username}`)).toBeVisible();
  });

  test("renders user info chips with email and city", async ({ page }) => {
    await expect(page.getByText(MOCK_USER.email)).toBeVisible();
    await expect(page.getByText(MOCK_USER.address.city)).toBeVisible();
  });

  test("albums tab is active by default and shows album titles", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Albums" })).toBeVisible();
    await expect(page.getByText(MOCK_ALBUMS[0].title)).toBeVisible();
  });

  test("switches to todos tab and renders todo items", async ({ page }) => {
    await page.getByRole("button", { name: "ToDos" }).click();
    await expect(page.getByText(MOCK_TODOS[0].title)).toBeVisible();
    await expect(page.getByText(MOCK_TODOS[1].title)).toBeVisible();
  });

  test("can add a new todo from the create form", async ({ page }) => {
    await page.getByRole("button", { name: "ToDos" }).click();
    await page.getByPlaceholder("Write a task (text only)...").fill("buy some groceries");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("buy some groceries")).toBeVisible();
  });

  test("navigates back to users list when clicking the back button", async ({ page }) => {
    // Navigate within the app to build proper browser history
    await page.goto("/users");
    await page.getByRole("link", { name: new RegExp(MOCK_USER.name, "i") }).click();
    await expect(page).toHaveURL(/\/users\/1/);

    await page.getByRole("button", { name: /back/i }).click();
    await expect(page).toHaveURL(/\/users$/);
  });
});
