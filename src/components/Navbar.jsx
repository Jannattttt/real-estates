"use client"

import { useState, useEffect } from "react"
import "../styles/Navbar.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeModal, setActiveModal] = useState(null)

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown")) {
        setIsDropdownOpen(false)
      }

      if (activeModal && !event.target.closest(".modal-content") && !event.target.closest(".dropdown-menu li")) {
        setActiveModal(null)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isDropdownOpen, activeModal])

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  // Handle dropdown item click
  const handleDropdownItemClick = (item) => {
    setActiveModal(item)
    setIsDropdownOpen(false)
  }

  // Close modal
  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          BEHOMED
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Navigation menu */}
        <ul className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
          <li className="nav-item" onClick={() => scrollToSection("about")}>
            About Us
          </li>
          <li className="nav-item" onClick={() => scrollToSection("properties")}>
            Properties
          </li>
          <li className="nav-item" onClick={() => scrollToSection("services")}>
            Services
          </li>
          <li
            className="nav-item dropdown"
            onClick={(e) => {
              e.stopPropagation()
              setIsDropdownOpen(!isDropdownOpen)
            }}
          >
            More
            <span className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}>▼</span>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => handleDropdownItemClick("testimonials")}>Testimonials</li>
                <li onClick={() => handleDropdownItemClick("blog")}>Blog</li>
                <li onClick={() => handleDropdownItemClick("careers")}>Careers</li>
                <li onClick={() => handleDropdownItemClick("faq")}>FAQ</li>
              </ul>
            )}
          </li>
        </ul>

        <button className="contact-btn pulse" onClick={() => scrollToSection("contact")}>
          Contact Us
        </button>
      </div>

      {/* Modal for dropdown items */}
      {activeModal && (
        <div className="nav-modal-overlay" onClick={closeModal}>
          <div className="nav-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              ✕
            </button>
            <div className="modal-content">
              {activeModal === "testimonials" && (
                <>
                  <h2>Client Testimonials</h2>
                  <div className="testimonials-container">
                    <div className="testimonial">
                      <div className="testimonial-avatar">
                        <img src="/placeholder.svg?height=60&width=60&text=JD" alt="John Doe" />
                      </div>
                      <div className="testimonial-content">
                        <h4>John Doe</h4>
                        <div className="stars">★★★★★</div>
                        <p>
                          "Housify helped me find my dream home in just two weeks! Their team was professional and
                          attentive to all my needs."
                        </p>
                      </div>
                    </div>
                    <div className="testimonial">
                      <div className="testimonial-avatar">
                        <img src="/placeholder.svg?height=60&width=60&text=SM" alt="Sarah Miller" />
                      </div>
                      <div className="testimonial-content">
                        <h4>Sarah Miller</h4>
                        <div className="stars">★★★★★</div>
                        <p>
                          "I sold my property through Housify and got a better price than I expected. Their marketing
                          strategy really works!"
                        </p>
                      </div>
                    </div>
                    <div className="testimonial">
                      <div className="testimonial-avatar">
                        <img src="/placeholder.svg?height=60&width=60&text=RJ" alt="Robert Johnson" />
                      </div>
                      <div className="testimonial-content">
                        <h4>Robert Johnson</h4>
                        <div className="stars">★★★★☆</div>
                        <p>
                          "Great experience working with the Housify team. They made the entire process smooth and
                          stress-free."
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeModal === "blog" && (
                <>
                  <h2>Latest Blog Posts</h2>
                  <div className="blog-posts">
                    <div className="blog-post">
                      <img src="/placeholder.svg?height=150&width=250&text=Real+Estate+Trends" alt="Blog post" />
                      <div className="blog-content">
                        <h3>2023 Real Estate Market Trends</h3>
                        <p className="blog-date">June 15, 2023</p>
                        <p>
                          Discover the latest trends shaping the real estate market in 2023 and how they might affect
                          your buying or selling decisions.
                        </p>
                        <a href="#" className="read-more">
                          Read More
                        </a>
                      </div>
                    </div>
                    <div className="blog-post">
                      <img src="/placeholder.svg?height=150&width=250&text=Home+Staging" alt="Blog post" />
                      <div className="blog-content">
                        <h3>Home Staging Tips That Sell</h3>
                        <p className="blog-date">May 28, 2023</p>
                        <p>
                          Learn how to stage your home effectively to attract more buyers and potentially increase your
                          property's selling price.
                        </p>
                        <a href="#" className="read-more">
                          Read More
                        </a>
                      </div>
                    </div>
                    <div className="blog-post">
                      <img src="/placeholder.svg?height=150&width=250&text=Investment+Guide" alt="Blog post" />
                      <div className="blog-content">
                        <h3>Beginner's Guide to Real Estate Investment</h3>
                        <p className="blog-date">April 10, 2023</p>
                        <p>
                          Everything you need to know to start investing in real estate, from financing options to
                          choosing the right properties.
                        </p>
                        <a href="#" className="read-more">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                  <button className="view-all-btn">View All Blog Posts</button>
                </>
              )}

              {activeModal === "careers" && (
                <>
                  <h2>Career Opportunities</h2>
                  <p className="careers-intro">
                    Join our team of dedicated professionals and build your career in real estate. We offer competitive
                    compensation, ongoing training, and a supportive work environment.
                  </p>

                  <div className="job-listings">
                    <div className="job-card">
                      <h3>Senior Real Estate Agent</h3>
                      <p className="job-location">Los Angeles, CA</p>
                      <ul className="job-requirements">
                        <li>5+ years of experience in real estate sales</li>
                        <li>Valid real estate license</li>
                        <li>Strong negotiation and communication skills</li>
                        <li>Proven track record of successful transactions</li>
                      </ul>
                      <button className="apply-btn">Apply Now</button>
                    </div>

                    <div className="job-card">
                      <h3>Marketing Specialist</h3>
                      <p className="job-location">New York, NY</p>
                      <ul className="job-requirements">
                        <li>3+ years of experience in real estate marketing</li>
                        <li>Proficiency in digital marketing tools</li>
                        <li>Experience with social media campaigns</li>
                        <li>Strong analytical and creative skills</li>
                      </ul>
                      <button className="apply-btn">Apply Now</button>
                    </div>

                    <div className="job-card">
                      <h3>Property Manager</h3>
                      <p className="job-location">Miami, FL</p>
                      <ul className="job-requirements">
                        <li>2+ years of property management experience</li>
                        <li>Knowledge of landlord-tenant laws</li>
                        <li>Strong organizational and problem-solving skills</li>
                        <li>Customer service orientation</li>
                      </ul>
                      <button className="apply-btn">Apply Now</button>
                    </div>
                  </div>
                </>
              )}

              {activeModal === "faq" && (
                <>
                  <h2>Frequently Asked Questions</h2>
                  <div className="faq-container">
                    <div className="faq-item">
                      <h3>What services does Housify offer?</h3>
                      <p>
                        Housify offers a comprehensive range of real estate services including buying, selling, renting,
                        and property management. Our team of experienced agents can guide you through every step of your
                        real estate journey.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h3>How do I schedule a property viewing?</h3>
                      <p>
                        You can schedule a property viewing by contacting us through our website, calling our office, or
                        clicking the "Schedule a Viewing" button on any property listing. One of our agents will get
                        back to you promptly to arrange a convenient time.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h3>What documents do I need to sell my property?</h3>
                      <p>
                        To sell your property, you'll typically need proof of ownership (deed), property tax
                        information, mortgage information, homeowners association documents (if applicable), and any
                        documentation related to renovations or repairs.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h3>How long does it take to sell a property?</h3>
                      <p>
                        The time it takes to sell a property varies depending on market conditions, property location,
                        pricing, and other factors. On average, properties listed with Housify sell within 30-60 days,
                        but we'll provide you with a more specific timeline based on your property's characteristics.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h3>What are the fees for selling a property?</h3>
                      <p>
                        Our standard commission is competitive with industry rates. We'll discuss all fees and costs
                        during our initial consultation, ensuring complete transparency throughout the process. There
                        are no hidden fees or surprises.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

