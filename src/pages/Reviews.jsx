import { useState, useEffect } from 'react'
import { Star, Filter, Search, TrendingUp, Users, MessageSquare } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import Review from '../components/Review'
import ReviewForm from '../components/ReviewForm'
import Rating from '../components/Rating'
import { sendReviewNotifications } from '../utils/notificationService'

// Save reviews to localStorage
const saveReviews = (reviews) => {
  try {
    localStorage.setItem('utamuReviews', JSON.stringify(reviews))
  } catch (e) {
    console.error('Error saving reviews:', e)
  }
}

// Load reviews from localStorage (from bin abass, sultan, and bakari)
const loadReviews = (customerName) => {
  const stored = localStorage.getItem('utamuReviews')
  if (stored) {
    try {
      const allReviews = JSON.parse(stored)
      // Filter reviews from bin abass, sultan, and bakari
      const customerReviews = allReviews.filter(review => 
        review.name.toLowerCase() === 'bin abass' || 
        review.name.toLowerCase() === 'sultan' ||
        review.name.toLowerCase() === 'bakari'
      )
      // Sort by date (newest first)
      const sortedReviews = customerReviews.sort((a, b) => {
        const dateA = new Date(a.date || 0)
        const dateB = new Date(b.date || 0)
        return dateB - dateA // Newest first
      })
      return sortedReviews
    } catch (e) {
      console.error('Error loading reviews:', e)
    }
  }
  return [] // Start with empty array - no sample reviews
}

export default function Reviews() {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState(loadReviews(t('customer.name')))
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRating, setSelectedRating] = useState(0)
  const [sortBy, setSortBy] = useState('recent')

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => {
      const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRating = selectedRating === 0 || review.rating === selectedRating
      return matchesSearch && matchesRating
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date) - new Date(a.date)
        case 'helpful':
          return b.helpful - a.helpful
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  // Calculate statistics
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
  }))

  const handleReviewSubmit = async (reviewData) => {
    // In a real app, this would save to a database
    const newReview = {
      ...reviewData,
      id: Date.now(), // Use timestamp for unique ID
      helpful: 0,
      verified: false
    }
    
    const updatedReviews = [newReview, ...reviews]
    setReviews(updatedReviews)
    saveReviews(updatedReviews) // Save to localStorage
    
    // Dispatch storage event to notify Home page of new review
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'utamuReviews',
      newValue: JSON.stringify(updatedReviews),
      oldValue: JSON.stringify(reviews)
    }))
    
    // Send notifications to business
    await sendReviewNotifications(newReview)
    
    setShowForm(false)
    
    // Show success message
    alert('Thank you for your review! It has been submitted successfully.')
  }

  const handleHelpful = (reviewId) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    )
    setReviews(updatedReviews)
    saveReviews(updatedReviews)
  }

  const handleReport = (reviewId) => {
    // In a real app, this would report the review
    alert('Thank you for reporting this review. We will review it shortly.')
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">{t('reviews.hero.title')}</span>
          <h1 className="text-5xl font-extrabold font-heading text-white mt-3 mb-4">
            {t('reviews.hero.subtitle')}
          </h1>
          <p className="text-green-200 text-lg mb-6">
            {t('reviews.hero.description')}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            {t('reviews.writeReview')}
          </button>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                <Rating value={averageRating} readonly size="large" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t('reviews.basedOn')} {reviews.length} {t('reviews.reviews')}
              </p>
            </div>

            {/* Rating Distribution */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t('reviews.ratingDistribution')}
              </h3>
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                      {rating}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  {reviews.filter(r => r.verified).length} {t('reviews.verifiedPurchases')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  {reviews.filter(r => r.rating === 5).length} {t('reviews.fiveStarReviews')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  {reviews.reduce((sum, r) => sum + r.helpful, 0)} {t('reviews.helpfulVotes')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('reviews.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="0">{t('reviews.allRatings')}</option>
                <option value="5">5 {t('reviews.stars')}</option>
                <option value="4">4 {t('reviews.stars')}</option>
                <option value="3">3 {t('reviews.stars')}</option>
                <option value="2">2 {t('reviews.stars')}</option>
                <option value="1">1 {t('reviews.star')}</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="recent">{t('reviews.mostRecent')}</option>
                <option value="helpful">{t('reviews.mostHelpful')}</option>
                <option value="rating">{t('reviews.highestRated')}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('reviews.customerReviews')} ({filteredReviews.length})
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              {t('reviews.writeReview')}
            </button>
          </div>

          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('reviews.noReviews')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('reviews.beFirstToReview')}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                {t('reviews.writeFirstReview')}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Review
                  key={review.id}
                  review={review}
                  onHelpful={handleHelpful}
                  onReport={handleReport}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Review Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ReviewForm
              onSubmit={handleReviewSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
