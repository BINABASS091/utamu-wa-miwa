import { Star } from 'lucide-react'
import { useState } from 'react'

export default function Rating({ 
  value = 0, 
  onChange, 
  readonly = false, 
  size = 'medium',
  showValue = false,
  className = ''
}) {
  const [hoverValue, setHoverValue] = useState(0)
  const [internalValue, setInternalValue] = useState(value)

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  }

  const currentSize = sizeClasses[size] || sizeClasses.medium

  const handleClick = (rating) => {
    if (readonly) return
    
    const newValue = rating === internalValue ? 0 : rating
    setInternalValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleMouseEnter = (rating) => {
    if (readonly) return
    setHoverValue(rating)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setHoverValue(0)
  }

  const displayValue = hoverValue || internalValue

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            className={`${
              readonly ? 'cursor-default' : 'cursor-pointer'
            } transition-colors duration-200 ${
              star <= displayValue
                ? 'text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            } ${!readonly ? 'hover:text-yellow-400' : ''}`}
            aria-label={`Rate ${star} stars`}
          >
            <Star 
              className={`${currentSize} ${
                star <= displayValue ? 'fill-current' : ''
              }`}
            />
          </button>
        ))}
      </div>
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {internalValue.toFixed(1)}
        </span>
      )}
    </div>
  )
}
