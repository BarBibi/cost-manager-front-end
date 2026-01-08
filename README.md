# Cost Manager Front-End Application

A modern, responsive web application for managing personal expenses, built with **React**, **Material UI (MUI)**, and **IndexedDB**. This application allows users to track costs, visualize spending patterns through interactive charts, and handle multi-currency conversions using real-time exchange rates.

## 🚀 Features

*   **Expense Management**: Add expenses with sum, currency (USD, ILS, GBP, EURO), category, and description.
*   **Local Storage:** Uses `IndexedDB` for robust, client-side data persistence.
*   **Detailed Reporting:** Tabular view of monthly expenses with dynamic currency toggling.
*   **Data Visualization:**
    -   **Pie Chart:** Distribution of expenses by category for a selected month.
    -   **Bar Chart:** Monthly expenditure trends across the entire year.
*   **Multi-Currency Support:** Supports USD, ILS, GBP, and EURO with automatic conversion based on exchange rates.
*   **Customizable API:** Users can define a custom URL for fetching currency exchange rates in the settings.

## 🛠️ Tech Stack

-   **Framework:** React (Vite)
-   **UI Library:** Material UI (MUI)
-   **Charts:** Chart.js & React-Chartjs-2
-   **Database:** IndexedDB (via custom `idb.js` wrapper)
-   **Date Handling:** Day.js & MUI X Date Pickers

## 📋 Technical Standards Compliance

As per the project specification:
-   **Single Responsibility Principle (SRP):** Data logic is strictly separated into `idb.js`.
-   **Naming Conventions:** Used `camelCase` for functions/variables and `PascalCase` for components.
-   **Strict Equality:** Used `===` and `!==` throughout the project.
-   **Immutability:** Preferred `const` over `let` for variable declarations.
-   **Architecture:** Each component is saved in a separate file matching its component name.

## ⚙️ Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd cost-manager-front-end
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the application:**
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 📂 Project Structure

```text
cost-manager-front-end/
├── public/              # Static assets
├── src/                 # Source files
│   ├── components/      # React UI Components
│   │   ├── AddCostForm.jsx
│   │   ├── BarChartView.jsx
│   │   ├── CurrencySettings.jsx
│   │   ├── PieChartView.jsx
│   │   └── ReportView.jsx
│   ├── App.jsx          # Main Application Orchestrator
│   ├── currency.js      # Currency utility functions
│   ├── idb.js           # IndexedDB Wrapper Library
│   ├── index.css        # Global Styles
│   └── main.jsx         # Application Entry Point
├── index.html           # HTML Entry Point
├── package.json         # Project dependencies and scripts
└── project_spec.md      # Technical Specification
```

## 🌐 Currency API
The application defaults to:
`https://currency-rates-api.onrender.com/rates.json`

Users can update this endpoint via the **Settings** tab. The API is expected to return a JSON object relative to 1 USD (e.g., `{"USD":1, "ILS":3.4}`).
