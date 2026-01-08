const DEFAULT_URL = 'https://currency-rates-api.onrender.com/rates.json';

export const fetchExchangeRates = async (customUrl) => {
  const url = customUrl || DEFAULT_URL;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch rates:", error);
    // Fallback defaults if API fails
    return { "USD": 1, "GBP": 0.6, "EURO": 0.7, "ILS": 3.4 };
  }
};
