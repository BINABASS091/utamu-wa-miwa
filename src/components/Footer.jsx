import { Link } from 'react-router-dom'
import { WhatsAppIcon } from './BrandIcons'
import { Phone, MapPin } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <p className="font-bold text-white font-heading text-lg mb-1">{t('footer.brand')}</p>
            <p className="text-xs text-yellow-400 mb-4">{t('footer.tagline')}</p>
            <p className="text-sm leading-relaxed text-gray-400">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold font-heading mb-4 text-lg">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { nameKey: 'nav.home', path: '/' },
                { nameKey: 'nav.about', path: '/about' },
                { nameKey: 'nav.menu', path: '/menu' },
                { nameKey: 'nav.gallery', path: '/gallery' },
                { nameKey: 'nav.contact', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-green-400 transition-colors"
                  >
                    {t(item.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold font-heading mb-4 text-lg">{t('footer.products')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                'product.classic',
                'product.ginger',
                'product.lemon',
                'product.mint',
                'product.passion',
                'product.cucumber',
              ].map((productKey) => (
                <li key={productKey} className="hover:text-green-400 transition-colors">
                  {t(productKey)}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold font-heading mb-4 text-lg">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="text-green-500 flex-shrink-0" size={16} />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="text-green-500 flex-shrink-0" size={16} />
                <a
                  href="https://wa.me/255718622621"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  {t('footer.whatsapp')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>{t('footer.copyright', { year })}</p>
          <p>{t('footer.made')}</p>
        </div>
      </div>
    </footer>
  )
}
