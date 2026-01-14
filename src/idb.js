/* 
 * idb.js - IndexedDB wrapper library for Cost Manager.
 * This library handles data persistence and retrieval using Promise objects.
 */

const DB_NAME = 'CostManagerDB';
const DB_VERSION = 1;
const STORE_NAME = 'costs';

/* 
 * openCostsDB(databaseName, databaseVersion)
 * Opens the database and returns a Promise resolving to the database object.
 */
export const openCostsDB = (databaseName = DB_NAME, databaseVersion = DB_VERSION) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, databaseVersion);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/* 
 * addCost(cost)
 * Accepts an object: { sum, currency, category, description, date (optional) }.
 */
export const addCost = async (cost) => {
  const db = await openCostsDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    /* 
     * Logic: If user provides a specific date, use it.
     * Otherwise, use the current system date as default.
     */
    const costEntry = {
      ...cost,
      sum: parseFloat(cost.sum),
      date: cost.date || new Date().toISOString().split('T')[0]
    };

    const request = store.add(costEntry);
    request.onsuccess = () => {
      costEntry.id = request.result;
      resolve(costEntry);
    };
    request.onerror = () => reject(request.error);
  });
};

/* 
 * getReport(year, month, currency)
 * Retrieves costs for specific month/year and converts amounts based on exchange rates.
 */
export const getReport = async (year, month, currency, exchangeRates = { "USD": 1 }) => {
  const db = await openCostsDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const allCosts = request.result;
      const targetYear = parseInt(year);
      const targetMonth = parseInt(month);

      /* Filter costs by the specified year and month */
      const filteredCosts = allCosts.filter((cost) => {
        const d = new Date(cost.date);
        return d.getFullYear() === targetYear && (d.getMonth() + 1) === targetMonth;
      });

      /* Convert all amounts to the requested currency */
      let totalSum = 0;
      const costsWithConversion = filteredCosts.map((cost) => {
        /* Convert original amount to USD (base) then to target currency */
        const rateToUsd = exchangeRates[cost.currency] || 1;
        const amountInUsd = cost.sum / rateToUsd;
        const targetRate = exchangeRates[currency] || 1;
        const convertedSum = parseFloat((amountInUsd * targetRate).toFixed(2));
        
        totalSum += convertedSum;
        return { ...cost, convertedSum };
      });

      /* Returns a Promise resolving to a report object */
      resolve({ costs: costsWithConversion, totalSum: parseFloat(totalSum.toFixed(2)) });
    };

    request.onerror = () => reject(request.error);
  });
};
