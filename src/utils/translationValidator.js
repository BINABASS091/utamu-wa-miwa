// Translation Validation Utility
// Ensures all translations are complete across all languages

const SUPPORTED_LANGUAGES = ['en', 'sw', 'it']

/**
 * Validates that all translation keys exist in all languages
 * @param {Object} translations - The translations object from LanguageContext
 * @returns {Object} - Validation results with missing translations
 */
export const validateTranslations = (translations) => {
  const results = {
    isValid: true,
    missingKeys: {},
    totalKeys: 0,
    languageCounts: {}
  }

  // Get all unique translation keys from English (base language)
  const englishKeys = Object.keys(translations.en || {})
  results.totalKeys = englishKeys.length

  // Initialize language counts
  SUPPORTED_LANGUAGES.forEach(lang => {
    results.languageCounts[lang] = 0
  })

  // Check each language for missing keys
  SUPPORTED_LANGUAGES.forEach(lang => {
    const langTranslations = translations[lang] || {}
    results.languageCounts[lang] = Object.keys(langTranslations).length
    
    const missingKeys = englishKeys.filter(key => !langTranslations.hasOwnProperty(key))
    
    if (missingKeys.length > 0) {
      results.isValid = false
      results.missingKeys[lang] = missingKeys
    }
  })

  return results
}

/**
 * Gets a list of all translation keys that need to be added
 * @param {Object} translations - The translations object
 * @returns {Object} - Keys missing per language
 */
export const getMissingTranslations = (translations) => {
  const missing = {}
  const englishKeys = Object.keys(translations.en || {})

  SUPPORTED_LANGUAGES.forEach(lang => {
    if (lang === 'en') return // English is base language
    
    const langTranslations = translations[lang] || {}
    const missingKeys = englishKeys.filter(key => !langTranslations.hasOwnProperty(key))
    
    if (missingKeys.length > 0) {
      missing[lang] = missingKeys
    }
  })

  return missing
}

/**
 * Generates a translation template for missing keys
 * @param {Array} missingKeys - Array of missing translation keys
 * @param {string} targetLanguage - Target language code
 * @returns {Object} - Template object with placeholder translations
 */
export const generateTranslationTemplate = (missingKeys, targetLanguage) => {
  const template = {}
  
  missingKeys.forEach(key => {
    template[key] = `[TRANSLATE: ${key}]`
  })

  return template
}

/**
 * Validates a specific feature's translations
 * @param {Object} translations - The translations object
 * @param {string} featurePrefix - Feature key prefix (e.g., 'storeLocator')
 * @returns {Object} - Validation results for the specific feature
 */
export const validateFeatureTranslations = (translations, featurePrefix) => {
  const results = {
    isValid: true,
    missingKeys: {},
    featureKeys: []
  }

  // Get all keys for this feature
  const englishKeys = Object.keys(translations.en || {})
    .filter(key => key.startsWith(featurePrefix))
  
  results.featureKeys = englishKeys

  // Check each language for missing feature keys
  SUPPORTED_LANGUAGES.forEach(lang => {
    if (lang === 'en') return
    
    const langTranslations = translations[lang] || {}
    const missingKeys = englishKeys.filter(key => !langTranslations.hasOwnProperty(key))
    
    if (missingKeys.length > 0) {
      results.isValid = false
      results.missingKeys[lang] = missingKeys
    }
  })

  return results
}

/**
 * Console logging for development validation
 * Call this in development to check translation completeness
 */
export const logTranslationValidation = (translations) => {
  const validation = validateTranslations(translations)
  
  console.group('🌍 Translation Validation')
  console.log(`Total translation keys: ${validation.totalKeys}`)
  
  Object.entries(validation.languageCounts).forEach(([lang, count]) => {
    const status = count === validation.totalKeys ? '✅' : '❌'
    console.log(`${status} ${lang.toUpperCase()}: ${count}/${validation.totalKeys} keys`)
  })
  
  if (!validation.isValid) {
    console.group('❌ Missing Translations')
    Object.entries(validation.missingKeys).forEach(([lang, keys]) => {
      console.log(`${lang.toUpperCase()}: ${keys.length} missing`)
      console.log(keys)
    })
    console.groupEnd()
  } else {
    console.log('✅ All translations complete!')
  }
  
  console.groupEnd()
  
  return validation
}

/**
 * Development helper to check if a feature is multilingual-ready
 * @param {string} featurePrefix - Feature key prefix to check
 */
export const checkFeatureMultilingual = (featurePrefix) => {
  // This would be called during development
  console.log(`🔍 Checking multilingual support for: ${featurePrefix}`)
  // In a real implementation, this would validate the specific feature
}

export default {
  validateTranslations,
  getMissingTranslations,
  generateTranslationTemplate,
  validateFeatureTranslations,
  logTranslationValidation,
  checkFeatureMultilingual,
  SUPPORTED_LANGUAGES
}
