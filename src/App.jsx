"use client"

import { useState, createContext } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import PropertyMatch from "./components/PropertyMatch"
import AboutUs from "./components/AboutUs"
import PropertyShowcase from "./components/PropertyShowcase"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import PropertyModal from "./components/PropertyModal"
import ScrollToTop from "./components/ScrollToTop"

// Create contexts for global state
export const AppContext = createContext(null)

function App() {
  // State for property modal
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // State for favorites
  const [favorites, setFavorites] = useState([])

  // Function to toggle favorites
  const toggleFavorite = (propertyId) => {
    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter((id) => id !== propertyId))
    } else {
      setFavorites([...favorites, propertyId])
    }
  }

  // Function to open property modal
  const openPropertyModal = (property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  // Function to close property modal
  const closePropertyModal = () => {
    setIsModalOpen(false)
    // Re-enable scrolling
    document.body.style.overflow = "auto"
  }

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        openPropertyModal,
        closePropertyModal,
      }}
    >
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <AboutUs />
          <PropertyMatch />
          <PropertyShowcase />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />

        {/* Property Modal */}
        {isModalOpen && selectedProperty && <PropertyModal property={selectedProperty} onClose={closePropertyModal} />}
      </div>
    </AppContext.Provider>
  )
}

export default App

