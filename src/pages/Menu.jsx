import { useState } from 'react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { Filter, Plus, Star } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useCart } from '../contexts/CartContext'
import { formatPrice, getPriceCategories } from '../utils/currency'
import ProductReviews from '../components/ProductReviews'

const categoryKeys = ['menu.all', 'menu.classic', 'menu.blended', 'menu.tropical', 'menu.addons']

const menuItems = [
  {
    id: 1,
    nameKey: 'product.classic',
    categoryKey: 'menu.classic',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777466063/WhatsApp_Image_2026-04-29_at_15.33.59_tyls0q.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777466063/WhatsApp_Image_2026-04-29_at_15.33.59_tyls0q.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777466063/WhatsApp_Image_2026-04-29_at_15.33.59_tyls0q.jpg 800w'
    ],
    descKey: 'product.classic.desc',
    sizes: ['Small', 'Medium', 'Large'],
    gradient: 'from-green-400 to-green-600',
    badgeKey: 'product.badge.popular',
  },
  {
    id: 2,
    nameKey: 'product.ginger',
    categoryKey: 'menu.blended',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_1_qqaq60.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_1_qqaq60.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_1_qqaq60.jpg 800w'
    ],
    descKey: 'product.ginger.desc',
    sizes: ['Small', 'Medium', 'Large'],
    gradient: 'from-orange-400 to-red-500',
    badgeKey: null,
  },
  {
    id: 3,
    nameKey: 'product.lemon',
    categoryKey: 'menu.blended',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123919/WhatsApp_Image_2026-04-25_at_16.28.46_2_kf7k2x.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777123919/WhatsApp_Image_2026-04-25_at_16.28.46_2_kf7k2x.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123919/WhatsApp_Image_2026-04-25_at_16.28.46_2_kf7k2x.jpg 800w'
    ],
    descKey: 'product.lemon.desc',
    sizes: ['Small', 'Medium', 'Large'],
    gradient: 'from-yellow-400 to-green-500',
    badgeKey: null,
  },
  {
    id: 4,
    nameKey: 'product.mint',
    categoryKey: 'menu.blended',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_1_rjpc2c.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_1_rjpc2c.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_1_rjpc2c.jpg 800w'
    ],
    descKey: 'product.mint.desc',
    sizes: ['Small', 'Medium', 'Large'],
    gradient: 'from-green-400 to-teal-500',
    badgeKey: 'product.badge.new',
  },
  {
    id: 5,
    nameKey: 'product.passion',
    categoryKey: 'menu.blended',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777466511/WhatsApp_Image_2026-04-29_at_15.38.59_obwrwo.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777466511/WhatsApp_Image_2026-04-29_at_15.38.59_obwrwo.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777466511/WhatsApp_Image_2026-04-29_at_15.38.59_obwrwo.jpg 800w'
    ],
    descKey: 'product.passion.desc',
    sizes: ['Small', 'Medium', 'Large'],
    gradient: 'from-purple-400 to-pink-500',
    badgeKey: 'product.badge.new',
  },
  {
    id: 6,
    nameKey: 'product.cucumber',
    categoryKey: 'menu.blended',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_eumhtz.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_eumhtz.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_eumhtz.jpg 800w'
    ],
    descKey: 'product.cucumber.desc',
    sizes: ['Small', 'Medium', 'Large'],
    gradient: 'from-green-400 to-emerald-500',
    badgeKey: 'product.badge.seasonal',
  },
]

export default function Menu() {
  const { t, language } = useLanguage()
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedSize, setSelectedSize] = useState({})
  const priceCategories = getPriceCategories()

  const filtered = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((p) => p.categoryKey === activeCategory)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">{t('menu.title')}</span>
          <h1 className="text-5xl font-extrabold font-heading text-white mt-3 mb-4">
            {t('menu.subtitle')}
          </h1>
          <p className="text-green-200 text-lg">
            {t('menu.description')}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white dark:bg-gray-900 sticky top-16 z-40 border-b border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 overflow-x-auto">
          <Filter className="text-green-600 dark:text-green-400 text-xl flex-shrink-0" size={20} />
          {categoryKeys.map((catKey) => {
            const catName = t(catKey)
            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catName)}
                className={`px-5 py-2 rounded-full text-sm font-semibold flex-shrink-0 transition-all duration-200 ${
                  activeCategory === catName
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700'
                }`}
              >
                {catName}
              </button>
            )
          })}
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group flex flex-col"
              >
                {/* Product image */}
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={product.image}
                    srcSet={product.imageSet}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    alt={t(product.nameKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.badgeKey && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 text-green-700 text-xs font-bold rounded-full shadow">
                      {t(product.badgeKey)}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold font-heading text-gray-900 dark:text-white text-base leading-snug">
                      {t(product.nameKey)}
                    </h3>
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full flex-shrink-0">
                      {t(product.categoryKey)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed flex-1">
                    {t(product.descKey)}
                  </p>
                  {/* Rating Display */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">
                      4.5 (12 reviews)
                    </span>
                    <a
                      href="/reviews"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      {t('reviews.writeReview')}
                    </a>
                  </div>
                  {product.sizes.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">{t('price.selectPrice')}:</p>
                      <div className="flex gap-1 flex-wrap">
                        <button
                          onClick={() => setSelectedSize(prev => ({ ...prev, [product.id]: 'small' }))}
                          className={`text-xs px-2 py-1 rounded-full transition-colors ${
                            selectedSize[product.id] === 'small'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {t('price.smallGlass')}
                        </button>
                        <button
                          onClick={() => setSelectedSize(prev => ({ ...prev, [product.id]: 'medium' }))}
                          className={`text-xs px-2 py-1 rounded-full transition-colors ${
                            selectedSize[product.id] === 'medium'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {t('price.mediumGlass')}
                        </button>
                        <button
                          onClick={() => setSelectedSize(prev => ({ ...prev, [product.id]: 'large' }))}
                          className={`text-xs px-2 py-1 rounded-full transition-colors ${
                            selectedSize[product.id] === 'large'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {t('price.largeBottle')}
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {t('price.from')} {formatPrice(priceCategories.small, language)}
                    </span>
                    <button
                      onClick={() => {
                        const size = selectedSize[product.id] || 'medium'
                        addToCart(product, 1, size)
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-full transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> {t('cart.addToCart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-12 text-lg">
              No items in this category.
            </p>
          )}
        </div>
      </section>

      {/* Note section */}
      <section className="py-12 bg-green-50 dark:bg-gray-900 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            📞 <strong>{t('menu.customOrders')}</strong> {t('menu.customOrdersDesc')}
            and we'll make your perfect juice. Prices may vary by size.
          </p>
          <a
            href="https://wa.me/255700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" /> {t('menu.customOrder')}
          </a>
        </div>
      </section>
    </div>
  )
}
