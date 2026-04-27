# Multilingual Development Workflow
## Utamu wa Miwa Website - 3-Language Implementation Process

### 🚀 Before Starting Any New Feature

#### **Step 1: Translation Planning**
```bash
1. Create a list of ALL text elements needed
2. Design translation key structure
3. Prepare translations for en/sw/it
4. Review with native speakers if possible
```

#### **Step 2: Key Structure Design**
Follow this pattern for all translation keys:
```
feature.category.item
```

Examples:
- `storeLocator.hero.title`
- `reviews.writeReview`
- `cart.addToCart`
- `product.ginger.desc`

### 📝 Implementation Process

#### **Phase 1: Add Translations First**
Always add translations BEFORE coding the feature:

```javascript
// In LanguageContext.jsx - Add in this order:

// 1. English (base language)
'en': {
  'newFeature.hero.title': 'Discover Our New Feature',
  'newFeature.hero.description': 'Experience something amazing',
  'newFeature.actionButton': 'Get Started'
},

// 2. Kiswahili
'sw': {
  'newFeature.hero.title': 'Gundua Huduma Mpya',
  'newFeature.hero.description': 'Pata uzoefu wa ajabu',
  'newFeature.actionButton': 'Anza Sasa'
},

// 3. Italian
'it': {
  'newFeature.hero.title': 'Scopri la Nostra Nuova Funzionalità',
  'newFeature.hero.description': 'Sperimenta qualcosa di incredibile',
  'newFeature.actionButton': 'Inizia Ora'
}
```

#### **Phase 2: Code Implementation**
Use the `t()` function for ALL text:

```javascript
// ✅ CORRECT - Multilingual
<h1>{t('newFeature.hero.title')}</h1>
<p>{t('newFeature.hero.description')}</p>
<button>{t('newFeature.actionButton')}</button>

// ❌ WRONG - Hardcoded
<h1>Discover Our New Feature</h1>
<p>Experience something amazing</p>
<button>Get Started</button>
```

#### **Phase 3: Testing Protocol**
Test in ALL three languages before deployment:

```bash
1. Test in English ✅
2. Test in Kiswahili ✅  
3. Test in Italian ✅
4. Check language switching ✅
5. Verify no missing translations ✅
```

### 🔍 Quality Assurance Checklist

#### **Pre-Deployment Checklist**
- [ ] All translations added to en/sw/it sections
- [ ] No hardcoded text anywhere in code
- [ ] Translation keys follow naming convention
- [ ] Feature works in all 3 languages
- [ ] Language switching works correctly
- [ ] UI adapts to different text lengths
- [ ] No console errors about missing translations

#### **Code Review Requirements**
Every code review must check:
- [ ] Multilingual implementation complete
- [ ] Translation keys properly structured
- [ ] No hardcoded text found
- [ ] All languages tested

### 🛠️ Development Tools

#### **Translation Validator**
Built-in validation system that runs in development:

```javascript
// Automatic validation in development mode
// Logs missing translations to console
// Shows completion status for each language
```

#### **Console Output Example**
```
🌍 Translation Validation
Total translation keys: 245
✅ EN: 245/245 keys
✅ SW: 245/245 keys  
✅ IT: 245/245 keys
✅ All translations complete!
```

### 📋 Feature Implementation Template

#### **Use this template for new features:**

```javascript
// 1. Plan translations
const TRANSLATION_PLAN = {
  'featureName.hero.title': '',
  'featureName.hero.description': '',
  'featureName.actionButton': '',
  'featureName.successMessage': ''
}

// 2. Add to LanguageContext (en/sw/it)
// 3. Implement component using t()
// 4. Test all languages
// 5. Deploy
```

### 🚨 Common Issues & Solutions

#### **Issue: Missing Translation**
```
Error: Translation key 'feature.missingKey' not found
```
**Solution**: Add the key to all three language sections

#### **Issue: Hardcoded Text**
**Solution**: Replace with `t('feature.key')` and add translations

#### **Issue: Layout Problems with Long Text**
**Solution**: Test with Italian (often longest text) and adjust CSS

### 📊 Translation Status Tracking

#### **Current Implementation Status**
- ✅ Navigation & Menus
- ✅ Shopping Cart & Checkout
- ✅ Product Information
- ✅ Store Locator
- ✅ Customer Reviews
- ✅ Contact Forms
- ✅ Error Messages
- ✅ Success Notifications

#### **Always Maintain 100% Coverage**
Every new feature must maintain 100% translation coverage across all languages.

### 🔄 Continuous Integration

#### **Automated Checks**
- Development mode: Automatic translation validation
- Pre-commit: Check for hardcoded text
- Pre-deployment: Full multilingual testing

#### **Manual Verification**
- Language switching test
- Content accuracy review
- Layout compatibility check

### 📞 Support & Resources

#### **Translation Help**
- Use simple, clear language
- Consider cultural context
- Test with native speakers when possible
- Keep translations consistent across features

#### **Technical Support**
- Use translation validator for debugging
- Check browser console for missing keys
- Follow naming conventions strictly

---

## 🎯 Golden Rules

1. **NEVER add hardcoded text** - Always use `t()` function
2. **ALWAYS add 3 languages** - English, Kiswahili, Italian
3. **TEST all languages** - Before deployment
4. **FOLLOW naming convention** - feature.category.item
5. **VALIDATE translations** - Use built-in validator

**Remember: If it's visible to users, it must be in all 3 languages!** 🌍

---

*This workflow ensures consistent multilingual implementation across the entire Utamu wa Miwa website.*
