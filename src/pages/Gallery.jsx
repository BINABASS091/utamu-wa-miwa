import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

// Gallery items — Cloudinary images per juice type
const galleryItems = [
  { id: 1, src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/v1773143147/sugarcane_hvtocf.jpg', alt: 'Fresh sugarcane juice' },
  { id: 2, src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/v1773143385/pineapple_bw6j01.jpg', alt: 'Fresh pineapple juice' },
  { id: 3, src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/v1773143147/mango_oefxsz.jpg',     alt: 'Fresh mango juice' },
  { id: 4, src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/v1773143141/avocado_dax7s8.jpg',   alt: 'Fresh avocado juice' },
  { id: 5, src: 'https://res.cloudinary.com/diyy8h0d9/image/upload/v1773143385/grape41_vvjzs2.jpg',   alt: 'Fresh grape (zabibu) juice' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const filtered = galleryItems

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">Gallery</span>
          <h1 className="text-5xl font-extrabold font-heading text-white mt-3 mb-4">
            A Feast for the Eyes
          </h1>
          <p className="text-green-200 text-lg">
            From farm to glass — our journey in pictures.
          </p>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-white text-sm font-medium">{item.alt}</p>
                    <ZoomIn className="text-white flex-shrink-0" size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-16 text-lg">
              No images in this category.
            </p>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors p-2"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src.replace('w=600', 'w=1200')}
              alt={lightbox.alt}
              className="w-full h-auto rounded-2xl shadow-2xl max-h-[80vh] object-contain"
            />
            <p className="text-white text-center mt-4 text-sm">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </div>
  )
}
