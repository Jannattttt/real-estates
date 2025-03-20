"use client"

import { useRef, useEffect } from "react"
import "../styles/AboutUs.css"

const AboutUs = () => {
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

  return (
    <section className="about-us" id="about" ref={sectionRef}>
      <div className="about-us-container">
        <div className="about-us-content">
          <h2>
            About <span className="highlight">Us</span>
          </h2>
          <p>
            HOUSIFY finds dream properties in the world of real estate. We specialize in residential and commercial
            property selling, and property management in the most desired cities across California, New York, and
            beyond.
          </p>
          <p>
            Our team specializes in finding the perfect homes and commercial properties for our clients. We believe that
            every property has a story, and every client has unique requirements. Our team of experienced agents is
            committed to guiding you through every step of the process, from the initial consultation to the final
            closing. We pride ourselves on our ability to transform your expectations with transparency,
            professionalism, and attention to detail.
          </p>

          {/* Team members */}
          <div className="team-preview">
            <h3>Meet Our Team</h3>
            <div className="team-avatars">
              <div className="avatar">
                <img src="/placeholder.svg?height=60&width=60&text=JD" alt="Team Member" />
                <span>John Doe</span>
              </div>
              <div className="avatar">
                <img src="/placeholder.svg?height=60&width=60&text=JS" alt="Team Member" />
                <span>Jane Smith</span>
              </div>
              <div className="avatar">
                <img src="/placeholder.svg?height=60&width=60&text=RJ" alt="Team Member" />
                <span>Robert Johnson</span>
              </div>
              <button className="more-team">+12 more</button>
            </div>
          </div>
        </div>
        <div className="about-us-image">
          <img src="/placeholder.svg?height=400&width=500" alt="Real estate agents with clients" />
        </div>
      </div>
    </section>
  )
}

export default AboutUs

