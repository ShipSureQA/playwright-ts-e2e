# Playwright + TypeScript E2E Test Framework (Demo)

![Playwright Tests](https://github.com/ShipSureQA/playwright-ts-e2e/actions/workflows/playwright.yml/badge.svg)

> **Demo / self-initiated project.** Built to show my approach to UI test automation. It tests [saucedemo.com](https://www.saucedemo.com), a public practice site made for test automation. It is not client work.

## What it shows
- **Page Object Model**: `pages/` holds one class per screen. Tests never touch raw selectors.
- **Custom fixtures**: `fixtures/test.ts` injects page objects and a ready-logged-in session.
- **Stable locators**: `data-test` attributes via `getByTestId`, with no brittle CSS/XPath.
- **Data-driven tests**: login validation cases generated from a table.
- **Cross-browser + mobile**: Chromium, Firefox, Pixel 7 emulation.
- **CI**: GitHub Actions runs on every push, PR and a weekly schedule, and uploads the HTML report as an artifact.
- **Debug evidence**: trace on retry, screenshot and video on failure.

## Coverage (12 scenarios × 3 browsers = 36 test runs)
| Area | Scenarios |
|---|---|
| Login | valid login, locked-out user, wrong password, required-field validation |
| Inventory | product count, sort by price (asc/desc), sort by name, cart badge add/remove |
| Checkout | full purchase with total = subtotal + tax check, required-field validation |

Tag `@smoke` marks the critical path: `npx playwright test --grep @smoke`

## Run it
```bash
npm ci
npx playwright install
npm test                 # all browsers
npm run test:chromium    # one browser
npm run report           # open HTML report
```

## Structure
```
pages/        Page objects (Login, Inventory, Cart, Checkout)
fixtures/     Custom Playwright fixtures
tests/        Spec files
test-data/    Users and checkout data
.github/      CI workflow
```
