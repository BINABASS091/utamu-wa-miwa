import { useState, useEffect } from 'react'
import { MapPin, Navigation, Phone, Clock, Star, Search, Filter } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

// Store locations data
const storeLocations = [
  {
    id: 1,
    name: 'Utamu wa Miwa - Stone Town',
    nameKey: 'stores.stoneTown',
    address: 'MKwapa Street, Stone Town',
    addressKey: 'stores.stoneTown.address',
        email: 'info@utamuwamiwa.co.tz',
    coordinates: { lat: -6.1659, lng: 39.1856 },
    hours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '9:00 AM - 9:00 PM',
      sunday: '9:00 AM - 6:00 PM'
    },
    rating: 4.8,
    reviews: 127,
    features: ['delivery', 'wifi', 'parking', 'seating'],
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1773155008/sugar2_is9tf8.jpg',
    isMainStore: true
  },
  {
    id: 2,
    name: 'Utamu wa Miwa - Nungwi',
    nameKey: 'stores.nungwi',
    address: 'Nungwi Beach Road, Nungwi',
    addressKey: 'stores.nungwi.address',
        email: 'nungwi@utamuwamiwa.co.tz',
    coordinates: { lat: -5.7333, lng: 39.3000 },
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 9:00 PM',
      sunday: '9:00 AM - 6:00 PM'
    },
    rating: 4.9,
    reviews: 89,
    features: ['delivery', 'beach_view', 'parking'],
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.46_1_qqaq60.jpg',
    isMainStore: false
  },
  {
    id: 3,
    name: 'Utamu wa Miwa - Paje',
    nameKey: 'stores.paje',
    address: 'Paje Beach Road, Paje',
    addressKey: 'stores.paje.address',
        email: 'paje@utamuwamiwa.co.tz',
    coordinates: { lat: -6.2167, lng: 39.5333 },
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 7:00 PM',
      sunday: '9:00 AM - 5:00 PM'
    },
    rating: 4.7,
    reviews: 64,
    features: ['delivery', 'kitesurfing_area', 'parking'],
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1777123919/WhatsApp_Image_2026-04-25_at_16.28.46_2_kf7k2x.jpg',
    isMainStore: false
  },
  {
    id: 4,
    name: 'Utamu wa Miwa - Kendwa',
    nameKey: 'stores.kendwa',
    address: 'Kendwa Beach Road, Kendwa',
    addressKey: 'stores.kendwa.address',
        email: 'kendwa@utamuwamiwa.co.tz',
    coordinates: { lat: -5.7833, lng: 39.2833 },
    hours: {
      monday: '10:00 AM - 6:00 PM',
      tuesday: '10:00 AM - 6:00 PM',
      wednesday: '10:00 AM - 6:00 PM',
      thursday: '10:00 AM - 6:00 PM',
      friday: '10:00 AM - 6:00 PM',
      saturday: '10:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM'
    },
    rating: 4.6,
    reviews: 45,
    features: ['delivery', 'sunset_view', 'parking'],
    image: 'https://res.cloudinary.com/diyy8h0d9/image/upload/f_auto,q_auto,w_600/v1777123918/WhatsApp_Image_2026-04-25_at_16.28.45_1_rjpc2c.jpg',
    isMainStore: false
  }
]

export default function StoreLocator() {
  const { t } = useLanguage()
  const [selectedStore, setSelectedStore] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [mapCenter, setMapCenter] = useState({ lat: -6.1659, lng: 39.1856 })
  const [mapZoom, setMapZoom] = useState(12)

  // Get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(location)
          setMapCenter(location)
          setMapZoom(13)
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Filter stores based on search
  const filteredStores = storeLocations.filter(store => 
    t(store.nameKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    t(store.addressKey).toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get directions to store
  const getDirections = (store) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`
    window.open(url, '_blank')
  }

  // Generate Google Maps URL
  const getMapUrl = () => {
    const center = selectedStore ? selectedStore.coordinates : mapCenter
    const zoom = selectedStore ? 15 : mapZoom
    return `https://maps.google.com/maps?q=${center.lat},${center.lng}&z=${zoom}&output=embed`
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">{t('storeLocator.hero.title')}</span>
          <h1 className="text-5xl font-extrabold font-heading text-white mt-3 mb-4">
            {t('storeLocator.hero.subtitle')}
          </h1>
          <p className="text-green-200 text-lg mb-6">
            {t('storeLocator.hero.description')}
          </p>
          <button
            onClick={getUserLocation}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            <Navigation className="w-5 h-5" />
            {t('storeLocator.findNearby')}
          </button>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('storeLocator.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {t('storeLocator.filter')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Store List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('storeLocator.storesNearYou')} ({filteredStores.length})
              </h2>
              
              {filteredStores.map((store) => {
                const distance = userLocation ? calculateDistance(
                  userLocation.lat, userLocation.lng,
                  store.coordinates.lat, store.coordinates.lng
                ) : null
                
                return (
                  <div
                    key={store.id}
                    className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
                      selectedStore?.id === store.id 
                        ? 'border-green-500' 
                        : 'border-transparent'
                    }`}
                    onClick={() => {
                      setSelectedStore(store)
                      setMapCenter(store.coordinates)
                      setMapZoom(15)
                    }}
                  >
                    <div className="flex gap-4">
                      <img
                        src={store.image}
                        alt={t(store.nameKey)}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                              {t(store.nameKey)}
                              {store.isMainStore && (
                                <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                                  {t('storeLocator.mainStore')}
                                </span>
                              )}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {t(store.addressKey)}
                            </p>
                          </div>
                          {distance && (
                            <span className="text-sm font-medium text-green-600">
                              {distance.toFixed(1)} km
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{store.rating}</span>
                            <span className="text-sm text-gray-500">({store.reviews})</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mb-3">
                          {store.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                            >
                              {t(`storeLocator.features.${feature}`)}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              getDirections(store)
                            }}
                            className="flex items-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            <Navigation className="w-4 h-4" />
                            {t('storeLocator.directions')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Map */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {t('storeLocator.mapTitle')}
                  </h3>
                  {selectedStore && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t(selectedStore.nameKey)}
                    </p>
                  )}
                </div>
                <div className="relative h-96 lg:h-[500px]">
                  <iframe
                    src={getMapUrl()}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                  {userLocation && (
                    <button
                      onClick={() => {
                        setMapCenter(userLocation)
                        setMapZoom(13)
                        setSelectedStore(null)
                      }}
                      className="absolute top-4 right-4 px-3 py-2 bg-white dark:bg-gray-800 shadow-md rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t('storeLocator.resetView')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
