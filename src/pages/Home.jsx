import { Link } from 'react-router-dom'
import { Star, ArrowRight, Droplet, Zap, Heart } from 'lucide-react'
import { WhatsAppIcon, SugarCaneIcon } from '../components/BrandIcons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// --- Featured products data ---
const featuredProducts = [
  {
    id: 1,
    name: 'Classic Sugarcane Juice',
    desc: 'Pure, freshly pressed sugarcane — sweet, cool, and natural.',
    price: 'TZS 2,000',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/v1773143147/sugarcane_hvtocf.jpg',
  },
  {
    id: 2,
    name: 'Ginger Sugarcane Blend',
    desc: 'A spicy kick of fresh ginger with sweet sugarcane juice.',
    price: 'TZS 2,500',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/v1773145489/ginger_el03jm.jpg',
  },
  {
    id: 3,
    name: 'Lime Sugarcane Twist',
    desc: 'Fresh squeezed lime juice mixed with sweet sugarcane for a sharp citrus kick.',
    price: 'TZS 2,500',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/v1773145847/lime_nozlcu.jpg',
  },
]

// --- Testimonials data ---
const testimonials = [
  {
    id: 1,
    name: 'Amina Hassan',
    location: 'Stone Town, Zanzibar',
    text: 'Best sugarcane juice I have ever tasted! So fresh and natural. I come here every morning!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mohamed Ali',
    location: 'Dar es Salaam',
    text: 'The ginger blend is absolutely amazing. Perfect balance of sweet and spicy. Highly recommend!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Fatuma Juma',
    location: 'Mombasa, Kenya',
    text: 'Visited Zanzibar and this was a highlight. Authentic taste, clean preparation, love it!',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Mwangi',
    location: 'Nairobi, Kenya',
    text: 'Refreshing and very affordable. The mint cooler is my favorite — so cooling in the heat!',
    rating: 5,
  },
]

// --- Why Choose Us data ---
const features = [
  {
    icon: <Droplet className="text-green-600" size={32} />,
    title: '100% Fresh',
    desc: 'Pressed fresh in front of you — no preservatives, no artificial flavors.',
  },
  {
    icon: <SugarCaneIcon className="text-green-600 w-8 h-8" />,
    title: 'Local Sugarcane',
    desc: 'Sourced directly from local Zanzibari farmers for maximum freshness.',
  },
  {
    icon: <Zap className="text-green-600" size={32} />,
    title: 'Natural Energy',
    desc: 'The perfect natural energy boost — pure cane sugar, no caffeine.',
  },
  {
    icon: <Heart className="text-green-600" size={32} />,
    title: 'Made with Love',
    desc: 'Every cup prepared with passion and care by our local team.',
  },
]

// Testimonial slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
}

export default function Home() {
  return (
    <div className="pt-16">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 dark:bg-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-bounce-slow" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-200 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-bounce-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left animate-slide-up">
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
              🌿 Pure & Natural – Zanzibar
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold font-heading leading-tight mb-6 text-gray-900 dark:text-white">
              Fresh{' '}
              <span className="text-green-600 dark:text-green-400">Sugarcane</span>
              <br />
              Juice
              <span className="text-yellow-500"> 🥤</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
              <strong className="text-green-700 dark:text-green-400">Utamu wa Miwa</strong> —
              experience the authentic taste of freshly pressed Zanzibari sugarcane juice.
              Pure, natural, and bursting with energy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/menu"
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center gap-2 text-lg"
              >
                Order Now <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/255700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-green-600 text-green-700 dark:text-green-400 font-bold rounded-full transition-all duration-200 hover:bg-green-50 dark:hover:bg-gray-700 inline-flex items-center justify-center gap-2 text-lg"
              >
                <WhatsAppIcon className="text-green-500 w-5 h-5" /> Order on WhatsApp
              </a>
            </div>
            {/* Stats */}
            <div className="flex gap-8 mt-10 justify-center lg:justify-start">
              {[
                { value: '500+', label: 'Happy Customers' },
                { value: '5', label: 'Juice Flavors' },
                { value: '100%', label: 'Natural' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-extrabold text-green-600 dark:text-green-400 font-heading">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="flex-1 flex justify-center animate-fade-in">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-20 animate-bounce-slow" />
              <div className="absolute inset-8 bg-gradient-to-br from-yellow-300 to-green-400 rounded-full opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-9xl">🥤</span>
                  <div className="mt-4 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400" size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">
                    Zanzibar's Finest
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-widest">Why Us?</span>
            <h2 className="text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              What Makes Us Special
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-green-50 dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="font-bold font-heading text-gray-900 dark:text-white text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-green-200 font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="text-4xl font-extrabold font-heading text-white mt-3 mb-6 leading-tight">
                Born from the Heart<br />of Zanzibar
              </h2>
              <p className="text-green-100 text-lg leading-relaxed mb-8">
                Utamu wa Miwa started as a small street vendor in Stone Town, Zanzibar. With fresh
                sugarcane sourced directly from local farms, we press every cup by hand — delivering
                the pure, natural taste that Zanzibaris have loved for generations.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-yellow-50 transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              >
                Read Our Story <ArrowRight size={18} />
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/30">
                <img
                  src="https://res.cloudinary.com/diyy8h0d9/image/upload/v1773143743/utamu_wa_miwa_modern_mlno2y.png"
                  alt="Utamu wa Miwa"
                  className="w-28 h-auto object-contain mx-auto mb-4 drop-shadow-lg"
                />
                <p className="text-white text-xl font-semibold font-heading">
                  "Fresh from farm to glass"
                </p>
                <p className="text-green-200 text-sm mt-2">
                  Every cup, every day, with love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-widest">Our Menu</span>
            <h2 className="text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              Featured Flavors
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              All juices freshly pressed on demand — choose your flavor, enjoy the freshness.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold font-heading text-gray-900 dark:text-white text-base mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{product.desc}</p>
                  <div className="flex justify-end">
                    <a
                      href="https://wa.me/255700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-full flex items-center gap-1 transition-colors"
                    >
                    <WhatsAppIcon className="w-4 h-4" /> Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1 text-lg"
            >
              View Full Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-widest">Reviews</span>
            <h2 className="text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              What Our Customers Say
            </h2>
          </div>
          <Slider {...sliderSettings}>
            {testimonials.map((t) => (
              <div key={t.id} className="px-3">
                <div className="bg-green-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md h-full">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* ===== CTA / WHATSAPP SECTION ===== */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold font-heading text-gray-900 mb-4">
            Ready for a Refreshing Sip? 🥤
          </h2>
          <p className="text-gray-800 text-lg mb-8">
            Order now on WhatsApp and we'll have your fresh juice ready for you!
          </p>
          <a
            href="https://wa.me/255700000000?text=Hello!%20I%20would%20like%20to%20order%20some%20sugarcane%20juice."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full text-lg transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
          >
            <WhatsAppIcon className="w-6 h-6" /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
