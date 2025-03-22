"use client"

import { useState, useRef, useEffect } from "react"
import "../styles/Contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  })

  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeOffice, setActiveOffice] = useState(0)

  const formRef = useRef(null)
  const sectionRef = useRef(null)

  // Animate section when in view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const animateSection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(animateSection, options)

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const offices = [
    {
      name: "Los Angeles Office",
      address: "123 Real Estate Blvd, Los Angeles, CA 90001",
      phone: "+1 (555) 123-4567",
      email: "la@behomed.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      mapUrl: "/placeholder.svg?height=200&width=400&text=Los+Angeles+Office+Map",
    },
    {
      name: "New York Office",
      address: "456 Property Ave, New York, NY 10001",
      phone: "+1 (555) 987-6543",
      email: "ny@behomed.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      mapUrl: "/placeholder.svg?height=200&width=400&text=New+York+Office+Map",
    },
    {
      name: "Miami Office",
      address: "789 Beach Drive, Miami, FL 33101",
      phone: "+1 (555) 456-7890",
      email: "miami@behomed.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      mapUrl: "/placeholder.svg?height=200&width=400&text=Miami+Office+Map",
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (formData.phone && !/^\+?[0-9\s\-()]+$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters"
    }

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)

      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0]
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
      if (errorElement) {
        errorElement.focus()
      }

      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        })
      }, 5000)
    }, 1500)
  }

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-header">
          <h2>
            Get In <span className="highlight">Touch</span>
          </h2>
          <p>
            Have questions about our properties or services? Fill out the form below and our team will get back to you
            as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={formErrors.name ? "error" : ""}
                    />
                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={formErrors.email ? "error" : ""}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Your Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={formErrors.phone ? "error" : ""}
                    />
                    {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Property Viewing">Property Viewing</option>
                      <option value="Selling Property">Selling Property</option>
                      <option value="Renting Property">Renting Property</option>
                      <option value="Career Opportunity">Career Opportunity</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={formErrors.message ? "error" : ""}
                  ></textarea>
                  {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                </div>

                <button
                  type="submit"
                  className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="contact-info">
            <div className="office-tabs">
              {offices.map((office, index) => (
                <button
                  key={index}
                  className={`office-tab ${activeOffice === index ? "active" : ""}`}
                  onClick={() => setActiveOffice(index)}
                >
                  {office.name}
                </button>
              ))}
            </div>

            <div className="office-details">
              <div className="office-map">
                <img src={offices[activeOffice].mapUrl || "/placeholder.svg"} alt="Office location map" />
              </div>

              <div className="office-contact">
                <div className="contact-item">
                  <div className="icon">📍</div>
                  <div>
                    <h4>Address</h4>
                    <p>{offices[activeOffice].address}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>{offices[activeOffice].phone}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="icon">✉️</div>
                  <div>
                    <h4>Email</h4>
                    <p>{offices[activeOffice].email}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="icon">🕒</div>
                  <div>
                    <h4>Working Hours</h4>
                    <p>{offices[activeOffice].hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

