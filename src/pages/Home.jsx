import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import SearchBar from '../components/SearchBar'
import TestimonialCard from '../components/TestimonialCard'
import CTABanner from '../components/CTABanner'
import Reveal from '../components/Reveal'
import { FEATURED_PROJECTS } from '../data/projects'
import { TESTIMONIALS } from '../data/testimonials'
import { WHATSAPP_URL } from '../utils/whatsapp'
import '../styles/Home.css'

const TRUST_BADGES = [
  { icon: '🛡️', title: 'Verified Projects', desc: 'All projects are verified and 100% genuine.' },
  { icon: '🏅', title: 'Best Price Deal', desc: 'We ensure you get the best price & offers.' },
  { icon: '🤝', title: 'Direct Builder Contact', desc: 'No brokerage hassle, direct from builder.' },
  { icon: '📅', title: 'Free Site Visit', desc: 'Book your free site visit with our experts.' },
]

const STATS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
        <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
      </svg>
    ),
    count: '100%',
    label: 'Verified Projects'
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    count: '100+',
    label: 'Happy Clients'
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.735.534L12 19.667 7.743 21.95a.5.5 0 0 1-.735-.534l1.515-8.526" />
      </svg>
    ),
    count: '8+',
    label: 'Years Experience'
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" fillOpacity="0.22" />
      </svg>
    ),
    count: '4.8/5',
    label: 'Customer Rating'
  },
]

// Featured testimonials on Home are a short, curated preview — the full
// set lives on the Client Stories page (which links from "View All").
const FEATURED_TESTIMONIALS = TESTIMONIALS.slice(0, 3)

function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section
        className="home__hero"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85&auto=format&fit=crop)',
        }}
      >
        <span className="home__hero-shape home__hero-shape--1" aria-hidden="true"></span>
        <span className="home__hero-shape home__hero-shape--2" aria-hidden="true"></span>
        <span className="home__hero-shape home__hero-shape--3" aria-hidden="true"></span>

        <div className="container home__hero-container">
          <div className="home__hero-content">
            <Reveal as="span" className="home__hero-badge">✦ Premium Real Estate Projects</Reveal>
            <Reveal as="h1" className="home__hero-heading" delay={80}>
              Find Your<br />Dream <span className="text-gold">Home</span>
            </Reveal>
            <Reveal as="p" className="home__hero-subtext" delay={160}>
              Explore premium residential &amp; commercial projects directly from verified builders in Pune.
            </Reveal>
            <Reveal as="div" className="home__hero-actions" delay={240}>
              <a href="tel:+918888658892" className="btn btn--gold">
                <span aria-hidden="true">📞</span> Call Now
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--outline-light">
                <span aria-hidden="true">💬</span> WhatsApp Us
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="home__search">
        <div className="container">
          <Reveal as="div">
            <SearchBar />
          </Reveal>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="home__projects section">
        <div className="container">
          <Reveal as="div" className="section__header">
            <div>
              <span className="section__pre-label">FEATURED PROJECTS</span>
              <h2 className="section__title">Our Premium Projects</h2>
            </div>
            <Link to="/projects" className="section__view-all">
              View All Projects →
            </Link>
          </Reveal>
          <div className="home__projects-grid">
            {FEATURED_PROJECTS.map((project, index) => (
              <Reveal key={project.id} as="div" className="reveal--card" delay={index * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="home__trust section section--alt">
        <div className="container">
          <div className="home__trust-grid">
            {TRUST_BADGES.map((badge, index) => (
              <Reveal key={badge.title} as="div" className="home__trust-item" delay={index * 80}>
                <span className="home__trust-icon" aria-hidden="true">{badge.icon}</span>
                <div className="home__trust-text">
                  <strong className="home__trust-title">{badge.title}</strong>
                  <p className="home__trust-desc">{badge.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home__testimonials section">
        <div className="container">
          <Reveal as="div" className="section__header">
            <div>
              <span className="section__pre-label">TESTIMONIALS</span>
              <h2 className="section__title">What Our Clients Say</h2>
            </div>
            <Link to="/client-stories" className="section__view-all">
              View All Stories →
            </Link>
          </Reveal>
          <div className="home__testimonials-grid">
            {FEATURED_TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.id} as="div" className="reveal--card" delay={index * 100}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="home__stats section section--alt">
        <div className="container">
          <Reveal as="div" className="home__stats-header">
            <span className="section__pre-label">OUR TRACK RECORD</span>
            <h2 className="section__title">Trusted by Hundreds of Families</h2>
          </Reveal>
          <div className="home__stats-grid">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} as="div" className="home__stat-item" delay={index * 80}>
                <span className="home__stat-icon" aria-hidden="true">{stat.icon}</span>
                <strong className="home__stat-count text-gold">{stat.count}</strong>
                <span className="home__stat-label">{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home__cta section">
        <div className="container">
          <Reveal as="div">
            <CTABanner />
          </Reveal>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a
        href={WHATSAPP_URL}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </div>
  )
}

export default Home
