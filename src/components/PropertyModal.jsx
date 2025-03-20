"use client"

import { useState, useContext, useEffect } from "react"
import "../styles/PropertyModal.css"
import { AppContext } from "../App"

const PropertyModal = ({ property, onClose }) => {
  const { favorites, toggleFavorite } = useContext(AppContext)
  const [activeTab, setActiveTab] = useState("details")
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const isFavorite = favorites.includes(property.id)

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  // Create an array of images if not provided
  const images = property.images || [property.image, property.image, property.image]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="property-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          {/* Image gallery */}
          <div className="modal-gallery">
            <div className="main-image-container">
              <img src={images[activeImageIndex] || "/placeholder.svg"} alt={property.address} className="main-image" />
              <button
                className={`favorite-btn ${isFavorite ? "active" : ""}`}
                onClick={() => toggleFavorite(property.id)}
              >
                {isFavorite ? "♥" : "♡"}
              </button>

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    className="gallery-nav prev"
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  >
                    &#10094;
                  </button>
                  <button
                    className="gallery-nav next"
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                  >
                    &#10095;
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="thumbnails">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${activeImageIndex === index ? "active" : ""}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={img || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property information */}
          <div className="modal-info">
            <div className="property-header">
              <h2>{property.address}</h2>
              <div className="property-price">{property.price}</div>
            </div>
            <p className="property-location">{property.location}</p>

            <div className="property-specs modal-specs">
              <div className="spec">
                <span className="spec-value">{property.sqft}</span>
                <span className="spec-label">Sq. Ft.</span>
              </div>
              <div className="spec">
                <span className="spec-value">{property.beds}</span>
                <span className="spec-label">Beds</span>
              </div>
              <div className="spec">
                <span className="spec-value">{property.baths}</span>
                <span className="spec-label">Baths</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="modal-tabs">
              <button
                className={`modal-tab ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`modal-tab ${activeTab === "amenities" ? "active" : ""}`}
                onClick={() => setActiveTab("amenities")}
              >
                Amenities
              </button>
              <button
                className={`modal-tab ${activeTab === "contact" ? "active" : ""}`}
                onClick={() => setActiveTab("contact")}
              >
                Contact Agent
              </button>
            </div>

            {/* Tab content */}
            <div className="tab-content">
              {activeTab === "details" && (
                <div className="details-tab">
                  <p>{property.description || "No description available."}</p>
                  <div className="property-features">
                    <h3>Features</h3>
                    <ul>
                      <li>Year Built: 2018</li>
                      <li>Lot Size: 0.25 acres</li>
                      <li>Heating: Central</li>
                      <li>Cooling: Central A/C</li>
                      <li>Parking: 2-Car Garage</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "amenities" && (
                <div className="amenities-tab">
                  <h3>Amenities</h3>
                  <ul className="amenities-list">
                    {property.amenities && property.amenities.length > 0 ? (
                      property.amenities.map((amenity, index) => <li key={index}>{amenity}</li>)
                    ) : (
                      <>
                        <li>Swimming Pool</li>
                        <li>Garden</li>
                        <li>Garage</li>
                        <li>Air Conditioning</li>
                        <li>Security System</li>
                        <li>Hardwood Floors</li>
                        <li>Fireplace</li>
                        <li>Walk-in Closet</li>
                      </>
                    )}
                  </ul>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="contact-tab">
                  <h3>Contact Agent</h3>
                  <div className="agent-info">
                    <img src="/placeholder.svg?height=80&width=80&text=Agent" alt="Agent" className="agent-photo" />
                    <div>
                      <h4>John Smith</h4>
                      <p>Senior Real Estate Agent</p>
                      <p>License #: 12345678</p>
                      <p>Phone: (555) 123-4567</p>
                      <p>Email: john@housify.com</p>
                    </div>
                  </div>

                  <form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input type="text" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Your Email</label>
                      <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Your Phone</label>
                      <input type="tel" id="phone" placeholder="Enter your phone number" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        rows="4"
                        placeholder="I'm interested in this property and would like to schedule a viewing."
                      ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="modal-actions">
              <button className="action-btn primary">Schedule a Viewing</button>
              <button className="action-btn secondary">Request More Info</button>
              <button
                className={`action-btn favorite ${isFavorite ? "active" : ""}`}
                onClick={() => toggleFavorite(property.id)}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyModal

