import { WhatsAppIcon } from '../components/BrandIcons'
import { Phone, MapPin } from 'lucide-react'

export default function Contact() {

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">Contact</span>
          <h1 className="text-5xl font-extrabold font-heading text-white mt-3 mb-4">
            Get In Touch
          </h1>
          <p className="text-green-200 text-lg">
            We'd love to hear from you — orders, questions, or just a hello!
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact info */}
            <div>
              <h2 className="text-3xl font-extrabold font-heading text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-green-600 dark:text-green-400" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Location</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Stone Town, Zanzibar, Tanzania
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-green-600 dark:text-green-400 flex-shrink-0" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Phone / WhatsApp</p>
                    <a href="tel:+255718622621" className="text-green-600 dark:text-green-400 text-sm hover:underline">
                      +255 718 622 621
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening hours */}
              <div className="bg-green-50 dark:bg-gray-800 rounded-2xl p-5 mb-8">
                <h3 className="font-bold font-heading text-gray-900 dark:text-white mb-3">Opening Hours</h3>
                <div className="space-y-1 text-sm">
                  {[
                    { day: 'Monday – Friday', hours: '7:00 AM – 8:00 PM' },
                    { day: 'Saturday', hours: '7:00 AM – 9:00 PM' },
                    { day: 'Sunday', hours: '8:00 AM – 6:00 PM' },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between gap-4">
                      <span className="text-gray-600 dark:text-gray-400">{row.day}</span>
                      <span className="font-medium text-green-700 dark:text-green-400">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reach us */}
              <div>
                <h3 className="font-bold font-heading text-gray-900 dark:text-white mb-3">Order & Contact</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/255718622621?text=Hello!%20I%20want%20to%20order%20sugarcane%20juice."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
                  </a>
                  <a
                    href="tel:+255718622621"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full text-sm transition-colors"
                  >
                    <Phone size={16} /> Call Us
                  </a>
                </div>
              </div>
            </div>

            {/* Direct contact panel */}
            <div>
              <h2 className="text-3xl font-extrabold font-heading text-gray-900 dark:text-white mb-6">
                Reach Us Directly
              </h2>
              <div className="space-y-5">

                {/* WhatsApp card */}
                <a
                  href="https://wa.me/255718622621?text=Hello!%20I%20want%20to%20order%20sugarcane%20juice."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-6 bg-green-50 dark:bg-gray-800 rounded-2xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <WhatsAppIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">WhatsApp</p>
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">+255 718 622 621</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Tap to chat — we reply fast!</p>
                  </div>
                </a>

                {/* Phone card */}
                <a
                  href="tel:+255718622621"
                  className="flex items-center gap-5 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-800 dark:bg-gray-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">Phone Call</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">+255 718 622 621</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Call us anytime during opening hours</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps embed */}
      <section className="h-80 lg:h-96 w-full">
        <iframe
          title="Utamu wa Miwa Location – Stone Town Zanzibar"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3990.8753!2d39.1856!3d-6.1659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185cd0b7e9f7ad9b%3A0x2f7d6e2e5e9e9e9e!2sStone%20Town%2C%20Zanzibar!5e0!3m2!1sen!2stz!4v1700000000000!5m2!1sen!2stz"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  )
}
