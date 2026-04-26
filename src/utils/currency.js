// Currency conversion rates (base TZS)
const EXCHANGE_RATES = {
  TZS: 1,      // Tanzanian Shillings (base)
  USD: 0.00041, // 1 TZS = 0.00041 USD (approx 2440 TZS = 1 USD)
  EUR: 0.00038  // 1 TZS = 0.00038 EUR (approx 2630 TZS = 1 EUR)
}

// Currency symbols
const CURRENCY_SYMBOLS = {
  TZS: 'TZS',
  USD: '$',
  EUR: '€'
}

// Language to currency mapping
const LANGUAGE_CURRENCY = {
  en: 'USD',  // English -> USD
  sw: 'TZS',  // Kiswahili -> TZS
  it: 'EUR'   // Italian -> EUR
}

// Price categories in TZS
const PRICE_CATEGORIES = {
  small: 500,    // Small glass
  medium: 1000,  // Medium glass
  large: 4000    // Large bottle
}

/**
 * Convert price from TZS to target currency
 * @param {number} priceInTZS - Price in Tanzanian Shillings
 * @param {string} currency - Target currency code (USD, EUR, TZS)
 * @returns {number} - Converted price
 */
export const convertCurrency = (priceInTZS, currency) => {
  const rate = EXCHANGE_RATES[currency] || 1
  return priceInTZS * rate
}

/**
 * Format price with currency symbol and proper formatting
 * @param {number} priceInTZS - Price in Tanzanian Shillings
 * @param {string} language - Language code (en, sw, it)
 * @returns {string} - Formatted price string
 */
export const formatPrice = (priceInTZS, language) => {
  const currency = LANGUAGE_CURRENCY[language] || 'TZS'
  const convertedPrice = convertCurrency(priceInTZS, currency)
  const symbol = CURRENCY_SYMBOLS[currency]
  
  // Format based on currency
  if (currency === 'TZS') {
    return `${symbol} ${convertedPrice.toLocaleString()}`
  } else if (currency === 'USD') {
    return `${symbol}${convertedPrice.toFixed(2)}`
  } else if (currency === 'EUR') {
    return `${symbol}${convertedPrice.toFixed(2).replace('.', ',')}`
  }
  
  return `${symbol} ${convertedPrice.toLocaleString()}`
}

/**
 * Get price category in TZS
 * @param {string} category - Price category (small, medium, large)
 * @returns {number} - Price in TZS
 */
export const getPriceInTZS = (category) => {
  return PRICE_CATEGORIES[category] || PRICE_CATEGORIES.medium
}

/**
 * Get all available price categories
 * @returns {Object} - Price categories object
 */
export const getPriceCategories = () => {
  return PRICE_CATEGORIES
}

/**
 * Get currency info for a language
 * @param {string} language - Language code
 * @returns {Object} - Currency info (symbol, code, rate)
 */
export const getCurrencyInfo = (language) => {
  const currency = LANGUAGE_CURRENCY[language] || 'TZS'
  return {
    code: currency,
    symbol: CURRENCY_SYMBOLS[currency],
    rate: EXCHANGE_RATES[currency]
  }
}

/**
 * Format price for WhatsApp message (always in TZS for business use)
 * @param {number} priceInTZS - Price in Tanzanian Shillings
 * @returns {string} - Formatted price for WhatsApp
 */
export const formatPriceForWhatsApp = (priceInTZS) => {
  return `TZS ${priceInTZS.toLocaleString()}`
}
