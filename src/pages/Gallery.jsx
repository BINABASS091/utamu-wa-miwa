import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ZoomIn, ChevronLeft, ChevronRight, Leaf, Loader2 } from 'lucide-react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { useLanguage } from '../contexts/LanguageContext'

const galleryItems = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123919/WhatsApp_Image_2026-04-25_at_16.28.46_2_kf7k2x.jpg',
    srcSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777123919/WhatsApp_Image_2026-04-25_at_16.28.46_2_kf7k2x.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123919/WhatsApp_Image_2026-04-25_at_16.28.46_2_kf7k2x.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1777123919/WhatsApp_Image_2026-04-25_at_16.28.46_2_kf7k2x.jpg 1200w'
    ],
    altKey: 'product.lemon',
    labelKey: 'gallery.tag.classic',
    tagKey: 'gallery.tag.classic',
    featured: true,
    description: 'Fresh lemon sugarcane juice with a zesty twist'
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_1_qqaq60.jpg',
    srcSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_1_qqaq60.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_1_qqaq60.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_1_qqaq60.jpg 1200w'
    ],
    altKey: 'product.ginger',
    labelKey: 'gallery.tag.blended',
    tagKey: 'gallery.tag.blended',
    description: 'Spicy ginger sugarcane blend for an energizing boost'
  },
  {
    id: 3,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_1_rjpc2c.jpg',
    srcSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_1_rjpc2c.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_1_rjpc2c.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_1_rjpc2c.jpg 1200w'
    ],
    altKey: 'product.mint',
    labelKey: 'gallery.tag.blended',
    tagKey: 'gallery.tag.blended',
    description: 'Refreshing mint sugarcane juice with cooling properties'
  },
  {
    id: 4,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_rsvu87.jpg',
    srcSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_rsvu87.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_rsvu87.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_rsvu87.jpg 1200w'
    ],
    altKey: 'product.passion',
    labelKey: 'gallery.tag.blended',
    tagKey: 'gallery.tag.blended',
    description: 'Tropical passion fruit sugarcane blend'
  },
  {
    id: 5,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_eumhtz.jpg',
    srcSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_eumhtz.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_eumhtz.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_eumhtz.jpg 1200w'
    ],
    altKey: 'product.cucumber',
    labelKey: 'gallery.tag.blended',
    tagKey: 'gallery.tag.blended',
    description: 'Cool cucumber sugarcane juice for hydration'
  },
  {
    id: 6,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1773143147/sugarcane_hvtocf.jpg',
    srcSet: [
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_400,h_300,c_fill/v1773143147/sugarcane_hvtocf.jpg 400w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800,h_600,c_fill/v1773143147/sugarcane_hvtocf.jpg 800w',
      'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_1200,h_900,c_fill/v1773143147/sugarcane_hvtocf.jpg 1200w'
    ],
    altKey: 'product.classic',
    labelKey: 'gallery.tag.classic',
    tagKey: 'gallery.tag.classic',
    featured: true,
    description: 'Pure, classic sugarcane juice - the original taste'
  },
]

// Enhanced image component with lazy loading
const LazyImage = ({ src, srcSet, alt, className, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className="relative">
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      )}
      {isInView && (
        <img
          src={src}
          srcSet={srcSet}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => {
            setIsLoaded(true)
            onLoad?.()
          }}
          loading="lazy"
        />
      )}
    </div>
  )
}

// first item spans 2 cols + 2 rows on desktop (bento hero tile)
const gridSpan = [
  'sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 lg:row-span-2 xl:row-span-2',
  '',
  '',
  '',
  '',
  '',
]

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [loadedImages, setLoadedImages] = useState(new Set())
  const { t } = useLanguage()

  const prev = useCallback(() =>
    setLightboxIndex((i) => (i > 0 ? i - 1 : galleryItems.length - 1)), [])

  const next = useCallback(() =>
    setLightboxIndex((i) => (i < galleryItems.length - 1 ? i + 1 : 0)), [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, prev, next])

  const active = lightboxIndex !== null ? galleryItems[lightboxIndex] : null

  return (
    <div className="pt-16 overflow-x-hidden">

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-800 py-24 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-400/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold rounded-full uppercase tracking-widest mb-6">
            <Leaf size={12} /> {t('gallery.title')}
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold font-heading text-white mt-2 mb-4 leading-tight">
            {t('gallery.subtitle')}
          </h1>
          <p className="text-green-200 text-lg">
            {t('gallery.description')}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-white dark:fill-gray-900">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="bg-white dark:bg-gray-900 py-8 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-10">
          {[
            { value: '5', label: 'Juice Varieties' },
            { value: '100%', label: 'Fresh & Natural' },
            { value: 'Daily', label: 'Freshly Pressed' },
            { value: 'Local', label: 'Zanzibar Farms' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-green-600 dark:text-green-400 font-heading">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BENTO GALLERY GRID ===== */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 auto-rows-[320px] xs:auto-rows-[336px] sm:auto-rows-[352px] md:auto-rows-[368px] lg:auto-rows-[384px] xl:auto-rows-[576px]">
            {galleryItems.map((item, idx) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${gridSpan[idx]}`}
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Photo */}
                <LazyImage
                  src={item.src}
                  srcSet={item.srcSet}
                  alt={t(item.altKey)}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tag badge (top-left) */}
                {item.tagKey && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-green-700 text-xs font-bold rounded-full shadow">
                    {t(item.tagKey)}
                  </span>
                )}

                {/* Featured badge (top-right) */}
                {item.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full shadow">
                    {t('gallery.featured')}
                  </span>
                )}

                {/* Enhanced label with description (bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-bold text-sm mb-1">{t(item.labelKey)}</p>
                  {item.description && (
                    <p className="text-white/80 text-xs line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold font-heading text-gray-900 dark:text-white mb-3">
            Like What You See?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Come taste it in person or order directly on WhatsApp!
          </p>
          <a
            href="https://wa.me/255718622621?text=Hello!%20I%20would%20like%20to%20order%20some%20juice."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
          >
            <WhatsAppIcon className="w-5 h-5" /> Order on WhatsApp
          </a>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 rounded-full text-white/70 text-sm font-medium">
            {lightboxIndex + 1} / {galleryItems.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Enhanced Image Container */}
          <div className="max-w-5xl w-full mx-4 sm:mx-8 lg:mx-16" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={active.src}
                srcSet={active.srcSet}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                alt={t(active.altKey)}
                className="w-full h-auto rounded-2xl shadow-2xl max-h-[75vh] object-contain"
              />
              {/* Image loading indicator */}
              {!loadedImages.has(active.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
            </div>
            {/* Enhanced image information */}
            <div className="mt-6 text-center space-y-2">
              <h3 className="text-white font-extrabold font-heading text-2xl">{t(active.altKey)}</h3>
              <p className="text-white/90 text-lg">{t(active.labelKey)}</p>
              {active.description && (
                <p className="text-white/70 text-sm max-w-2xl mx-auto">{active.description}</p>
              )}
              {/* Product tags */}
              <div className="flex justify-center gap-2 mt-3">
                {active.tagKey && (
                  <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                    {t(active.tagKey)}
                  </span>
                )}
                {active.featured && (
                  <span className="px-3 py-1 bg-yellow-400/20 text-yellow-300 text-xs font-medium rounded-full">
                    {t('gallery.featured')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}
