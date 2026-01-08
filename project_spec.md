# Technical Specification: Cost Manager Front-End Application

## 1. Project Overview
The objective is to develop a Front-End web application for managing expenses (Cost Manager). The application will be built using **React** and **MUI** (Material UI), utilizing **IndexedDB** for local data storage.

### 1.1 UI and Currency Defaults
* **User Interface Language:** The UI must be entirely in **English**.
* **Primary Currency:** The main and default currency for the application is **USD**.

> **Crucial Rule:** The word **"should"** in this specification must be treated as **"must"**. Every requirement labeled with "should" is a mandatory command for implementation.

---

## 2. Core Tech Stack
* **Framework:** React.
* **UI Library:** MUI (Material UI).
* **Language:** JavaScript (ES6+), HTML5, CSS3.
* **Database:** IndexedDB.
* **Target Browser:** Google Chrome (Latest Version).

---

## 3. Data Storage & Library (`idb.js`)
A dedicated library named `idb.js` must be developed to wrap IndexedDB operations using **Promise objects**. This library must have two versions: one for React (ES modules) and one for Vanilla JS (for automated testing).

### 3.1 Required Functions (Vanilla Version)
When included via a `<script>` tag, the library must add the `idb` property to the global object.

* **`openCostsDB(databaseName, databaseVersion)`**:
    * Opens the database and returns a Promise resolving to the database object.
* **`addCost(cost)`**:
    * Accepts an object: `{ sum, currency, category, description, date (optional) }`.
    * **Logic:** If the user provides a specific date, use it. Otherwise, use the current system date as the default.
    * Returns a Promise resolving to the newly added object.
* **`getReport(year, month, currency)`**:
    * Retrieves all costs for the specified month/year.
    * Converts all amounts to the requested currency.
    * Returns a Promise resolving to a report object (including an array of costs and the total sum).

---

## 4. Features & Functionality

### 4.1 Cost Management & User Input
* **Adding Costs:** Users can specify sum, currency (USD, ILS, GBP, EURO), category, and description.
* **Date Entry:** The UI must provide a date picker or input allowing the user to select a specific date. If the user does not select a date, the current system date must be used automatically.
* **Data Integrity:** Every entry must include the currency in which it was originally saved in the IndexedDB.

### 4.2 Visualization & Reporting
* **Detailed Report:** A tabular view of costs for a specific month and year, displayed in a currency of the user's choice.
* **Pie Chart:** Displays the distribution of total costs by category for a selected month and year.
* **Bar Chart:** Displays the total costs for each of the 12 months in a selected year.
* **Dynamic Conversion:** Both charts and reports must allow the user to toggle between currencies, with values updating based on exchange rates.

### 4.3 Currency Exchange API
* The application must fetch exchange rates using the **Fetch API**.
* **Default Exchange Rates URL:** If no custom URL is provided in the settings, the app must automatically use:
  `https://currency-rates-api.onrender.com/rates.json`
* **Settings Screen:** Users must be able to provide an alternative URL for exchange rates.
* **JSON Format:** The API response will follow this structure: `{"USD":1, "GBP":0.6, "EURO":0.7, "ILS":3.4}` (Rates relative to 1 USD).

---

## 5. Coding Standards (Mandatory)

### 5.1 Documentation & Comments
* **Style:** Use C/C++ style comments (`//` or `/* */`).

### 5.2 Naming & Syntax
* **Functions & Variables:** Must use `camelCase`.
* **React Components & Classes:** Must use `PascalCase`.
* **Equality:** Always use strict equality (`===`, `!==`).
* **Variables:** Prefer `const` over `let`. Use `let` only when variable reassignment is necessary.

### 5.3 Architecture
* **Single Responsibility Principle (SRP):** The `idb.js` library is responsible for data persistence and retrieval.
* **Component Structure:** Each React component must be saved in a separate file named identically to the component name.
