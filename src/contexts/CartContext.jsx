import { createContext, useContext, useReducer, useEffect } from 'react'
import { getPriceInTZS, formatPrice, formatPriceForWhatsApp } from '../utils/currency'

// Cart context for managing shopping cart state
const CartContext = createContext()

// Action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_CART: 'SET_CART',
  ADD_ORDER_NOTE: 'ADD_ORDER_NOTE',
  SET_DELIVERY_INFO: 'SET_DELIVERY_INFO'
}

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  orderNote: '',
  deliveryInfo: {
    name: '',
    phone: '',
    address: '',
    deliveryType: 'pickup', // 'pickup' or 'delivery'
    scheduledTime: ''
  },
  isOpen: false
}

// Calculate totals
const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = item.price || 0
    return sum + (itemPrice * item.quantity)
  }, 0)
  return { totalItems, totalPrice }
}

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity, size, price } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && item.size === size
      )

      let newItems
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item
        newItems = [...state.items, {
          id: product.id,
          nameKey: product.nameKey,
          size,
          price,
          quantity,
          image: product.image,
          categoryKey: product.categoryKey
        }]
      }

      const { totalItems, totalPrice } = calculateTotals(newItems)
      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { productId, size } = action.payload
      const newItems = state.items.filter(
        item => !(item.id === productId && item.size === size)
      )
      const { totalItems, totalPrice } = calculateTotals(newItems)
      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      }
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, size, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, {
          type: CART_ACTIONS.REMOVE_ITEM,
          payload: { productId, size }
        })
      }

      const newItems = state.items.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
      const { totalItems, totalPrice } = calculateTotals(newItems)
      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      }
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
        orderNote: '',
        deliveryInfo: initialState.deliveryInfo
      }

    case CART_ACTIONS.SET_CART:
      return { ...state, ...action.payload }

    case CART_ACTIONS.ADD_ORDER_NOTE:
      return {
        ...state,
        orderNote: action.payload
      }

    case CART_ACTIONS.SET_DELIVERY_INFO:
      return {
        ...state,
        deliveryInfo: {
          ...state.deliveryInfo,
          ...action.payload
        }
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      }

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true
      }

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      }

    default:
      return state
  }
}

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('utamu_cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({
          type: CART_ACTIONS.SET_CART,
          payload: { ...parsedCart, isOpen: false }
        })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartToSave = {
      items: state.items,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice,
      orderNote: state.orderNote,
      deliveryInfo: state.deliveryInfo
    }
    localStorage.setItem('utamu_cart', JSON.stringify(cartToSave))
  }, [state.items, state.totalItems, state.totalPrice, state.orderNote, state.deliveryInfo])

  // Cart actions
  const addToCart = (product, quantity = 1, size = 'medium') => {
    const price = getPriceInTZS(size)
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, size, price }
    })
  }

  const removeFromCart = (productId, size) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { productId, size }
    })
  }

  const updateQuantity = (productId, size, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId, size, quantity }
    })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const addOrderNote = (note) => {
    dispatch({
      type: CART_ACTIONS.ADD_ORDER_NOTE,
      payload: note
    })
  }

  const setDeliveryInfo = (info) => {
    dispatch({
      type: CART_ACTIONS.SET_DELIVERY_INFO,
      payload: info
    })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' })
  }

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  // Generate WhatsApp order message
  const generateWhatsAppMessage = () => {
    if (state.items.length === 0) return ''

    let message = '🥤 *New Order - Utamu wa Miwa*\n\n'
    message += `📝 *Order Details:*\n`
    
    state.items.forEach((item, index) => {
      const priceCategory = item.size === 'small' ? '500 TZS' : item.size === 'medium' ? '1,000 TZS' : '4,000 TZS'
      const sizeLabel = item.size === 'small' ? 'Small Glass' : item.size === 'medium' ? 'Medium Glass' : 'Large Bottle'
      message += `\n${index + 1}. *${item.nameKey}*\n`
      message += `   Size: ${sizeLabel}\n`
      message += `   Price Category: ${priceCategory}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Unit Price: ${formatPriceForWhatsApp(item.price)}\n`
      message += `   Subtotal: ${formatPriceForWhatsApp(item.price * item.quantity)}\n`
    })

    message += `\n💰 *Total: ${formatPriceForWhatsApp(state.totalPrice)}*\n`
    message += `📦 *Total Items: ${state.totalItems}*\n`

    if (state.orderNote) {
      message += `\n📝 *Order Note:*\n${state.orderNote}\n`
    }

    message += `\n👤 *Customer Information:*\n`
    message += `Name: ${state.deliveryInfo.name || 'Not provided'}\n`
    message += `Phone: ${state.deliveryInfo.phone || 'Not provided'}\n`

    if (state.deliveryInfo.deliveryType === 'delivery') {
      message += `🏠 *Delivery Address:*\n${state.deliveryInfo.address || 'Not provided'}\n`
      if (state.deliveryInfo.scheduledTime) {
        message += `⏰ *Scheduled Time:* ${state.deliveryInfo.scheduledTime}\n`
      }
    } else {
      message += `🏪 *Pickup Order*\n`
      if (state.deliveryInfo.scheduledTime) {
        message += `⏰ *Pickup Time:* ${state.deliveryInfo.scheduledTime}\n`
      }
    }

    message += `\n🙏 Thank you for your order!`

    return encodeURIComponent(message)
  }

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addOrderNote,
    setDeliveryInfo,
    toggleCart,
    openCart,
    closeCart,
    generateWhatsAppMessage
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
