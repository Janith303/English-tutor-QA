import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {

  test('should log in successfully and reach the dashboard', async ({ page }) => {
    // 1. Go to the login page
    await page.goto('/login');

    // 2. Fill in the email and password
    // (Make sure to use a test account that actually exists in your local Django database!)
    await page.getByPlaceholder('student@university.edu').fill('your_admin@email.com'); 
    await page.getByPlaceholder('password').fill('your_admin_password'); // Update if your placeholder is different

    // 3. Click the login button
    await page.getByRole('button', { name: 'Log in' }).click(); // Change 'Log in' if your button says 'Sign In', etc.

    // 4. Wait for the browser to redirect to the dashboard
    await page.waitForURL('**/admin/dashboard');

    // 5. Verify the URL is correct
    expect(page.url()).toContain('/admin/dashboard');

    // 6. Verify the Dashboard actually loaded by looking for a specific heading
    await expect(page.getByText('System Pulse')).toBeVisible();
  });


  test('should show an error message with incorrect credentials', async ({ page }) => {
    // 1. Go to the login page
    await page.goto('/login');

    // 2. Fill in WRONG credentials
    await page.getByPlaceholder('student@university.edu').fill('hacker@badguy.com');
    await page.getByPlaceholder('password').fill('wrongpassword123');

    // 3. Click the login button
    await page.getByRole('button', { name: 'Log in' }).click();

    // 4. Verify that the user stays on the login page
    expect(page.url()).toContain('/login');

    // 5. Verify that an error message appears on the screen
    // (Change 'Invalid credentials' to whatever error text your React app actually displays)
    await expect(page.getByText('Invalid credentials')).toBeVisible(); 
  });

});