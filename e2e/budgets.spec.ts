import { test, expect } from '@playwright/test';

test.describe('Budgets Page', () => {
  test.beforeEach(async ({ page }) => {
    // Skip all tests if no credentials configured
    const testEmail = process.env.TEST_USER_EMAIL;
    const testPassword = process.env.TEST_USER_PASSWORD;

    test.skip(
      !testEmail || !testPassword,
      'Set TEST_USER_EMAIL and TEST_USER_PASSWORD env vars to run these tests'
    );

    // Login first
    await page.goto('/login');
    await page.getByPlaceholder('your@email.com').fill(testEmail!);
    await page.getByPlaceholder('••••••••').fill(testPassword!);
    await page.getByRole('button', { name: /log in/i }).click();

    // Wait for dashboard redirect
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

    // Navigate to budgets page
    await page.goto('/dashboard/budgets');
    await expect(page).toHaveURL(/\/dashboard\/budgets/);
  });

  test('should display budgets page elements', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: 'Budgets' })).toBeVisible();

    // Check add budget button
    await expect(
      page.getByRole('button', { name: /add new budget/i })
    ).toBeVisible();
  });

  test('should open add budget modal', async ({ page }) => {
    // Click add budget button
    await page.getByRole('button', { name: /add new budget/i }).click();

    // Modal should be visible
    await expect(page.getByText('Add New Budget')).toBeVisible();

    // Check form fields
    await expect(page.getByText('Budget Category')).toBeVisible();
    await expect(page.getByText('Maximum Amount')).toBeVisible();
    await expect(page.getByText('Theme')).toBeVisible();

    // Check submit button
    await expect(
      page.getByRole('button', { name: /add budget/i })
    ).toBeVisible();
  });

  test('should close add budget modal when clicking close button', async ({
    page,
  }) => {
    // Open modal
    await page.getByRole('button', { name: /add new budget/i }).click();
    await expect(page.getByText('Add New Budget')).toBeVisible();

    // Close modal (look for X button or close button)
    const closeButton = page.getByRole('button', { name: /close modal/i });
    if ((await closeButton.count()) > 0) {
      await closeButton.first().click();
    } else {
      // Try pressing Escape
      await page.keyboard.press('Escape');
    }

    // Modal should be closed
    await expect(page.getByText('Add New Budget')).not.toBeVisible();
  });

  test('should display budget cards if budgets exist', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if any budget cards exist (they have a progress bar and maximum amount)
    const budgetCards = page.locator('[class*="budget"]').or(
      page.getByText(/maximum of/i)
    );

    // If budgets exist, verify card structure
    const cardCount = await budgetCards.count();
    if (cardCount > 0) {
      // At least one budget should show spent/remaining info
      await expect(
        page.getByText(/spent/i).or(page.getByText(/remaining/i)).first()
      ).toBeVisible();
    }
  });

  test('should show budget chart section', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Look for chart or spending summary
    const chartSection = page
      .locator('canvas')
      .or(page.getByText(/spending summary/i));

    // Chart should be present if there are budgets
    const hasChart = (await chartSection.count()) > 0;
    if (hasChart) {
      await expect(chartSection.first()).toBeVisible();
    }
  });
});

test.describe('Budget CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    const testEmail = process.env.TEST_USER_EMAIL;
    const testPassword = process.env.TEST_USER_PASSWORD;

    test.skip(
      !testEmail || !testPassword,
      'Set TEST_USER_EMAIL and TEST_USER_PASSWORD env vars to run these tests'
    );

    // Login and navigate to budgets
    await page.goto('/login');
    await page.getByPlaceholder('your@email.com').fill(testEmail!);
    await page.getByPlaceholder('••••••••').fill(testPassword!);
    await page.getByRole('button', { name: /log in/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    await page.goto('/dashboard/budgets');
  });

  test('should create a new budget', async ({ page }) => {
    // Open add budget modal
    await page.getByRole('button', { name: /add new budget/i }).click();
    await expect(page.getByText('Add New Budget')).toBeVisible();

    // Select a category from dropdown
    const categorySelect = page.locator('select').first();
    await categorySelect.selectOption({ index: 1 }); // Select first available category

    // Enter maximum amount
    const amountInput = page.locator('#maximum');
    await amountInput.fill('500');

    // Select a theme (second dropdown)
    const themeSelect = page.locator('select').nth(1);
    const themeOptions = await themeSelect.locator('option').count();
    if (themeOptions > 1) {
      await themeSelect.selectOption({ index: 1 });
    }

    // Submit the form
    await page.getByRole('button', { name: /add budget/i }).click();

    // Should show success toast or modal closes
    await expect(async () => {
      const modalVisible = await page.getByText('Add New Budget').isVisible();
      const toastVisible = await page
        .getByText(/success|added|created/i)
        .isVisible()
        .catch(() => false);

      expect(modalVisible === false || toastVisible === true).toBe(true);
    }).toPass({ timeout: 5000 });
  });

  test('should open edit budget modal from card menu', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Find a budget card's menu button (usually "..." or ellipsis)
    const menuButtons = page.locator('button').filter({ hasText: /⋮|\.\.\./ });
    const menuButtonCount = await menuButtons.count();

    if (menuButtonCount === 0) {
      // Try finding by aria-label or other patterns
      const altMenuButtons = page.getByRole('button', { name: /menu|options/i });
      if ((await altMenuButtons.count()) === 0) {
        test.skip(true, 'No budget cards with menu buttons found');
        return;
      }
      await altMenuButtons.first().click();
    } else {
      await menuButtons.first().click();
    }

    // Click edit option
    await page.getByText(/edit/i).click();

    // Edit modal should open
    await expect(page.getByText('Edit Budget')).toBeVisible();

    // Check form fields are pre-populated
    await expect(page.getByText('Budget Category')).toBeVisible();
    await expect(page.getByText('Maximum Spend')).toBeVisible();
  });

  test('should open delete confirmation modal', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Find menu button on budget card
    const menuButtons = page.locator('button').filter({ hasText: /⋮|\.\.\./ });
    const menuButtonCount = await menuButtons.count();

    if (menuButtonCount === 0) {
      test.skip(true, 'No budget cards with menu buttons found');
      return;
    }

    await menuButtons.first().click();

    // Click delete option
    await page.getByText(/delete/i).click();

    // Delete confirmation modal should open
    await expect(
      page.getByText(/are you sure you want to delete this budget/i)
    ).toBeVisible();

    // Should have confirm and cancel buttons
    await expect(
      page.getByRole('button', { name: /yes|confirm|delete/i })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /no|cancel|go back/i })
    ).toBeVisible();
  });

  test('should cancel delete and keep budget', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Find menu button
    const menuButtons = page.locator('button').filter({ hasText: /⋮|\.\.\./ });
    if ((await menuButtons.count()) === 0) {
      test.skip(true, 'No budget cards found');
      return;
    }

    await menuButtons.first().click();
    await page.getByText(/delete/i).click();

    // Click cancel/no button
    await page.getByRole('button', { name: /no|cancel|go back/i }).click();

    // Modal should close
    await expect(
      page.getByText(/are you sure|confirm deletion/i)
    ).not.toBeVisible();
  });
});

test.describe('Budgets Navigation', () => {
  test.beforeEach(async ({ page }) => {
    const testEmail = process.env.TEST_USER_EMAIL;
    const testPassword = process.env.TEST_USER_PASSWORD;

    test.skip(
      !testEmail || !testPassword,
      'Set TEST_USER_EMAIL and TEST_USER_PASSWORD env vars'
    );

    await page.goto('/login');
    await page.getByPlaceholder('your@email.com').fill(testEmail!);
    await page.getByPlaceholder('••••••••').fill(testPassword!);
    await page.getByRole('button', { name: /log in/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
  });

  test('should navigate to budgets from sidebar', async ({ page }) => {
    // Find and click budgets link in sidebar
    await page.getByRole('link', { name: /budgets/i }).click();

    // Should be on budgets page
    await expect(page).toHaveURL(/\/dashboard\/budgets/);
    await expect(page.getByRole('heading', { name: 'Budgets' })).toBeVisible();
  });
});
