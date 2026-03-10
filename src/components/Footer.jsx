import { Link } from 'react-router-dom'
import { WhatsAppIcon } from './BrandIcons'
import { Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <p className="font-bold text-white font-heading text-lg mb-1">Utamu wa Miwa</p>
            <p className="text-xs text-yellow-400 mb-4">Fresh Sugarcane Juice</p>
            <p className="text-sm leading-relaxed text-gray-400">
              Pure, fresh, and natural sugarcane juice from the heart of Zanzibar.
              Experience the authentic taste of <em>miwa</em> every sip.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold font-heading mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Our Menu', path: '/menu' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-green-400 transition-colors"
                  >
                    → {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold font-heading mb-4 text-lg">Our Products</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Classic Sugarcane Juice</li>
              <li>Ginger Sugarcane Blend</li>
              <li>Lime Sugarcane Twist</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold font-heading mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="text-green-500 mt-1 flex-shrink-0" size={16} />
                <span>Stone Town, Zanzibar, Tanzania</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="text-green-500 flex-shrink-0" size={16} />
                <a href="tel:+255718622621" className="hover:text-green-400 transition-colors">
                  +255 718 622 621
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <a
                href="https://wa.me/255718622621"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-full transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {year} Utamu wa Miwa. All rights reserved.</p>
          <p>Made with 💚 in Zanzibar, Tanzania</p>
        </div>
      </div>
    </footer>
  )
}
