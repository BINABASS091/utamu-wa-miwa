import { Link } from 'react-router-dom'

export default function FloatingLogo() {
  return (
    <div className="fixed top-20 left-4 sm:top-24 sm:left-6 z-40 group">
      <Link 
        to="/" 
        className="block transform hover:scale-110 transition-all duration-300 ease-out"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300">
          <img
            src="https://res.cloudinary.com/diyy8h0d9/image/upload/v1777375559/Utamuwamua-01_tdl9jx.png"
            alt="Utamu wa Miwa"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
    </div>
  )
}
