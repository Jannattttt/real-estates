"use client"

import { useContext, useState } from "react"
import "../styles/PropertyCard.css"
import { AppContext } from "../App"

const PropertyCard = ({ property, featured = false, activeImage = 0, onImageClick }) => {
  const { favorites, toggleFavorite, openPropertyModal } = useContext(AppContext)
  const [isHovered, setIsHovered] = useState(false)

  const isFavorite = favorites.includes(property.id)

  // Use the active image if it's a featured property with multiple images
  const displayImage = featured && property.images ? property.images[activeImage] : property.image

  return (
    <div
      className={`property-card ${featured ? "featured" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="property-image-wrapper"
        onClick={() => (onImageClick ? onImageClick() : openPropertyModal(property))}
      >
        <img src={displayImage || "/placeholder.svg"} alt={property.address} className="property-img" />
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(property.id)
          }}
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        {/* Overlay with details button */}
        <div className={`image-overlay ${isHovered ? "visible" : ""}`}>
          <button className="view-details-btn">View Details</button>
        </div>
      </div>

      <div className="property-details">
        <div className="property-price">{property.price}</div>
        {featured && (
          <button className="info-btn" onClick={() => openPropertyModal(property)}>
            i
          </button>
        )}
        <div className="property-address">{property.address}</div>
        <div className="property-location">{property.location}</div>
        <div className="property-specs">
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
      </div>
    </div>
  )
}

export default PropertyCard

