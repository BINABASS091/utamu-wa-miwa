import { CheckCircle } from 'lucide-react'
import { SugarCaneIcon } from '../components/BrandIcons'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const values = [
  { titleKey: 'about.values.freshness.title', descKey: 'about.values.freshness.desc' },
  { titleKey: 'about.values.local.title', descKey: 'about.values.local.desc' },
  { titleKey: 'about.values.hygiene.title', descKey: 'about.values.hygiene.desc' },
  { titleKey: 'about.values.community.title', descKey: 'about.values.community.desc' },
]

const milestones = [
  { year: '2018', eventKey: 'about.milestone.2018' },
  { year: '2019', eventKey: 'about.milestone.2019' },
  { year: '2021', eventKey: 'about.milestone.2021' },
  { year: '2023', eventKey: 'about.milestone.2023' },
  { year: '2025', eventKey: 'about.milestone.2025' },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
              <div className="inline-block w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full shadow-lg mx-auto mb-6 flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/diyy8h0d9/image/upload/v1777461351/Utamuwamua-01_4_llsohy.png"
                  alt="Utamu wa Miwa"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
          <h1 className="text-5xl font-extrabold font-heading text-white mb-4">{t('about.hero.subtitle')}</h1>
          <p className="text-green-200 text-xl leading-relaxed max-w-2xl mx-auto">
            {t('about.hero.description')}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="animate-slide-up">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">{t('about.hero.title')}</span>
              <h2 className="text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-3 mb-6 leading-tight">
                {t('about.story.title').split(' ').map((word, i) => 
                  word === 'Soil' ? <span key={i} className="text-green-600">{word}</span> : word
                ).reduce((prev, curr) => [prev, ' ', curr])}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                {t('about.story.p1')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                {t('about.story.p2')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.story.p3')}
              </p>
            </div>

            {/* Decorative card */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-10 shadow-xl text-center max-w-sm w-full">
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
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">{t('about.values.title')}</span>
            <h2 className="text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              {t('about.values.subtitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.titleKey}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CheckCircle className="text-3xl text-green-500 mb-3" size={28} />
                <h3 className="font-bold font-heading text-gray-900 dark:text-white mb-2">{t(v.titleKey)}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">{t('about.journey.title')}</span>
            <h2 className="text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-2">
              {t('about.milestones.title')}
            </h2>
          </div>
          <div className="relative border-l-4 border-green-500 pl-8 space-y-10">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-5 top-1.5 w-6 h-6 rounded-full bg-green-500 border-4 border-white dark:border-gray-900 block" />
                <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-1">{m.year}</p>
                <p className="text-gray-700 dark:text-gray-300">{t(m.eventKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold font-heading text-white mb-4">
            {t('about.cta.title')}
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            {t('about.cta.description')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-yellow-50 transition-all hover:shadow-xl hover:-translate-y-1 text-lg"
          >
            {t('nav.contact')} →
          </Link>
        </div>
      </section>
    </div>
  )
}
