const EXCHANGE_RATES = {
  TZS: 1,
  USD: 0.00041,
  EUR: 0.00038
}

const CURRENCY_SYMBOLS = {
  TZS: 'TZS',
  USD: '$',
  EUR: '\u20ac'
}

const LANGUAGE_CURRENCY = {
  en: 'USD',
  sw: 'TZS',
  it: 'EUR'
}

const PRICE_CATEGORIES = {
  small: 500
}

export const convertCurrency = (priceInTZS, currency) => {
  const rate = EXCHANGE_RATES[currency] || 1
  return priceInTZS * rate
}

export const formatPrice = (priceInTZS, language) => {
  const currency = LANGUAGE_CURRENCY[language] || 'TZS'
  const convertedPrice = convertCurrency(priceInTZS, currency)
  const symbol = CURRENCY_SYMBOLS[currency]
  
  if (currency === 'TZS') {
    return `${symbol} ${convertedPrice.toLocaleString()}`
  } else if (currency === 'USD') {
    return `${symbol}${convertedPrice.toFixed(2)}`
  } else if (currency === 'EUR') {
    return `${symbol}${convertedPrice.toFixed(2).replace('.', ',')}`
  }
  
  return `${symbol} ${convertedPrice.toLocaleString()}`
}

export const getPriceInTZS = (category) => {
  return PRICE_CATEGORIES[category] || PRICE_CATEGORIES.small
}

export const getPriceCategories = () => {
  return PRICE_CATEGORIES
}

export const getCurrencyInfo = (language) => {
  const currency = LANGUAGE_CURRENCY[language] || 'TZS'
  return {
    code: currency,
    symbol: CURRENCY_SYMBOLS[currency],
    rate: EXCHANGE_RATES[currency]
  }
}

export const formatPriceForWhatsApp = (priceInTZS) => {
  return `TZS ${priceInTZS.toLocaleString()}`
}
