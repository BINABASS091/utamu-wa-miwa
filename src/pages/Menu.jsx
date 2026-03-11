import { useState } from 'react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { Filter } from 'lucide-react'

const categories = ['All', 'Classic', 'Blended', 'Add-ons']

const products = [
  {
    id: 1,
    name: 'Classic Sugarcane Juice',
    category: 'Classic',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1773143147/sugarcane_hvtocf.jpg',
    desc: 'Pure freshly pressed sugarcane. No mix, no additives — just pure sweetness.',

    sizes: ['Small', 'Medium', 'Large'],
    gradient: 'from-green-400 to-green-600',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Ginger Sugarcane Blend',
    category: 'Blended',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1773145489/ginger_el03jm.jpg',
    desc: 'Fresh ginger root blended with sugarcane. A spicy, warming, refreshing combo.',
    sizes: ['Medium', 'Large'],
    gradient: 'from-orange-400 to-yellow-500',
    badge: 'Popular',
  },
  {
    id: 3,
    name: 'Lime Sugarcane Twist',
    category: 'Blended',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1773145847/lime_nozlcu.jpg',
    desc: 'Fresh squeezed lime juice mixed with sweet sugarcane for a sharp citrus kick.',
    sizes: ['Small', 'Medium', 'Large'],
    gradient: 'from-lime-400 to-green-400',
    badge: null,
  },
  {
    id: 4,
    name: 'Extra Ice',
    category: 'Add-ons',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1773145841/ice_il0wab.jpg',
    desc: 'Extra ice cubes added to your juice for maximum cooling.',

    sizes: [],
    gradient: 'from-blue-300 to-cyan-400',
    badge: null,
  },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">Our Menu</span>
          <h1 className="text-5xl font-extrabold font-heading text-white mt-3 mb-4">
            Fresh Juice Menu
          </h1>
          <p className="text-green-200 text-lg">
            All juices freshly pressed on demand — choose your flavor, enjoy the freshness.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white dark:bg-gray-900 sticky top-16 z-40 border-b border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3 overflow-x-auto">
          <Filter className="text-green-600 dark:text-green-400 text-xl flex-shrink-0" size={20} />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold flex-shrink-0 transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group flex flex-col"
              >
                {/* Product image */}
                <div className="relative h-40 flex-shrink-0 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 text-green-700 text-xs font-bold rounded-full shadow">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold font-heading text-gray-900 dark:text-white text-base leading-snug">
                      {product.name}
                    </h3>
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full flex-shrink-0">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed flex-1">
                    {product.desc}
                  </p>
                  {product.sizes.length > 0 && (
                    <div className="flex gap-1 mb-3 flex-wrap">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-end mt-auto">
                    <a
                      href={`https://wa.me/255700000000?text=Hello!%20I%20would%20like%20to%20order%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-full transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" /> Order
                    </a>
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
            📞 <strong>Custom orders welcome!</strong> Want a special blend? Contact us on WhatsApp
            and we'll make your perfect juice. Prices may vary by size.
          </p>
          <a
            href="https://wa.me/255700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" /> Custom Order
          </a>
        </div>
      </section>
    </div>
  )
}
