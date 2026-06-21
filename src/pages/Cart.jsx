import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingCart as ShoppingCartIcon, Clock, MapPin, User, Phone, ArrowLeft } from 'lucide-react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { useCart } from '../contexts/CartContext'
import { useLanguage } from '../contexts/LanguageContext'
import { formatPrice } from '../utils/currency'

export default function Cart() {
  const { t, language } = useLanguage()
  const {
    items,
    totalItems,
    totalPrice,
    orderNote,
    deliveryInfo,
    removeFromCart,
    updateQuantity,
    clearCart,
    addOrderNote,
    setDeliveryInfo,
    generateWhatsAppMessage
  } = useCart()

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/255718622621?text=${message}`
    window.open(whatsappUrl, '_blank')
    clearCart()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/menu"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <div className="flex items-center gap-3">
              <ShoppingCartIcon className="w-6 h-6 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('cart.title')} ({totalItems})
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Cart content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 text-center">
            <ShoppingCartIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cart.empty')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
              {t('cart.emptyDescription')}
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('cart.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items and forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart items */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('cart.items')}
                </h2>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <img
                        src={item.image}
                        alt={t(item.nameKey)}
                        className="w-24 h-24 object-cover rounded-lg"
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
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order note */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t('cart.orderNote')}
                </label>
                <textarea
                  value={orderNote}
                  onChange={(e) => addOrderNote(e.target.value)}
                  placeholder={t('cart.orderNotePlaceholder')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Delivery information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('cart.deliveryInfo')}
                </h2>
                
                {/* Delivery type */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setDeliveryInfo({ deliveryType: 'pickup' })}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                      deliveryInfo.deliveryType === 'pickup'
                        ? 'border-green-500 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    🏪 {t('cart.pickup')}
                  </button>
                  <button
                    onClick={() => setDeliveryInfo({ deliveryType: 'delivery' })}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                      deliveryInfo.deliveryType === 'delivery'
                        ? 'border-green-500 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    🏠 {t('cart.delivery')}
                  </button>
                </div>

                {/* Customer info */}
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo({ name: e.target.value })}
                      placeholder={t('cart.namePlaceholder')}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ phone: e.target.value })}
                      placeholder={t('cart.phonePlaceholder')}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('cart.orderSummary')}
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t('cart.subtotal')} ({totalItems} {t('cart.items')})
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatPrice(totalPrice, language)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t('cart.delivery')}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {deliveryInfo.deliveryType === 'delivery' ? formatPrice(2000, language) : t('cart.free')}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t('cart.total')}
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        {formatPrice(
                          totalPrice + (deliveryInfo.deliveryType === 'delivery' ? 2000 : 0), 
                          language
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={clearCart}
                    className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {t('cart.clear')}
                  </button>
                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={!deliveryInfo.name || !deliveryInfo.phone}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    {t('cart.orderWhatsApp')}
                  </button>
                  <Link
                    to="/menu"
                    className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
