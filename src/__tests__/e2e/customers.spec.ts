import { test, expect } from "@playwright/test";

test.describe("Customers Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/customers");
  });

  test("should display customers list", async ({ page }) => {
    await expect(page.getByTestId("customers-table")).toBeVisible();
    await expect(page.getByTestId("customers-table-row")).toHaveCount(10);
  });

  test("should filter customers by search", async ({ page }) => {
    await page.getByTestId("customers-table-search").fill("john");
    await expect(page.getByTestId("customers-table-row")).toHaveCount(2);
  });

  test("should filter customers by status", async ({ page }) => {
    await page.getByTestId("customers-table-filter").click();
    await page.getByRole("option", { name: "Active" }).first().click();
    await expect(page.getByText("Active")).toHaveCount(7);
  });
});
