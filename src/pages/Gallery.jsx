import { useState, useEffect, useCallback } from 'react'
import { X, ZoomIn, ChevronLeft, ChevronRight, Leaf } from 'lucide-react'
import { WhatsAppIcon } from '../components/BrandIcons'

const galleryItems = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800/v1773143147/sugarcane_hvtocf.jpg',
    alt: 'Fresh sugarcane juice',
    label: 'Sugarcane',
    tag: 'Classic',
    featured: true,
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800/v1773143385/pineapple_bw6j01.jpg',
    alt: 'Fresh pineapple juice',
    label: 'Pineapple',
    tag: 'Blended',
  },
  {
    id: 3,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800/v1773143147/mango_oefxsz.jpg',
    alt: 'Fresh mango juice',
    label: 'Mango',
    tag: 'Blended',
  },
  {
    id: 4,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800/v1773143141/avocado_dax7s8.jpg',
    alt: 'Fresh avocado juice',
    label: 'Avocado',
    tag: 'Blended',
  },
  {
    id: 5,
    src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_800/v1773207345/grape444_rfx006.jpg',
    alt: 'Fresh grape (zabibu) juice',
    label: 'Zabibu',
    tag: 'Blended',
  },
]

// first item spans 2 cols + 2 rows on desktop (bento hero tile)
const gridSpan = [
  'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  '',
  '',
  '',
  '',
]

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

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
            <Leaf size={12} /> Our Gallery
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold font-heading text-white mt-2 mb-4 leading-tight">
            A Feast for the <span className="text-yellow-400">Eyes</span>
          </h1>
          <p className="text-green-200 text-lg">
            From farm to glass — our journey in pictures.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]">
            {galleryItems.map((item, idx) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${gridSpan[idx]}`}
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Photo */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Tag badge (top-left) */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-extrabold rounded-full shadow-lg">
                  {item.tag}
                </span>

                {/* Featured badge (top-right) */}
                {item.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold rounded-full">
                    Featured
                  </span>
                )}

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <p className="text-white font-extrabold font-heading text-lg leading-tight drop-shadow">{item.label}</p>
                    <p className="text-green-300 text-xs mt-0.5">{item.alt}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={16} className="text-white" />
                  </div>
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

          {/* Image */}
          <div className="max-w-4xl w-full mx-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.src}
              alt={active.alt}
              className="w-full h-auto rounded-2xl shadow-2xl max-h-[75vh] object-contain"
            />
            <div className="mt-5 text-center">
              <p className="text-white font-extrabold font-heading text-xl">{active.label}</p>
              <p className="text-white/50 text-sm mt-1">{active.alt}</p>
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
