import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Sun, Moon, ChevronDown, Phone, MapPin } from 'lucide-react'
import { SugarCaneIcon } from './BrandIcons'
import LanguageSwitcher from './LanguageSwitcher'
import CartIcon from './CartIcon'
import { useLanguage } from '../contexts/LanguageContext'

export default function Header({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }
    
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest('.dropdown')) {
        setDropdownOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownOpen])

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.menu'), path: '/menu' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.storeLocator'), path: '/store-locator' },
    { name: t('nav.reviews'), path: '/reviews' },
    { name: t('nav.contact'), path: '/contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl border-b border-gray-100/20 dark:border-gray-700/20'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group transform hover:scale-105 transition-all duration-300 ease-out"
            >
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_200/v1773143743/utamu_wa_miwa_modern_mlno2y.png"
                  alt="Utamu wa Miwa"
                  className="h-14 w-auto object-contain drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-yellow-400/20 rounded-full blur-md group-hover:from-green-400/30 group-hover:to-yellow-400/30 transition-all duration-300 -z-10"></div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 font-heading tracking-tight">
                  Utamu wa Miwa
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                  {t('header.tagline')}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 5).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-green-600 to-green-700 shadow-lg shadow-green-500/25'
                        : 'text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/30'
                    }`
                  }
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-600 to-green-700 opacity-0 peer-hover:opacity-20 transition-opacity duration-300"></div>
                </NavLink>
              ))}
              
              {/* More dropdown */}
              <div className="relative dropdown">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/30 rounded-full transition-all duration-300 ease-out"
                >
                  {t('nav.more')}
                  <ChevronDown size={16} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-down">
                    {navLinks.slice(5).map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={() => setDropdownOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-400 border-l-4 border-green-600'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-1'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              {/* Desktop actions */}
              <div className="hidden lg:flex items-center gap-3">
                <CartIcon />
                <Link
                  to="/contact"
                  className="group relative px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-bold rounded-full transition-all duration-300 ease-out shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5"
                >
                  <span className="relative z-10">{t('common.order')}</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:rotate-12"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              {/* Mobile controls */}
              <div className="flex lg:hidden items-center gap-2">
                <CartIcon />
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMenuOpen(false)}>
          <div className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col px-4 py-6 gap-2 max-h-[calc(100vh-80px)] overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl font-medium text-base transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-400 border-l-4 border-green-600 shadow-sm'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-2'
                    }`
                  }
                >
                  <span>{link.name}</span>
                </NavLink>
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-green-500/25"
                >
                  <Phone size={18} />
                  {t('common.order')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

          {/* Floating Language Button */}
          <div className="fixed bottom-6 right-6 z-40">
            <LanguageSwitcher />
          </div>
          </>
  )
}
