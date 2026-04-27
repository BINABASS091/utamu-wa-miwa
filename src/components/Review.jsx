import { Star, ThumbsUp, Flag, User } from 'lucide-react'
import { useState } from 'react'
import Rating from './Rating'

export default function Review({ 
  review, 
  onHelpful, 
  onReport, 
  showActions = true,
  className = ''
}) {
  const [isHelpful, setIsHelpful] = useState(false)
  const [isReported, setIsReported] = useState(false)

  const handleHelpful = () => {
    if (isHelpful) return
    setIsHelpful(true)
    if (onHelpful) {
      onHelpful(review.id)
    }
  }

  const handleReport = () => {
    if (isReported) return
    setIsReported(true)
    if (onReport) {
      onReport(review.id)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {review.avatar ? (
              <img 
                src={review.avatar} 
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {review.name}
            </h4>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Rating value={review.rating} readonly size="small" />
              <span>•</span>
              <span>{formatDate(review.date)}</span>
            </div>
          </div>
        </div>
        
        {review.verified && (
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
            Verified Purchase
          </span>
        )}
      </div>

      {/* Review Content */}
      <div className="mb-4">
        {review.title && (
          <h5 className="font-medium text-gray-900 dark:text-white mb-2">
            {review.title}
          </h5>
        )}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {review.content}
        </p>
      </div>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review image ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      )}

      {/* Review Actions */}
      {showActions && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={handleHelpful}
              disabled={isHelpful}
              className={`flex items-center gap-1 text-sm transition-colors ${
                isHelpful
                  ? 'text-green-600 cursor-default'
                  : 'text-gray-500 dark:text-gray-400 hover:text-green-600'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful})</span>
            </button>
            
            <button
              onClick={handleReport}
              disabled={isReported}
              className={`flex items-center gap-1 text-sm transition-colors ${
                isReported
                  ? 'text-red-600 cursor-default'
                  : 'text-gray-500 dark:text-gray-400 hover:text-red-600'
              }`}
            >
              <Flag className="w-4 h-4" />
              <span>{isReported ? 'Reported' : 'Report'}</span>
            </button>
          </div>
          
          {review.response && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">Response from Utamu wa Miwa</span>
            </div>
          )}
        </div>
      )}

      {/* Business Response */}
      {review.response && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">U</span>
            </div>
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Utamu wa Miwa Response
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {review.response}
          </p>
        </div>
      )}
    </div>
  )
}
