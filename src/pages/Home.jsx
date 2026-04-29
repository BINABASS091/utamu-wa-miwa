import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, Droplet, Zap, Heart, Award, Leaf, Plus } from 'lucide-react'
import { WhatsAppIcon, SugarCaneIcon } from '../components/BrandIcons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useLanguage } from '../contexts/LanguageContext'
import { useCart } from '../contexts/CartContext'
import { formatPrice, getPriceCategories } from '../utils/currency'

const HERO_IMAGE = 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_900/v1777461351/Utamuwamua-01_4_llsohy.png'

// --- Featured products data ---
const featuredProducts = [
  {
    id: 1,
    nameKey: 'product.classic',
    descKey: 'product.classic.desc',
    badgeKey: 'product.badge.popular',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_14.59.57_ucaoku.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_14.59.57_ucaoku.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_14.59.57_ucaoku.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_14.59.57_ucaoku.jpg 1200w'
    ],
  },
  {
    id: 2,
    nameKey: 'product.ginger',
    descKey: 'product.ginger.desc',
    badgeKey: null,
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1773145848/ginger_mektzz.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1773145848/ginger_mektzz.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1773145848/ginger_mektzz.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1773145848/ginger_mektzz.jpg 1200w'
    ],
  },
  {
    id: 3,
    nameKey: 'product.lemon',
    descKey: 'product.lemon.desc',
    badgeKey: null,
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1773145586/lime_zv4xp8.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1773145586/lime_zv4xp8.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1773145586/lime_zv4xp8.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1773145586/lime_zv4xp8.jpg 1200w'
    ],
  },
  {
    id: 4,
    nameKey: 'product.mint',
    descKey: 'product.mint.desc',
    badgeKey: 'product.badge.new',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.05.27_zzhtpo.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.05.27_zzhtpo.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.05.27_zzhtpo.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.05.27_zzhtpo.jpg 1200w'
    ],
  },
  {
    id: 5,
    nameKey: 'product.passion',
    descKey: 'product.passion.desc',
    badgeKey: 'product.badge.new',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.09.57_wgb4jx.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.09.57_wgb4jx.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.09.57_wgb4jx.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.09.57_wgb4jx.jpg 1200w'
    ],
  },
  {
    id: 6,
    nameKey: 'product.cucumber',
    descKey: 'product.cucumber.desc',
    badgeKey: 'product.badge.seasonal',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.02.41_nu6slk.jpg',
    imageSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.02.41_nu6slk.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.02.41_nu6slk.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1777465010/WhatsApp_Image_2026-04-29_at_15.02.41_nu6slk.jpg 1200w'
    ],
  },
]


// --- Why Choose Us data ---
const features = [
  {
    icon: <Droplet size={28} />,
    titleKey: 'home.whyUs.fresh.title',
    descKey: 'home.whyUs.fresh.desc',
    color: 'bg-green-500',
  },
  {
    icon: <Leaf size={28} />,
    titleKey: 'home.whyUs.local.title',
    descKey: 'home.whyUs.local.desc',
    color: 'bg-emerald-500',
  },
  {
    icon: <Zap size={28} />,
    titleKey: 'home.whyUs.energy.title',
    descKey: 'home.whyUs.energy.desc',
    color: 'bg-yellow-500',
  },
  {
    icon: <Heart size={28} />,
    titleKey: 'home.whyUs.love.title',
    descKey: 'home.whyUs.love.desc',
    color: 'bg-red-500',
  },
]

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
}

export default function Home() {
  const { t, language } = useLanguage()
  const { addToCart } = useCart()
  const [currentSlide, setCurrentSlide] = useState(0)
  const priceCategories = getPriceCategories()

  return (
    <div className="pt-16 overflow-x-hidden">

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-950 via-green-900 to-green-800 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-400/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left â€” Text */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold rounded-full uppercase tracking-widest mb-6">
                <Leaf size={12} /> Pure &amp; Natural · Zanzibar
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white leading-[1.1] mb-6">
                {t('home.hero.title')}
              </h1>

              <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
                {t('home.hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link
                  to="/menu"
                  className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold rounded-full transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center gap-2 text-base"
                >
                  {t('home.hero.cta2')} <ArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/255718622621?text=Hello!%20I%20would%20like%20to%20order%20sugarcane%20juice."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 border border-white/30 text-white font-bold rounded-full transition-all duration-200 hover:bg-white/20 inline-flex items-center justify-center gap-2 text-base backdrop-blur-sm"
                >
                  <WhatsAppIcon className="w-5 h-5 text-green-400" /> Order on WhatsApp
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 justify-center lg:justify-start">
                {[
                  { value: '500+', label: 'Happy Customers' },
                  { value: '5', label: 'Juice Flavors' },
                  { value: '100%', label: 'Natural' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl font-extrabold text-yellow-400 font-heading">{s.value}</p>
                    <p className="text-xs text-green-300 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right â€” Image */}
            <div className="relative flex justify-center order-1 lg:order-2">
              {/* Decorative ring */}
              <div className="absolute inset-0 m-auto w-[340px] h-[340px] lg:w-[440px] lg:h-[440px] rounded-full border-2 border-yellow-400/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-0 m-auto w-[280px] h-[280px] lg:w-[370px] lg:h-[370px] rounded-full border border-green-400/20" />

              {/* Photo */}
              <div className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src={HERO_IMAGE}
                  alt="Fresh sugarcane juice"
                  fetchpriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 lg:-left-4 bg-white dark:bg-gray-900 rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3 z-20">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />)}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Zanzibar's Finest</p>
                  <p className="text-xs text-gray-500">Loved by 500+ customers</p>
                </div>
              </div>

              {/* Top badge */}
              <div className="absolute top-4 right-4 lg:-right-4 bg-yellow-400 rounded-2xl px-4 py-2 shadow-xl z-20">
                <p className="text-xs font-extrabold text-gray-900 flex items-center gap-1"><Leaf size={12} /> 100% Natural</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-white dark:fill-gray-900">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-green-600 dark:text-green-400 font-bold text-sm uppercase tracking-widest">{t('home.whyUs.title')}</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              {t('home.whyUs.subtitle')}
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div
                key={f.titleKey}
                className="group relative bg-gray-50 dark:bg-gray-800 rounded-3xl p-7 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-green-600/0 group-hover:from-green-600/5 group-hover:to-transparent transition-all duration-300 rounded-3xl" />
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="font-bold font-heading text-gray-900 dark:text-white text-lg mb-2">{t(f.titleKey)}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-0 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-green-800 to-green-900 shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400 rounded-full -translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 text-center lg:text-left">
                <span className="text-yellow-400 font-bold text-sm uppercase tracking-widest">{t('about.hero.subtitle')}</span>
                <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-white mt-3 mb-6 leading-tight">
                  {t('about.title')}
                </h2>
                <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
                  {t('about.description')}
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  {t('home.about.cta')} <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 max-w-xs w-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-40 lg:h-40 rounded-full shadow-md mx-auto mb-4 flex items-center justify-center">
                    <img
                      src="https://res.cloudinary.com/diyy8h0d9/image/upload/v1777461351/Utamuwamua-01_4_llsohy.png"
                      alt="Utamu wa Miwa"
                      loading="lazy"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="text-white text-lg font-semibold font-heading italic lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
                    "Fresh from farm to glass"
                  </p>
                  <p className="text-green-300 text-sm mt-2">Every cup, every day, with love.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-green-600 dark:text-green-400 font-bold text-sm uppercase tracking-widest">{t('menu.title')}</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              {t('menu.subtitle')}
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mt-4" />
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
              {t('menu.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-80 xs:h-84 sm:h-88 md:h-92 lg:h-96 xl:h-[36rem] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={product.image}
                    srcSet={product.imageSet}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={t(product.nameKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {product.badgeKey && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-extrabold rounded-full shadow">
                      {t(product.badgeKey)}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-extrabold font-heading text-gray-900 dark:text-white text-lg mb-2">
                    {product.nameKey === 'product.classic' ? 'Classic Sugarcane' : 
                     product.nameKey === 'product.ginger' ? 'Ginger Sugarcane' : 
                     product.nameKey === 'product.lemon' ? 'Lemon Sugarcane' : 
                     product.nameKey === 'product.mint' ? 'Mint Sugarcane' : 
                     product.nameKey === 'product.passion' ? 'Passion' : 
                     product.nameKey === 'product.cucumber' ? 'Cucumber Sugarcane' : 
                     t(product.nameKey)}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-1">
                    {product.descKey === 'product.classic.desc' ? 'Pure, refreshing sugarcane the way nature intended.' : 
                     product.descKey === 'product.ginger.desc' ? 'Spicy ginger meets sweet sugarcane for an invigorating drink.' : 
                     product.descKey === 'product.lemon.desc' ? 'Zesty lemon adds a refreshing citrus to classic sugarcane.' : 
                     product.descKey === 'product.mint.desc' ? 'Cool mint creates a perfectly refreshing and soothing drink.' : 
                     product.descKey === 'product.passion.desc' ? 'Tropical passion with sugarcane juice' : 
                     product.descKey === 'product.cucumber.desc' ? 'Crisp cucumber provides extra hydration and freshness.' : 
                     t(product.descKey)}
                  </p>
                                  </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1 text-lg"
            >
              {t('home.viewFullMenu')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      
      {/* ===== CTA / WHATSAPP SECTION ===== */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-green-800 to-green-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 rounded-full -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-300 rounded-full translate-y-1/2 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-bold rounded-full uppercase tracking-widest mb-6">
            {t('common.order')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-white mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-green-200 text-lg mb-10 max-w-lg mx-auto">
            {t('home.cta.description')}
          </p>
          <a
            href="https://wa.me/255718622621?text=Hello!%20I%20would%20like%20to%20order%20some%20sugarcane%20juice."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold rounded-full text-lg transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
          >
            <WhatsAppIcon className="w-6 h-6" /> {t('home.cta.button')}
          </a>
        </div>
      </section>
    </div>
  )
}
