import { useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingCart as ShoppingCartIcon, Clock, MapPin, User, Phone } from 'lucide-react'
import { WhatsAppIcon } from './BrandIcons'
import { useCart } from '../contexts/CartContext'
import { useLanguage } from '../contexts/LanguageContext'
import { formatPrice } from '../utils/currency'

export default function ShoppingCart() {
  const { t, language } = useLanguage()
  const {
    items,
    totalItems,
    totalPrice,
    orderNote,
    deliveryInfo,
    isOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    addOrderNote,
    setDeliveryInfo,
    closeCart,
    generateWhatsAppMessage
  } = useCart()

  const [showCheckout, setShowCheckout] = useState(false)

  if (!isOpen) return null

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/255718622621?text=${message}`
    window.open(whatsappUrl, '_blank')
    clearCart()
    closeCart()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Cart sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <ShoppingCartIcon className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('cart.title')} ({totalItems})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingCartIcon className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('cart.empty')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {t('cart.emptyDescription')}
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                {t('cart.continueShopping')}
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="p-4 space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <img
                      src={item.image}
                      alt={t(item.nameKey)}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t(item.nameKey)}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t(item.categoryKey)}
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        {formatPrice(item.price, language)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order note */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t('cart.orderNote')}
                </label>
                <textarea
                  value={orderNote}
                  onChange={(e) => addOrderNote(e.target.value)}
                  placeholder={t('cart.orderNotePlaceholder')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Delivery information */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  {t('cart.deliveryInfo')}
                </h3>
                
                {/* Delivery type */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setDeliveryInfo({ deliveryType: 'pickup' })}
                    className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                      deliveryInfo.deliveryType === 'pickup'
                        ? 'border-green-500 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    🏪 {t('cart.pickup')}
                  </button>
                  <button
                    onClick={() => setDeliveryInfo({ deliveryType: 'delivery' })}
                    className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                      deliveryInfo.deliveryType === 'delivery'
                        ? 'border-green-500 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    🏠 {t('cart.delivery')}
                  </button>
                </div>

                {/* Customer info */}
                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo({ name: e.target.value })}
                      placeholder={t('cart.namePlaceholder')}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ phone: e.target.value })}
                      placeholder={t('cart.phonePlaceholder')}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  {deliveryInfo.deliveryType === 'delivery' && (
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={deliveryInfo.address}
                        onChange={(e) => setDeliveryInfo({ address: e.target.value })}
                        placeholder={t('cart.addressPlaceholder')}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={deliveryInfo.scheduledTime}
                      onChange={(e) => setDeliveryInfo({ scheduledTime: e.target.value })}
                      placeholder={t('cart.timePlaceholder')}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('cart.total')}
              </span>
              <span className="text-xl font-bold text-green-600">
                {formatPrice(totalPrice, language)}
              </span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {t('cart.clear')}
              </button>
              <button
                onClick={handleWhatsAppOrder}
                disabled={!deliveryInfo.name || !deliveryInfo.phone}
                className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                {t('cart.orderWhatsApp')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
