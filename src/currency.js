/* 
 * currency.js - Currency utility library for Cost Manager.
 * This library handles fetching real-time exchange rates from an external API.
 */

const DEFAULT_URL = 'https://currency-rates-api.onrender.com/rates.json';

/* 
 * fetchExchangeRates(customUrl)
 * Fetches currency exchange rates from the provided URL or the default fallback.
 * Returns a Promise resolving to a JSON object with rates relative to 1 USD.
 */
export const fetchExchangeRates = async (customUrl) => {
  const url = customUrl || DEFAULT_URL;
  try {
    const response = await fetch(url);
    
    /* Ensure the network response is successful */
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    /* 
     * Log the error for debugging purposes and return hardcoded 
     * fallback defaults to ensure the application remains functional.
     */
    console.error("Failed to fetch rates:", error);
    return { "USD": 1, "GBP": 0.6, "EURO": 0.7, "ILS": 3.4 };
  }
};
