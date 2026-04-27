import { useState, useEffect } from 'react'
import { Star, MessageSquare, Plus } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import Review from './Review'
import ReviewForm from './ReviewForm'
import Rating from './Rating'
import { sendReviewNotifications } from '../utils/notificationService'

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
  return []
}

// Save reviews to localStorage
const saveReviews = (reviews) => {
  try {
    localStorage.setItem('utamuReviews', JSON.stringify(reviews))
  } catch (e) {
    console.error('Error saving reviews:', e)
  }
}

export default function ProductReviews({ productId, productName, className = '' }) {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState(loadReviews(t('customer.name')))
  const [showForm, setShowForm] = useState(false)

  // Filter reviews for this specific product
  const productReviews = reviews.filter(review => review.productId === productId)

  // Calculate average rating for this product
  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length 
    : 0

  const handleReviewSubmit = async (reviewData) => {
    const newReview = {
      ...reviewData,
      id: Date.now(),
      helpful: 0,
      verified: false
    }
    
    const updatedReviews = [newReview, ...reviews]
    setReviews(updatedReviews)
    saveReviews(updatedReviews)
    
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
    alert('Thank you for reporting this review. We will review it shortly.')
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('reviews.customerReviews')}
          </h3>
          <div className="flex items-center gap-3">
            <Rating value={averageRating} readonly size="small" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {averageRating.toFixed(1)} ({productReviews.length} {t('reviews.reviews')})
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          {t('reviews.writeReview')}
        </button>
      </div>

      {/* Reviews List */}
      {productReviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('reviews.noReviews')}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
          >
            {t('reviews.writeFirstReview')}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {productReviews.slice(0, 3).map((review) => (
            <Review
              key={review.id}
              review={review}
              onHelpful={handleHelpful}
              onReport={handleReport}
              showActions={true}
            />
          ))}
          
          {productReviews.length > 3 && (
            <div className="text-center pt-4">
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                View all {productReviews.length} reviews →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Review Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ReviewForm
              productId={productId}
              productName={productName}
              onSubmit={handleReviewSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
