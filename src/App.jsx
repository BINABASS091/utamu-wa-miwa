import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import About from './pages/About'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

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
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
