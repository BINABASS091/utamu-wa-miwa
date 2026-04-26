import { ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

export default function CartIcon() {
  const { totalItems, openCart } = useCart()

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  )
}
