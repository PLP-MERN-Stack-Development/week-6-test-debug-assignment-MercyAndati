# MERN Testing and Debugging Assignment

## 🔢 Project Overview

This project demonstrates comprehensive testing and debugging of a MERN (MongoDB, Express, React, Node.js) stack application. It includes unit tests, integration tests, and end-to-end (E2E) tests with over 70% code coverage, utilizing Jest, React Testing Library, Supertest, and Cypress.

---

## 🎓 Testing Strategy

### 📁 File Structure

```
mern-testing/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── tests/
│   │   │   ├── unit/           # Jest + RTL
│   │   │   └── integration/    # React + API
│   └── cypress/               # Cypress E2E tests
├── server/
│   ├── src/
│   └── tests/                 # Unit & Integration
```

### ✅ Tools Used

| Layer       | Tool(s)                     |
| ----------- | --------------------------- |
| Unit        | Jest, React Testing Library |
| Integration | Supertest, Mongoose         |
| E2E         | Cypress                     |

### ⚙️ Setup Scripts

```bash
pnpm test               # Run all tests
pnpm run test:unit      # Run unit tests
pnpm run test:integration  # Run integration tests
pnpm run test:e2e       # Run Cypress end-to-end tests
```

---

## 🔫 Unit Testing

* Tested utility functions, Express middleware, and React components.
* React component tested: `Button.jsx`
* Covered various states: props, variants, disabled, event handlers

> **Coverage Achieved**: Over 70% for unit tests

---

## 🪤 Integration Testing

* API endpoint tests for `/api/posts`, `/api/auth`
* Used `Supertest` with in-memory MongoDB (via `mongodb-memory-server`)
* React components integration tested:

  * `PostList` (fetches from API)
  * `PostForm` (submits data)
  * `LoginForm` (auth flow)

> **All API and component integrations pass successfully.**

---

## 🚀 End-to-End (E2E) Testing

* Cypress used for smoke testing and critical user flows
* Test: visiting homepage (`cy.visit('/')`), verifying visible content
* Additional tests can include form submission, navigation, error states

> Cypress dashboard works. Sample smoke test passed.

---

## 🔍 Debugging Techniques

### 🛠️ Server-Side

* Added global error handler in `app.js` to log stack traces:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
```

* Used `console.log()` for tracing logic in controllers and tests

### 💻 Client-Side

* Used Cypress error trace output to identify missing content
* Debugged React tests via `--watch` mode and `screen.debug()`
* Mocked API with `jest.mock()` for isolation

### 📍 Coverage Command

```bash
pnpm test -- --coverage
```

> Generates coverage report in `coverage/lcov-report/index.html`

---

## 🗃️ Screenshots

Screenshots included in `screenshots/` folder:

* `coverage-summary.png`
* `cypress-test-pass.png`
* `integration-test-results.png`

You can view the coverage HTML report locally by opening:

```bash
coverage/lcov-report/index.html
```

---
## 🔍 Final Checklist

✅ All unit tests written using Jest and React Testing Library  
✅ All integration tests written for API and React/API interactions  
✅ End-to-end tests implemented using Cypress  
✅ Unit test coverage exceeds 70%  
✅ Global server error handler implemented and demonstrated  
✅ Client-side and Cypress debugging techniques used and documented  
✅ `coverage` reports generated and included as screenshots  
✅ README includes clear testing strategy and tooling  
✅ Project structure matches assignment expectations  
✅ Screenshots of test results included in `screenshots/` folder  
✅ `.gitignore` excludes unnecessary and large files  
✅ All tests pass with no errors  


## 📄 Example Commands

```bash
# Unit tests
pnpm run test:unit

# Integration tests
pnpm run test:integration

# End-to-end tests
pnpm run test:e2e
```

