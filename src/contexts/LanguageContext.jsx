import React, { createContext, useContext, useState, useEffect } from 'react'

// Create context
const LanguageContext = createContext()

// Language hook
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to English
    const savedLanguage = localStorage.getItem('language')
    return savedLanguage || 'en'
  })

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Translation function
  const t = (key) => {
    const translations = {
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.menu': 'Our Menu',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Contact',
        
        // Home Page
        'home.hero.title': 'Fresh Sugarcane Juice',
        'home.hero.subtitle': 'From the Heart of Zanzibar',
        'home.hero.description': 'Experience the authentic taste of pure, fresh sugarcane juice - naturally sweet, refreshing, and full of nutrients.',
        'home.hero.cta': 'Order Now',
        'home.hero.cta2': 'View Menu',
        
        'home.about.title': 'About Utamu wa Miwa',
        'home.about.description': 'We bring you the freshest sugarcane juice, pressed daily from locally grown sugarcane. Our traditional methods ensure maximum freshness and natural sweetness.',
        'home.about.cta': 'Learn More',
        
        'home.stats.customers': 'Happy Customers',
        'home.stats.flavors': 'Unique Flavors',
        'home.stats.years': 'Years of Excellence',
        'home.stats.daily': 'Fresh Daily',
        
        'home.menu.title': 'Our Menu',
        'home.menu.subtitle': 'Featured Flavors',
        'home.menu.description': 'All juices freshly pressed on demand — choose your flavor, enjoy the freshness.',
        
        // Products
        'product.classic': 'Classic Sugarcane Juice',
        'product.ginger': 'Ginger Sugarcane Blend',
        'product.lemon': 'Lemon Sugarcane Twist',
        'product.mint': 'Mint Sugarcane Twist',
        'product.passion': 'Passion Sugarcane Twist',
        'product.cucumber': 'Cucumber Sugarcane Twist',
        
        'product.classic.desc': 'Pure, refreshing sugarcane juice the way nature intended.',
        'product.ginger.desc': 'Spicy ginger meets sweet sugarcane for an invigorating blend.',
        'product.lemon.desc': 'Zesty lemon adds a refreshing citrus twist to classic sugarcane.',
        'product.mint.desc': 'Cool mint creates a perfectly refreshing and soothing drink.',
        'product.passion.desc': 'Tropical passion fruit adds exotic sweetness to our fresh juice.',
        'product.cucumber.desc': 'Crisp cucumber provides extra hydration and freshness.',
        
        'product.badge.new': 'New',
        'product.badge.popular': 'Popular',
        'product.badge.seasonal': 'Seasonal',
        
        // Gallery
        'gallery.title': 'Gallery',
        'gallery.subtitle': 'Our Fresh Juices',
        'gallery.description': 'See our fresh, delicious sugarcane juices in all their natural glory.',
        'gallery.tag.classic': 'Classic',
        'gallery.tag.blended': 'Blended',
        'gallery.featured': 'Featured',
        
        // Menu Page
        'menu.title': 'Our Menu',
        'menu.subtitle': 'Fresh Juices',
        'menu.description': 'All our juices are freshly pressed to order using the finest locally grown sugarcane.',
        'menu.all': 'All',
        'menu.classic': 'Classic',
        'menu.blended': 'Blended',
        'menu.tropical': 'Tropical',
        
        // Footer
        'footer.brand': 'Utamu wa Miwa',
        'footer.tagline': 'Fresh Sugarcane Juice',
        'footer.description': 'Pure, fresh, and natural sugarcane juice from the heart of Zanzibar. Experience the authentic taste of miwa every sip.',
        
        'footer.quickLinks': 'Quick Links',
        'footer.products': 'Our Products',
        'footer.contact': 'Contact Us',
        
        'footer.address': 'Stone Town, Zanzibar, Tanzania',
        'footer.phone': '+255 718 622 621',
        'footer.whatsapp': 'Chat on WhatsApp',
        
        'footer.copyright': '© {year} Utamu wa Miwa. All rights reserved.',
        'footer.made': 'Made with 💚 in Zanzibar, Tanzania',
        
        // Common
        'common.order': 'Order Now',
        'common.learnMore': 'Learn More',
        'common.viewMenu': 'View Menu',
        'common.contact': 'Contact',
        'common.loading': 'Loading...',
        'common.error': 'Something went wrong',
        'common.retry': 'Retry'
      },
      
      sw: {
        // Navigation
        'nav.home': 'Nyumbani',
        'nav.about': 'Kuhusu Sisi',
        'nav.menu': 'Menyu Yetu',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Wasiliana',
        
        // Home Page
        'home.hero.title': 'Maji ya Miwa Freshi',
        'home.hero.subtitle': 'Kutoka Mwanzo wa Zanzibar',
        'home.hero.description': 'Pata ladha halisi ya maji ya miwa freshi, ya kiasili, tamu na yenye virutubisho vingi.',
        'home.hero.cta': 'Agiza Sasa',
        'home.hero.cta2': 'Ona Menyu',
        
        'home.about.title': 'Kuhusu Utamu wa Miwa',
        'home.about.description': 'Tunakuletea maji ya miwa freshi zaidi, yanayosukuliwa kila siku kutoka kwa miwa inayolimwa eneo hili. Njia zetu za kiasili zinahakikisha freshi na utamu wa kiasili.',
        'home.about.cta': 'Jifunze Zaidi',
        
        'home.stats.customers': 'Wateja Wenye Furaha',
        'home.stats.flavors': 'Flava za Kipekee',
        'home.stats.years': 'Miaka ya Ufanisi',
        'home.stats.daily': 'Freshi Kila Siku',
        
        'home.menu.title': 'Menyu Yetu',
        'home.menu.subtitle': 'Flava Zilizochaguliwa',
        'home.menu.description': 'Maji yote freshi yanayosukuliwa kwa agizo — chagua flava yako, ufurahie freshi.',
        
        // Products
        'product.classic': 'Maji ya Miwa ya Kiasili',
        'product.ginger': 'Mchanganyiko wa Miwa na Tangawizi',
        'product.lemon': 'Mkanganyiko wa Miwa na Ndimu',
        'product.mint': 'Mchanganyiko wa Miwa na Mint',
        'product.passion': 'Mchanganyiko wa Miwa na Matunda ya Passion',
        'product.cucumber': 'Mchanganyiko wa Miwa na Tangweni',
        
        'product.classic.desc': 'Maji ya miwa freshi na safi kama mungu alivyo takasifu.',
        'product.ginger.desc': 'Tangawizi kali inakutana na miwa tamu kwa mchanganyiko wa kusisimua.',
        'product.lemon.desc': 'Ndimu tamu zinaongeza mkanganyiko wa matunda freshi kwa miwa ya kiasili.',
        'product.mint.desc': 'Mint baridi inaunda kinywaji cha kusaidisha na kupumua.',
        'product.passion.desc': 'Matunda ya passion ya tropiki hutoa utamu wa kipekee kwa maji freshi yetu.',
        'product.cucumber.desc': 'Tangweni crsip hutoa maji ya ziada na freshi.',
        
        'product.badge.new': 'Mpya',
        'product.badge.popular': ' maarufu',
        'product.badge.seasonal': 'Msimu',
        
        // Gallery
        'gallery.title': 'Gallery',
        'gallery.subtitle': 'Maji Freshi Yetu',
        'gallery.description': 'Ona maji freshi na tamu ya miwa katika utukufu wao wa kiasili.',
        'gallery.tag.classic': 'Kiasili',
        'gallery.tag.blended': 'Imechanganywa',
        'gallery.featured': 'Imechaguliwa',
        
        // Menu Page
        'menu.title': 'Menyu Yetu',
        'menu.subtitle': 'Maji Freshi',
        'menu.description': 'Maji yetu yote freshi yanayosukuliwa kwa agizo kutumia miwa bora zaidi inayolimwa eneo hili.',
        'menu.all': 'Zote',
        'menu.classic': 'Kiasili',
        'menu.blended': 'Imechanganywa',
        'menu.tropical': 'Ya Tropiki',
        
        // Footer
        'footer.brand': 'Utamu wa Miwa',
        'footer.tagline': 'Maji ya Miwa Freshi',
        'footer.description': 'Maji ya miwa safi, freshi, na ya kiasili kutoka mwanzo wa Zanzibar. Pata ladha halisi ya miwa kila kijiko.',
        
        'footer.quickLinks': 'Viunga vya Haraka',
        'footer.products': 'Bidhaa Zetu',
        'footer.contact': 'Wasiliana Nasi',
        
        'footer.address': 'Stone Town, Zanzibar, Tanzania',
        'footer.phone': '+255 718 622 621',
        'footer.whatsapp': 'Zungumza kwenye WhatsApp',
        
        'footer.copyright': '© {year} Utamu wa Miwa. Haki zote zimehifadhiwa.',
        'footer.made': 'Imetengenezwa kwa 💚 huko Zanzibar, Tanzania',
        
        // Common
        'common.order': 'Agiza Sasa',
        'common.learnMore': 'Jifunze Zaidi',
        'common.viewMenu': 'Ona Menyu',
        'common.contact': 'Wasiliana',
        'common.loading': 'Inapakia...',
        'common.error': 'Kimekosewa',
        'common.retry': 'Jaribu Tena'
      },
      
      it: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'Chi Siamo',
        'nav.menu': 'Il Nostro Menu',
        'nav.gallery': 'Galleria',
        'nav.contact': 'Contatti',
        
        // Home Page
        'home.hero.title': 'Succo di Canna da Zucchero Fresco',
        'home.hero.subtitle': 'Dal Cuore di Zanzibar',
        'home.hero.description': 'Sperimenta il gusto autentico del puro succo di canna da zucchero fresco - naturalmente dolce, rinfrescante e pieno di nutrienti.',
        'home.hero.cta': 'Ordina Ora',
        'home.hero.cta2': 'Vedi Menu',
        
        'home.about.title': 'Informazioni su Utamu wa Miwa',
        'home.about.description': 'Ti portiamo il succo di canna da zucchero più fresco, spremuto giornalmente da canna da zucchero coltivata localmente. I nostri metodi tradizionali garantiscono massima freschezza e dolcezza naturale.',
        'home.about.cta': 'Scopri di Più',
        
        'home.stats.customers': 'Clienti Felici',
        'home.stats.flavors': 'Gusti Unici',
        'home.stats.years': 'Anni di Eccellenza',
        'home.stats.daily': 'Fresco Ogni Giorno',
        
        'home.menu.title': 'Il Nostro Menu',
        'home.menu.subtitle': 'Gusti in Evidenza',
        'home.menu.description': 'Tutti i succhi spremuti freschi su ordinazione — scegli il tuo gusto, goditi la freschezza.',
        
        // Products
        'product.classic': 'Succo di Canna da Zucchero Classico',
        'product.ginger': 'Mix di Canna da Zucchero e Zenzero',
        'product.lemon': 'Twist di Canna da Zucchero al Limone',
        'product.mint': 'Twist di Canna da Zucchero alla Menta',
        'product.passion': 'Twist di Canna da Zucchero alla Frutta della Passione',
        'product.cucumber': 'Twist di Canna da Zucchero al Cetriolo',
        
        'product.classic.desc': 'Puro succo di canna da zucchero rinfrescante come la natura lo ha inteso.',
        'product.ginger.desc': 'Lo zenzero piccante incontra la dolce canna da zucchero per un mix energizzante.',
        'product.lemon.desc': 'Il limone agrumato aggiunge un twist rinfrescante al classico succo di canna.',
        'product.mint.desc': 'La menta fresca crea una bevanda perfettamente rinfrescante e rilassante.',
        'product.passion.desc': 'La frutta della passione tropicale aggiunge dolcezza esotica al nostro succo fresco.',
        'product.cucumber.desc': 'Il cetriolo croccante fornisce idratazione e freschezza extra.',
        
        'product.badge.new': 'Nuovo',
        'product.badge.popular': 'Popolare',
        'product.badge.seasonal': 'Stagionale',
        
        // Gallery
        'gallery.title': 'Galleria',
        'gallery.subtitle': 'I Nostri Succhi Freschi',
        'gallery.description': 'Vedi i nostri succhi di canna da zucchero freschi e deliziosi in tutta la loro gloria naturale.',
        'gallery.tag.classic': 'Classico',
        'gallery.tag.blended': 'Mixato',
        'gallery.featured': 'In Evidenza',
        
        // Menu Page
        'menu.title': 'Il Nostro Menu',
        'menu.subtitle': 'Succhi Freschi',
        'menu.description': 'Tutti i nostri succhi sono spremuti freschi su ordinazione utilizzando la migliore canna da zucchero coltivata localmente.',
        'menu.all': 'Tutti',
        'menu.classic': 'Classico',
        'menu.blended': 'Mixato',
        'menu.tropical': 'Tropicale',
        
        // Footer
        'footer.brand': 'Utamu wa Miwa',
        'footer.tagline': 'Succo di Canna da Zucchero Fresco',
        'footer.description': 'Succo di canna da zucchero puro, fresco e naturale dal cuore di Zanzibar. Sperimenta il gusto autentico della miwa a ogni sorso.',
        
        'footer.quickLinks': 'Link Rapidi',
        'footer.products': 'I Nostri Prodotti',
        'footer.contact': 'Contattaci',
        
        'footer.address': 'Stone Town, Zanzibar, Tanzania',
        'footer.phone': '+255 718 622 621',
        'footer.whatsapp': 'Chatta su WhatsApp',
        
        'footer.copyright': '© {year} Utamu wa Miwa. Tutti i diritti riservati.',
        'footer.made': 'Fatto con 💚 a Zanzibar, Tanzania',
        
        // Common
        'common.order': 'Ordina Ora',
        'common.learnMore': 'Scopri di Più',
        'common.viewMenu': 'Vedi Menu',
        'common.contact': 'Contatti',
        'common.loading': 'Caricamento...',
        'common.error': 'Qualcosa è andato storto',
        'common.retry': 'Riprova'
      }
    }
    
    return translations[language]?.[key] || key
  }

  const value = {
    language,
    setLanguage,
    t,
    // Available languages
    languages: [
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
      { code: 'it', name: 'Italiano', flag: '🇮🇹' }
    ]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
