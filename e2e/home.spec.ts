import { expect, test } from "@playwright/test";
import { MOCK_USERS } from "./mocks/api";

test.describe("HomePage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the app title", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /SocialApp/ })).toBeVisible();
  });

  test("has a link to the users page", async ({ page }) => {
    await expect(page.getByRole("link", { name: /ver usuarios/i })).toBeVisible();
  });

  test("shows empty recent albums state", async ({ page }) => {
    await expect(page.getByText(/recién visitados/i)).toBeVisible();
    await expect(page.getByText(/todavía no has visitado/i)).toBeVisible();
  });

  test("navigates to the users page when clicking the link", async ({ page }) => {
    await page.route("https://jsonplaceholder.typicode.com/users", (route) =>
      route.fulfill({ json: MOCK_USERS })
    );
    await page.getByRole("link", { name: /ver usuarios/i }).click();
    await expect(page).toHaveURL(/\/users/);
  });
});
