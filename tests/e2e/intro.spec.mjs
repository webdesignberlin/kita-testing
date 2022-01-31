// const { test, expect } = require('@playwright/test');
import 'dotenv/config';
import { test, expect } from '@playwright/test';

test('shows correct views for logged out user', async ({ page }) => {
  await page.goto('/');
  const loginForm = page.locator('[data-test="login-form"]');
  const addForm = page.locator('[data-test="add-form"]');
  const testsList = page.locator('[data-test="tests-list"]');
  await expect(loginForm).toBeVisible();
  await expect(addForm).toBeHidden();
  await expect(testsList).toBeHidden();
});

test('should show list', async ({ page }) => {
  await page.goto('/');
  const showButton = page.locator('[data-test="show-list"]');
  const testsList = page.locator('[data-test="tests-list"]');
  await expect(testsList).toBeHidden();
  await showButton.click();
  await expect(testsList).toBeVisible();
});

test('login should works', async ({ page }) => {
  await page.goto('/');
  const loginForm = page.locator('[data-test="login-form"]');
  const addForm = page.locator('[data-test="add-form"]');
  const loginButton = page.locator('text=Einloggen');
  await expect(loginForm).toBeVisible();
  await expect(addForm).toBeHidden();
  await page.fill('[data-test="login-form"] input[type="email"]', process.env.DEMO_LOGIN_USER);
  await page.fill('[data-test="login-form"] input[type="password"]', process.env.DEMO_LOGIN_PASS);
  await loginButton.click();
  await expect(addForm).toBeVisible();
});
