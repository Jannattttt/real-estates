"use client"

import { useState, useContext, useEffect } from "react"
import "../styles/PropertyShowcase.css"
import PropertyCard from "./PropertyCard"
import { AppContext } from "../App"

const PropertyShowcase = () => {
  const { openPropertyModal } = useContext(AppContext)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProperties, setFilteredProperties] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const allProperties = [
    {
      id: 5,
      price: "$850,000",
      address: "123 Main Street",
      location: "Atlanta, GA",
      beds: 3,
      baths: 2,
      sqft: "2,100",
      image: "/placeholder.svg?height=250&width=350",
      type: "sale",
      description:
        "Beautiful family home in a quiet neighborhood with excellent schools nearby. Features a spacious backyard and updated kitchen.",
      amenities: ["Backyard", "Garage", "Fireplace", "Central Heating"],
    },
    {
      id: 6,
      price: "$1,250,000",
      address: "456 Ocean Avenue",
      location: "San Francisco, CA",
      beds: 4,
      baths: 3,
      sqft: "2,725",
      image: "/placeholder.svg?height=250&width=350",
      type: "sale",
      description:
        "Luxurious home with stunning ocean views. This property features high-end finishes, a gourmet kitchen, and a private terrace.",
      amenities: ["Ocean View", "Terrace", "Smart Home", "Wine Cellar"],
    },
    {
      id: 7,
      price: "$975,000",
      address: "789 Park Boulevard",
      location: "Boston, MA",
      beds: 3,
      baths: 2,
      sqft: "2,150",
      image: "/placeholder.svg?height=250&width=350",
      type: "sale",
      description:
        "Charming brownstone in a historic district. Features original hardwood floors, high ceilings, and a renovated kitchen.",
      amenities: ["Historic Building", "Hardwood Floors", "Renovated Kitchen"],
    },
    {
      id: 8,
      price: "$3,500/mo",
      address: "101 Downtown Lofts",
      location: "Chicago, IL",
      beds: 2,
      baths: 2,
      sqft: "1,800",
      image: "/placeholder.svg?height=250&width=350",
      type: "rent",
      description:
        "Modern loft in the heart of downtown with floor-to-ceiling windows, exposed brick walls, and industrial-chic design.",
      amenities: ["Gym", "Rooftop Deck", "Concierge", "Pet Friendly"],
    },
    {
      id: 9,
      price: "$2,800/mo",
      address: "202 Riverside Drive",
      location: "New York, NY",
      beds: 1,
      baths: 1,
      sqft: "950",
      image: "/placeholder.svg?height=250&width=350",
      type: "rent",
      description: "Cozy apartment with river views, recently renovated with modern appliances and in-unit laundry.",
      amenities: ["River View", "In-unit Laundry", "Doorman", "Elevator"],
    },
    {
      id: 10,
      price: "$750,000",
      address: "303 Mountain View",
      location: "Denver, CO",
      beds: 3,
      baths: 2,
      sqft: "2,000",
      image: "/placeholder.svg?height=250&width=350",
      type: "sold",
      description:
        "SOLD: Mountain retreat with breathtaking views, large windows, and an open floor plan perfect for entertaining.",
      amenities: ["Mountain View", "Fireplace", "Deck", "Home Office"],
    },
  ]

  // Filter properties based on active tab and search query
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      let filtered = [...allProperties]

      // Filter by tab
      if (activeTab !== "all") {
        filtered = filtered.filter((property) => property.type === activeTab)
      }

      // Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          (property) =>
            property.location.toLowerCase().includes(query) || property.address.toLowerCase().includes(query),
        )
      }

      setFilteredProperties(filtered)
      setIsLoading(false)
    }, 500)
  }, [activeTab, searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }

  return (
    <section className="property-showcase" id="services">
      <h2>Property Showcase</h2>

      <div className="showcase-tabs">
        <div className="tabs">
          <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All
          </button>
          <button className={`tab ${activeTab === "rent" ? "active" : ""}`} onClick={() => setActiveTab("rent")}>
            Rent
          </button>
          <button className={`tab ${activeTab === "sale" ? "active" : ""}`} onClick={() => setActiveTab("sale")}>
            Buy
          </button>
          <button className={`tab ${activeTab === "sold" ? "active" : ""}`} onClick={() => setActiveTab("sold")}>
            Sold
          </button>
        </div>
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="City, Zip or State"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading properties...</p>
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="properties-grid">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} onImageClick={() => openPropertyModal(property)} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No properties found matching your criteria.</p>
          <button
            onClick={() => {
              setActiveTab("all")
              setSearchQuery("")
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      <div className="pagination">
        <span className="page active">1</span>
        <span className="page">2</span>
        <span className="page">3</span>
        <span className="page">4</span>
        <span className="page">5</span>
      </div>
    </section>
  )
}

export default PropertyShowcase

