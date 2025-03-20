"use client"

import { useContext, useState, useEffect } from "react"
import "../styles/PropertyMatch.css"
import PropertyCard from "./PropertyCard"
import { AppContext } from "../App"

const PropertyMatch = () => {
  const { openPropertyModal } = useContext(AppContext)
  const [activeImage, setActiveImage] = useState(0)

  const featuredProperty = {
    id: 1,
    price: "$930,000",
    address: "789 Eastwood Street",
    location: "Los Angeles, CA 90210",
    beds: 3,
    baths: 2,
    sqft: "2,225",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "This stunning modern home features an open floor plan, high ceilings, and abundant natural light. The gourmet kitchen includes top-of-the-line appliances and a large island perfect for entertaining.",
    amenities: ["Swimming Pool", "Garden", "Garage", "Air Conditioning", "Security System"],
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400&text=Interior",
      "/placeholder.svg?height=300&width=400&text=Kitchen",
      "/placeholder.svg?height=300&width=400&text=Bedroom",
    ],
  }

  const propertyImages = [
    {
      id: 2,
      image: "/placeholder.svg?height=200&width=300&text=Modern Kitchen",
      title: "Modern Kitchen",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=200&width=300&text=Luxury Bathroom",
      title: "Luxury Bathroom",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=200&width=300&text=Spacious Living Room",
      title: "Spacious Living Room",
    },
  ]

  // Auto rotate featured images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % featuredProperty.images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredProperty.images.length])

  return (
    <section className="property-match" id="properties">
      <div className="property-match-container">
        <div className="property-match-header">
          <div>
            <h2>Discover Your Perfect</h2>
            <h2 className="highlight">Property Match</h2>
          </div>
          <p>
            Discover Your Perfect Property Match with our expert team, dedicated to finding the ideal home or
            investment. A residential, cozy hideaway, or a commercial space - we've got you covered. Our extensive
            portfolio and local market expertise allow us to find the perfect match for your needs.
          </p>
        </div>

        <div className="property-grid">
          <div className="featured-property">
            <PropertyCard
              property={featuredProperty}
              featured={true}
              activeImage={activeImage}
              onImageClick={() => openPropertyModal(featuredProperty)}
            />

            {/* Image indicators */}
            <div className="image-indicators">
              {featuredProperty.images.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${activeImage === index ? "active" : ""}`}
                  onClick={() => setActiveImage(index)}
                ></span>
              ))}
            </div>
          </div>

          <div className="property-images">
            {propertyImages.map((image, index) => (
              <div
                key={index}
                className="property-image-container"
                onClick={() =>
                  openPropertyModal({
                    ...featuredProperty,
                    id: image.id,
                    image: image.image,
                    title: image.title,
                  })
                }
              >
                <img src={image.image || "/placeholder.svg"} alt={image.title} className="property-image" />
                <div className="image-overlay">
                  <h3>{image.title}</h3>
                  <button className="view-details">View Details</button>
                </div>
                <button className="favorite-btn">♡</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyMatch

