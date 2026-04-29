import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useCallback, Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import ShoppingCart from './components/ShoppingCart'
import { LanguageProvider } from './contexts/LanguageContext'
import { CartProvider } from './contexts/CartContext'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Menu = lazy(() => import('./pages/Menu'))
const Gallery = lazy(() => import('./pages/Gallery'))
const StoreLocator = lazy(() => import('./pages/StoreLocator'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleSplashDone = useCallback(() => setShowSplash(false), [])

  return (
    <LanguageProvider>
      <CartProvider>
        <>
          {showSplash && <SplashScreen onDone={handleSplashDone} />}
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              <main>
                <Routes>
                  <Route path="/" element={
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                      </div>
                    }>
                      <Home />
                    </Suspense>
                  } />
                  <Route path="/about" element={
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                      </div>
                    }>
                      <About />
                    </Suspense>
                  } />
                  <Route path="/menu" element={
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                      </div>
                    }>
                      <Menu />
                    </Suspense>
                  } />
                  <Route path="/gallery" element={
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                      </div>
                    }>
                      <Gallery />
                    </Suspense>
                  } />
                  <Route path="/store-locator" element={
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                      </div>
                    }>
                      <StoreLocator />
                    </Suspense>
                  } />
                  <Route path="/reviews" element={
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                      </div>
                    }>
                      <Reviews />
                    </Suspense>
                  } />
                  <Route path="/contact" element={
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                      </div>
                    }>
                      <Contact />
                    </Suspense>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
          <ShoppingCart />
        </>
      </CartProvider>
    </LanguageProvider>
  )
}

export default App
