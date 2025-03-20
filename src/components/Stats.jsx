"use client"

import { useEffect, useRef } from "react"
import "../styles/Stats.css"

const Stats = () => {
  const statsRef = useRef(null)
  const countersRef = useRef([])

  // Animate counters when in view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const animateCounters = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate each counter
          countersRef.current.forEach((counter, index) => {
            const target = index === 0 ? 80 : index === 1 ? 500 : 2000
            const duration = 2000
            const step = Math.ceil(target / (duration / 30))
            let current = 0

            const timer = setInterval(() => {
              current += step
              if (current >= target) {
                counter.textContent = index === 0 ? "80+" : index === 1 ? "500+" : "2K+"
                clearInterval(timer)
              } else {
                counter.textContent = current + (index === 2 && current >= 1000 ? "+" : "")
              }
            }, 30)
          })

          // Unobserve after animation
          observer.unobserve(statsRef.current)
        }
      })
    }

    const observer = new IntersectionObserver(animateCounters, options)

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  return (
    <section className="stats" id="stats" ref={statsRef}>
      <div className="who-we-are">
        <h2>Who We Are?</h2>
        <p>We offer a range of services including buying, selling, and property management.</p>
        <button className="learn-more-btn">Learn More About Us</button>
      </div>
      <div className="stats-container">
        <div className="stat-item">
          <h3 ref={(el) => (countersRef.current[0] = el)}>0</h3>
          <p>Professional Agents</p>
        </div>
        <div className="stat-item">
          <h3 ref={(el) => (countersRef.current[1] = el)}>0</h3>
          <p>Properties Available</p>
        </div>
        <div className="stat-item">
          <h3 ref={(el) => (countersRef.current[2] = el)}>0</h3>
          <p>Happy Clients</p>
        </div>
      </div>
    </section>
  )
}

export default Stats

