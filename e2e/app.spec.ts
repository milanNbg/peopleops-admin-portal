import { expect, test } from '@playwright/test'

test('dashboard loads successfully', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveURL(/\/dashboard$/)
  await expect(
    page.getByRole('heading', { name: 'PeopleOps Admin Portal' }),
  ).toBeVisible()
  await expect(
    page.getByRole('region', { name: 'PeopleOps Admin Portal' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Workforce trend' })).toBeVisible()
})

test('user can navigate from Dashboard to Employees', async ({ page }) => {
  await page.goto('/dashboard')

  await page.getByRole('link', { name: 'Employees' }).click()

  await expect(page).toHaveURL(/\/employees$/)
  await expect(
    page.getByRole('heading', { level: 2, name: 'Employees' }),
  ).toBeVisible()
  await expect(
    page.getByRole('table', { name: 'Employee directory' }),
  ).toBeVisible()
})

test('employee search and filters update visible results and URL state', async ({
  page,
}) => {
  await page.goto('/employees')

  await expect(page.getByRole('heading', { name: 'Employees' })).toBeVisible()

  await page
    .getByRole('searchbox', {
      name: 'Search employees by name, role, or location',
    })
    .fill('avery')
  await page
    .getByRole('combobox', { name: 'Filter employees by department' })
    .selectOption('Customer Success')
  await page
    .getByRole('combobox', { name: 'Filter employees by status' })
    .selectOption('On Leave')

  await expect(page.getByText('1 of 6 employees')).toBeVisible()
  await expect(page.getByText('Avery Stone')).toBeVisible()
  await expect(page.getByText('Maya Chen')).not.toBeVisible()
  await expect
    .poll(() => new URL(page.url()).searchParams.get('search'))
    .toBe('avery')
  await expect
    .poll(() => new URL(page.url()).searchParams.get('department'))
    .toBe('Customer Success')
  await expect
    .poll(() => new URL(page.url()).searchParams.get('status'))
    .toBe('On Leave')
})

test('theme toggle changes between light and dark mode', async ({ page }) => {
  await page.goto('/dashboard')

  await page.getByRole('button', { name: 'Switch to Dark mode' }).click()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(
    page.getByRole('button', { name: 'Switch to Light mode' }),
  ).toHaveAttribute('aria-pressed', 'true')

  await page.getByRole('button', { name: 'Switch to Light mode' }).click()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(
    page.getByRole('button', { name: 'Switch to Dark mode' }),
  ).toHaveAttribute('aria-pressed', 'false')
})

test('unknown route shows the Not Found page', async ({ page }) => {
  await page.goto('/unknown-route')

  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Back to Dashboard' })).toBeVisible()
})
