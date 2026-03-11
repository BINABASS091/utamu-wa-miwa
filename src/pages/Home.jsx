import { Link } from 'react-router-dom'
import { Star, ArrowRight, Droplet, Zap, Heart, Award, Leaf } from 'lucide-react'
import { WhatsAppIcon, SugarCaneIcon } from '../components/BrandIcons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HERO_IMAGE = 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_900/v1773155008/sugar2_is9tf8.jpg'

// --- Featured products data ---
const featuredProducts = [
  {
    id: 1,
    name: 'Classic Sugarcane Juice',
    desc: 'Pure, freshly pressed sugarcane â€” sweet, cool, and natural.',
    badge: 'Best Seller',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1773143147/sugarcane_hvtocf.jpg',
  },
  {
    id: 2,
    name: 'Ginger Sugarcane Blend',
    desc: 'A spicy kick of fresh ginger with sweet sugarcane juice.',
    badge: 'Popular',
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1773145489/ginger_el03jm.jpg',
  },
  {
    id: 3,
    name: 'Lime Sugarcane Twist',
    desc: 'Fresh squeezed lime juice mixed with sweet sugarcane for a sharp citrus kick.',
    badge: null,
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1773145847/lime_nozlcu.jpg',
  },
]

// --- Testimonials data ---
const testimonials = [
  {
    id: 1,
    text: 'Best sugarcane juice I have ever tasted! So fresh and natural. I come here every morning!',
    rating: 5,
  },
  {
    id: 2,
    text: 'The ginger blend is absolutely amazing. Perfect balance of sweet and spicy. Highly recommend!',
    rating: 5,
  },
  {
    id: 3,
    text: 'Visited Zanzibar and this was a highlight. Authentic taste, clean preparation, love it!',
    rating: 5,
  },
  {
    id: 4,
    text: 'Refreshing and very affordable. The classic is my favorite â€” so cooling in the heat!',
    rating: 5,
  },
]

// --- Why Choose Us data ---
const features = [
  {
    icon: <Droplet size={28} />,
    title: '100% Fresh',
    desc: 'Pressed fresh in front of you â€” no preservatives, no artificial flavors.',
    color: 'bg-green-500',
  },
  {
    icon: <Leaf size={28} />,
    title: 'Local Sugarcane',
    desc: 'Sourced directly from local Zanzibari farmers for maximum freshness.',
    color: 'bg-emerald-500',
  },
  {
    icon: <Zap size={28} />,
    title: 'Natural Energy',
    desc: 'The perfect natural energy boost â€” pure cane sugar, no caffeine.',
    color: 'bg-yellow-500',
  },
  {
    icon: <Heart size={28} />,
    title: 'Made with Love',
    desc: 'Every cup prepared with passion and care by our local team.',
    color: 'bg-red-400',
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
                The Taste of{' '}
                <span className="text-yellow-400">Fresh</span>
                <br />
                <span className="text-green-400">Sugarcane</span>
              </h1>

              <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                <strong className="text-white">Utamu wa Miwa</strong> â€” experience the authentic
                taste of freshly pressed Zanzibari sugarcane juice. Pure, natural, and bursting with energy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link
                  to="/menu"
                  className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold rounded-full transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center gap-2 text-base"
                >
                  See Our Menu <ArrowRight size={18} />
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
            <span className="text-green-600 dark:text-green-400 font-bold text-sm uppercase tracking-widest">Why Us?</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              What Makes Us Special
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative bg-gray-50 dark:bg-gray-800 rounded-3xl p-7 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-green-600/0 group-hover:from-green-600/5 group-hover:to-transparent transition-all duration-300 rounded-3xl" />
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
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
                <span className="text-yellow-400 font-bold text-sm uppercase tracking-widest">Our Story</span>
                <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-white mt-3 mb-6 leading-tight">
                  Born from the Heart<br />of Zanzibar
                </h2>
                <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg">
                  Utamu wa Miwa started as a small street vendor in Stone Town, Zanzibar. With fresh
                  sugarcane sourced directly from local farms, we press every cup by hand â€” delivering
                  the pure, natural taste that Zanzibaris have loved for generations.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  Read Our Story <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 max-w-xs w-full">
                  <img
                    src="https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_200/v1773143743/utamu_wa_miwa_modern_mlno2y.png"
                    alt="Utamu wa Miwa"
                    loading="lazy"
                    className="w-32 h-auto object-contain mx-auto mb-4 drop-shadow-lg"
                  />
                  <p className="text-white text-lg font-semibold font-heading italic">
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
            <span className="text-green-600 dark:text-green-400 font-bold text-sm uppercase tracking-widest">Our Menu</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              Featured Flavors
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mt-4" />
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
              All juices freshly pressed on demand â€” choose your flavor, enjoy the freshness.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-extrabold rounded-full shadow">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-extrabold font-heading text-gray-900 dark:text-white text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-5">{product.desc}</p>
                  <div className="flex justify-end">
                    <a
                      href={`https://wa.me/255718622621?text=Hello!%20I%20would%20like%20to%20order%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-full transition-colors shadow hover:shadow-lg"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" /> Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1 text-lg"
            >
              View Full Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-green-600 dark:text-green-400 font-bold text-sm uppercase tracking-widest">Reviews</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              What Our Customers Say
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mt-4" />
          </div>
          <Slider {...sliderSettings}>
            {testimonials.map((t) => (
              <div key={t.id} className="px-3">
                <div className="bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-3xl p-7 shadow-md border border-green-100 dark:border-gray-700">
                  <div className="text-5xl text-green-300 dark:text-green-700 font-serif leading-none mb-3">"</div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                    {t.text}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
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
            Order Now
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-white mb-4">
            Ready for a Refreshing Sip?
          </h2>
          <p className="text-green-200 text-lg mb-10 max-w-lg mx-auto">
            Order now on WhatsApp and we'll have your fresh juice ready for you!
          </p>
          <a
            href="https://wa.me/255718622621?text=Hello!%20I%20would%20like%20to%20order%20some%20sugarcane%20juice."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold rounded-full text-lg transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
          >
            <WhatsAppIcon className="w-6 h-6" /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
