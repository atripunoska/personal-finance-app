import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form elements', async ({ page }) => {
    // Check form fields
    await expect(page.getByPlaceholder('your@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('••••••••')).toBeVisible();

    // Check submit button
    await expect(page.getByRole('button', { name: /log in/i })).toBeVisible();

    // Check sign up link
    await expect(page.getByRole('link', { name: /sign up/i })).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Fill in invalid credentials
    await page.getByPlaceholder('your@email.com').fill('invalid@email.com');
    await page.getByPlaceholder('••••••••').fill('wrongpassword');

    // Submit form
    await page.getByRole('button', { name: /log in/i }).click();

    // Wait for error message
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });

  test('should show validation error for empty email', async ({ page }) => {
    // Fill only password
    await page.getByPlaceholder('••••••••').fill('somepassword');

    // Try to submit
    await page.getByRole('button', { name: /log in/i }).click();

    // Email field should show validation error (HTML5 validation)
    const emailInput = page.getByPlaceholder('your@email.com');
    await expect(emailInput).toHaveAttribute('required', '');
  });

  test('should show validation error for empty password', async ({ page }) => {
    // Fill only email
    await page.getByPlaceholder('your@email.com').fill('test@email.com');

    // Try to submit
    await page.getByRole('button', { name: /log in/i }).click();

    // Password field should have required attribute
    const passwordInput = page.getByPlaceholder('••••••••');
    await expect(passwordInput).toHaveAttribute('required', '');
  });

  test('should show loading state while logging in', async ({ page }) => {
    // Fill credentials
    await page.getByPlaceholder('your@email.com').fill('test@email.com');
    await page.getByPlaceholder('••••••••').fill('password123');

    // Click login and check for loading state
    await page.getByRole('button', { name: /log in/i }).click();

    // Button should show loading text (may be brief)
    await expect(
      page.getByRole('button', { name: /logging in/i })
    ).toBeVisible();
  });

  test('should navigate to sign up page', async ({ page }) => {
    // Click sign up link and wait for navigation
    await Promise.all([
      page.waitForURL(/\/signup/),
      page.getByRole('link', { name: /sign up/i }).click(),
    ]);

    // Verify we're on the signup page
    await expect(page).toHaveURL(/\/signup/);
  });

  test('should redirect to dashboard after successful login', async ({
    page,
  }) => {
    // Skip if no test credentials are configured
    const testEmail = process.env.TEST_USER_EMAIL;
    const testPassword = process.env.TEST_USER_PASSWORD;

    test.skip(
      !testEmail || !testPassword,
      'Set TEST_USER_EMAIL and TEST_USER_PASSWORD env vars to run this test'
    );

    // Fill test credentials from environment
    await page.getByPlaceholder('your@email.com').fill(testEmail!);
    await page.getByPlaceholder('••••••••').fill(testPassword!);

    // Submit form
    await page.getByRole('button', { name: /log in/i }).click();

    // Wait for either redirect or error message
    await expect(async () => {
      const url = page.url();
      const errorVisible = await page
        .getByText(/Invalid credentials./i)
        .isVisible()
        .catch(() => false);

      if (errorVisible) {
        throw new Error(
          'Login failed: Invalid credentials. Check TEST_USER_EMAIL and TEST_USER_PASSWORD in .env.test'
        );
      }

      expect(url).toMatch(/\/dashboard/);
    }).toPass({ timeout: 10000 });
  });

  test('should have correct input types for security', async ({ page }) => {
    // Email should be type email
    const emailInput = page.getByPlaceholder('your@email.com');
    await expect(emailInput).toHaveAttribute('type', 'email');

    // Password should be type password (masked)
    const passwordInput = page.getByPlaceholder('••••••••');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should disable submit button while form is submitting', async ({
    page,
  }) => {
    // Fill credentials
    await page.getByPlaceholder('your@email.com').fill('test@email.com');
    await page.getByPlaceholder('••••••••').fill('password123');

    // Click login
    const submitButton = page.getByRole('button', { name: /log in/i });
    await submitButton.click();

    // Button should be disabled during submission
    await expect(
      page.getByRole('button', { name: /logging in/i })
    ).toBeDisabled();
  });
});
