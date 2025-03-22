"use client"

import { useState } from "react"
import "../styles/Footer.css"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 5000)
    } else {
      alert("Please enter a valid email address")
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">BEHOMED</div>

          {/* Newsletter subscription */}
          <div className="newsletter">
            <h3>Subscribe to our Newsletter</h3>
            {isSubscribed ? (
              <div className="success-message">Thank you for subscribing! You'll receive our latest updates soon.</div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Properties</h3>
            <ul>
              <li>Houses</li>
              <li>Apartments</li>
              <li>Commercial</li>
              <li>Land</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Services</h3>
            <ul>
              <li>Buying</li>
              <li>Selling</li>
              <li>Renting</li>
              <li>Property Management</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <ul>
              <li>info@behomed.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Real Estate Blvd</li>
              <li>Los Angeles, CA 90001</li>
            </ul>
          </div>
        </div>

        {/* Social media links */}
        <div className="social-links">
          <a href="#" className="social-icon">
            <i className="fab fa-facebook">f</i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-twitter">t</i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-instagram">i</i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-linkedin">in</i>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BEHOMED. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

