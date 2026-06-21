import { createContext, useContext, useReducer, useEffect } from 'react'
import { getPriceInTZS, formatPrice, formatPriceForWhatsApp } from '../utils/currency'

const CartContext = createContext()

const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_CART: 'SET_CART',
  ADD_ORDER_NOTE: 'ADD_ORDER_NOTE',
  SET_DELIVERY_INFO: 'SET_DELIVERY_INFO'
}

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  orderNote: '',
  deliveryInfo: {
    name: '',
    phone: '',
    address: '',
    deliveryType: 'pickup',
    scheduledTime: ''
  },
  isOpen: false
}

const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = item.price || 0
    return sum + (itemPrice * item.quantity)
  }, 0)
  return { totalItems, totalPrice }
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity, size, price } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && item.size === size
      )

      let newItems
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
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

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

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
      }
    }
  }, [])

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

  const addToCart = (product, quantity = 1, size = 'small') => {
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

  const generateWhatsAppMessage = () => {
    if (state.items.length === 0) return ''

    let message = '\U0001f944 *New Order - Utamu wa Miwa*\n\n'
    message += '\U0001f4dd *Order Details:*\n'
    
    state.items.forEach((item, index) => {
      const price = getPriceInTZS(item.size)
      const priceCategory = formatPriceForWhatsApp(price)
      message += `\n${index + 1}. *${item.nameKey}*\n`
      message += `   Size: ${item.size}\n`
      message += `   Price: ${priceCategory}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Unit Price: ${formatPriceForWhatsApp(item.price)}\n`
      message += `   Subtotal: ${formatPriceForWhatsApp(item.price * item.quantity)}\n`
    })

    message += `\n\U0001f4b0 *Total: ${formatPriceForWhatsApp(state.totalPrice)}*\n`
    message += `\U0001f4e6 *Total Items: ${state.totalItems}*\n`

    if (state.orderNote) {
      message += `\n\U0001f4dd *Order Note:*\n${state.orderNote}\n`
    }

    message += `\n\U0001f464 *Customer Information:*\n`
    message += `Name: ${state.deliveryInfo.name || 'Not provided'}\n`
    message += `Phone: ${state.deliveryInfo.phone || 'Not provided'}\n`

    if (state.deliveryInfo.deliveryType === 'delivery') {
      message += `\U0001f3e0 *Delivery Address:*\n${state.deliveryInfo.address || 'Not provided'}\n`
      if (state.deliveryInfo.scheduledTime) {
        message += `\u23f0 *Scheduled Time:* ${state.deliveryInfo.scheduledTime}\n`
      }
    } else {
      message += `\U0001f3ea *Pickup Order*\n`
      if (state.deliveryInfo.scheduledTime) {
        message += `\u23f0 *Pickup Time:* ${state.deliveryInfo.scheduledTime}\n`
      }
    }

    message += `\n\U0001f64f Thank you for your order!`

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

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
