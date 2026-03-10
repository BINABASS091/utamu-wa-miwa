import { CheckCircle } from 'lucide-react'
import { SugarCaneIcon } from '../components/BrandIcons'
import { Link } from 'react-router-dom'

const values = [
  { title: 'Freshness First', desc: 'We press every glass to order — never pre-made, always fresh.' },
  { title: 'Local Sources', desc: 'Sugarcane from trusted Zanzibari farmers who share our passion.' },
  { title: 'Hygiene & Safety', desc: 'Clean preparation environment, food-safe equipment, every time.' },
  { title: 'Community Impact', desc: 'Supporting local farmers and creating jobs in Zanzibar.' },
]

const milestones = [
  { year: '2018', event: 'Started as a small cart in Stone Town, Zanzibar.' },
  { year: '2019', event: 'Expanded to 3 flavors and doubled daily sales.' },
  { year: '2021', event: 'Launched blended flavors — ginger, lemon, and mint.' },
  { year: '2023', event: 'Served 500+ happy customers monthly.' },
  { year: '2025', event: 'Launched our official online presence. Welcome!' },
]

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
              <img
                src="https://res.cloudinary.com/diyy8h0d9/image/upload/v1773143743/utamu_wa_miwa_modern_mlno2y.png"
                alt="Utamu wa Miwa"
                className="w-56 h-auto object-contain mx-auto mb-6 drop-shadow-lg"
              />
          <h1 className="text-5xl font-extrabold font-heading text-white mb-4">Our Story</h1>
          <p className="text-green-200 text-xl leading-relaxed max-w-2xl mx-auto">
            A humble beginning, a bold vision — bringing the purest taste of
            Zanzibar sugarcane juice to every corner of the island.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="animate-slide-up">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">About Us</span>
              <h2 className="text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-3 mb-6 leading-tight">
                Sweetness from the <span className="text-green-600">Soil</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                Utamu wa Miwa (meaning "Sweetness of the Cane" in Swahili) was born out of a
                deep love for natural, wholesome drinks. Our founder grew up watching family
                members press fresh cane juice in the fields of Zanzibar — it was the drink
                of celebration, of heat, of life.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                In 2018, that family tradition became a business. Starting with one cart and
                one hand press in Stone Town, we began serving the freshest sugarcane juice
                to locals and tourists alike.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, Utamu wa Miwa stands for authenticity — every glass pressed fresh,
                every ingredient local, every customer treated like family. This is not just
                juice. This is Zanzibar in a cup.
              </p>
            </div>

            {/* Decorative card */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-10 shadow-xl text-center max-w-sm w-full">
                <img
                  src="https://res.cloudinary.com/diyy8h0d9/image/upload/v1773143743/utamu_wa_miwa_modern_mlno2y.png"
                  alt="Utamu wa Miwa"
                  className="w-28 h-auto object-contain mx-auto mb-6"
                />
                <blockquote className="text-xl font-semibold font-heading text-gray-900 dark:text-white italic leading-relaxed">
                  "Hakuna kinywaji kizuri kama maji ya miwa mbichi."
                </blockquote>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  ("There is no better drink than fresh sugarcane juice.")
                </p>
                <p className="mt-4 text-green-700 dark:text-green-400 font-bold">— Zanzibar Proverb</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-green-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Our Values</span>
            <h2 className="text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CheckCircle className="text-3xl text-green-500 mb-3" size={28} />
                <h3 className="font-bold font-heading text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Journey</span>
            <h2 className="text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              Our Milestones
            </h2>
          </div>
          <div className="relative border-l-4 border-green-500 pl-8 space-y-10">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-5 top-1.5 w-6 h-6 rounded-full bg-green-500 border-4 border-white dark:border-gray-900 block" />
                <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-1">{m.year}</p>
                <p className="text-gray-700 dark:text-gray-300">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold font-heading text-white mb-4">
            Come Taste the Difference
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            Visit us in Stone Town or order on WhatsApp — freshness guaranteed.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-yellow-50 transition-all hover:shadow-xl hover:-translate-y-1 text-lg"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </div>
  )
}
