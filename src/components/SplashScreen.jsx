  import { useEffect, useState } from 'react'

  export default function SplashScreen({ onDone }) {
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
      // Start fade-out at 2.8s, then call onDone at 3.3s
      const fadeTimer = setTimeout(() => setFadeOut(true), 2800)
      const doneTimer = setTimeout(() => onDone(), 3300)
      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(doneTimer)
      }
    }, [onDone])

    return (
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 transition-opacity duration-500 ${
          fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-600/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full translate-x-1/3 translate-y-1/3" />

        {/* Content */}
      <div className="relative flex flex-col items-center gap-6 px-8 text-center animate-[fadeIn_0.8s_ease_forwards]">
        {/* Logo */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full shadow-lg flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/diyy8h0d9/image/upload/v1777461351/Utamuwamua-01_4_llsohy.png"
            alt="Utamu wa Miwa"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Tagline */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-heading tracking-wide drop-shadow">
            Utamu wa Miwa
          </h1>
          <p className="mt-2 text-yellow-300 text-lg font-body tracking-wider">
            Fresh Sugarcane Juice · Zanzibar
          </p>
        </div>

          {/* Divider */}
          <div className="w-20 h-1 rounded-full bg-yellow-400 opacity-80" />

          {/* Subtitle */}
          <p className="text-green-100 text-sm md:text-base max-w-xs leading-relaxed">
            Pure. Natural. Refreshing. <br />Experience the authentic taste of Zanzibar.
          </p>

          {/* Loading dots */}
          <div className="flex gap-2 mt-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    )
  }
