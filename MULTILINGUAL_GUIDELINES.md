# Multilingual Implementation Guidelines
## Utamu wa Miwa Website - 3-Language Support Policy

### 🌍 Supported Languages
- **English (en)** - Primary international language
- **Italiano (it)** - For Italian tourists and visitors
- **Kiswahili (sw)** - Local Tanzanian language

### 📋 Mandatory Multilingual Implementation Rules

#### **RULE #1: No New Content Without Translation**
Every new text element, label, button, message, or content MUST be added in ALL THREE languages simultaneously.

#### **RULE #2: Translation Key Structure**
Follow consistent naming convention for translation keys:
```
feature.category.item
```
Examples:
- `storeLocator.hero.title`
- `reviews.writeReview`
- `cart.addToCart`

#### **RULE #3: Complete Translation Coverage**
For each new feature, ensure translations exist in:
1. ✅ English section (`en:`)
2. ✅ Italian section (`it:`)  
3. ✅ Kiswahili section (`sw:`)

### 🔧 Implementation Workflow

#### **Step 1: Plan Translations First**
Before coding any new feature:
1. List all text elements needed
2. Create translation keys for each
3. Prepare translations for all 3 languages

#### **Step 2: Add Translations to LanguageContext**
Always add translations in this order:
```javascript
// English (en)
'feature.newItem': 'English text',

// Kiswahili (sw) 
'feature.newItem': 'Tafsiri ya Kiswahili',

// Italian (it)
'feature.newItem': 'Testo italiano',
```

#### **Step 3: Use Translation Function**
Always use `t()` function for text display:
```javascript
// ❌ WRONG - Hardcoded text
<button>Add to Cart</button>

// ✅ RIGHT - Multilingual
<button>{t('cart.addToCart')}</button>
```

#### **Step 4: Test All Languages**
Before completing any feature:
1. Test in English ✅
2. Test in Kiswahili ✅  
3. Test in Italian ✅

### 📝 Translation Categories

#### **Navigation & UI Elements**
- Menu items, buttons, links
- Form labels and placeholders
- Error messages and notifications
- Tooltips and help text

#### **Content & Marketing**
- Page titles and descriptions
- Product information
- Feature descriptions
- Call-to-action text

#### **User Interactions**
- Form validation messages
- Success/error notifications
- Loading states
- Confirmation dialogs

#### **Business Information**
- Store details and addresses
- Contact information
- Operating hours
- Product descriptions

### 🎯 Quality Standards

#### **Translation Quality**
- **English**: Professional, clear marketing language
- **Italian**: Natural, tourist-friendly Italian
- **Kiswahili**: Authentic local Tanzanian Kiswahili

#### **Consistency Requirements**
- Same terminology across all pages
- Consistent tone and style per language
- Proper cultural adaptation (not just literal translation)

#### **Technical Standards**
- No hardcoded text anywhere in components
- All text must use `t()` function
- Translation keys must be descriptive and organized

### 📋 Implementation Checklist

For every new feature or change:

#### **Pre-Development Checklist**
- [ ] All text content identified
- [ ] Translation keys planned
- [ ] Translations prepared for all 3 languages
- [ ] Key structure follows naming convention

#### **Development Checklist**  
- [ ] Translations added to LanguageContext (en, sw, it)
- [ ] All text uses `t()` function
- [ ] No hardcoded text in components
- [ ] Language switching works correctly

#### **Testing Checklist**
- [ ] Feature works in English
- [ ] Feature works in Kiswahili
- [ ] Feature works in Italian
- [ ] All translations display correctly
- [ ] No missing translation keys
- [ ] Layout works with different text lengths

### 🚨 Common Mistakes to Avoid

#### **❌ Don't Do This**
```javascript
// Hardcoded text
const message = "Order placed successfully!"

// Missing translations
// Only added English, forgot sw/it

// Inconsistent key naming
'cart.add' vs 'addToCartButton'
```

#### **✅ Do This Instead**
```javascript
// Multilingual text
const message = t('cart.orderSuccess')

// Complete translations
'en': { 'cart.orderSuccess': 'Order placed successfully!' }
'sw': { 'cart.orderSuccess': 'Oda imewekwa kwa mafanikio!' }  
'it': { 'cart.orderSuccess': 'Ordine effettuato con successo!' }

// Consistent key naming
'cart.addToCart', 'cart.orderSuccess', 'cart.clearCart'
```

### 🔄 Review Process

#### **Before Deployment**
1. **Translation Audit**: Check LanguageContext for completeness
2. **Language Testing**: Test feature in all 3 languages
3. **Content Review**: Verify translation quality and accuracy
4. **Layout Testing**: Ensure UI works with different text lengths

#### **Code Review Checklist**
- [ ] No hardcoded text found
- [ ] All translation keys follow naming convention
- [ ] Complete translation coverage (en, sw, it)
- [ ] Proper use of `t()` function throughout

### 📞 Translation Resources

#### **For Reference**
- **English**: Marketing standard, clear and professional
- **Italian**: Tourist-friendly, simple and direct
- **Kiswahili**: Local Tanzanian dialect, natural phrasing

#### **When in Doubt**
1. Use simple, clear language
2. Avoid complex idioms that don't translate well
3. Consider cultural context for each language
4. Test with native speakers if possible

### 🎉 Success Metrics

A feature is **complete** when:
- ✅ Works identically in all 3 languages
- ✅ All translations are accurate and natural
- ✅ No missing or broken translations
- ✅ UI adapts properly to different text lengths
- ✅ Language switching works seamlessly

---

**Remember: Every new change = 3 languages. Always. No exceptions.** 🌍

*This document ensures consistent multilingual implementation across the entire Utamu wa Miwa website.*
