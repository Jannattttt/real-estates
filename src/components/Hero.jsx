"use client"

import { useState } from "react"
import "../styles/Hero.css"
import image1 from "../assets/home1.jpg"

const Hero = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    // Simulate search functionality
    console.log("Searching for:", searchQuery)
    alert(`Searching for properties in: ${searchQuery}`)
    setSearchQuery("")
    setIsSearchOpen(false)
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 className="animate-in">Find Your Dream Home Today</h1>
        <p className="animate-in delay-1">
          Browse our wide range of properties where your dream home awaits. Our team is ready to help you find the
          perfect property for you.
        </p>
        <div className="hero-buttons animate-in delay-2">
          <button
            className="btn-primary"
            onClick={() => document.getElementById("properties").scrollIntoView({ behavior: "smooth" })}
          >
            View Properties
          </button>
          <button
            className="btn-secondary"
            onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </button>
        </div>

        {/* Quick search */}
        <div className={`quick-search ${isSearchOpen ? "open" : ""}`}>
          {isSearchOpen ? (
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Enter city, zip code or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit">Search</button>
              <button type="button" className="close-search" onClick={() => setIsSearchOpen(false)}>
                ✕
              </button>
            </form>
          ) : (
            <button className="search-trigger" onClick={() => setIsSearchOpen(true)}>
              Quick Search 🔍
            </button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        onClick={() => document.getElementById("stats").scrollIntoView({ behavior: "smooth" })}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div>
          <span className="arrow-down"></span>
        </div>
      </div>
    </section>
  )
}

export default Hero

