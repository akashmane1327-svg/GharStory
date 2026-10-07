import TestimonialCard from '../components/TestimonialCard'
import CTABanner from '../components/CTABanner'
import Reveal from '../components/Reveal'
import { TESTIMONIALS } from '../data/testimonials'
import { WHATSAPP_URL } from '../utils/whatsapp'
import '../styles/ClientStories.css'

const STATS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="M8 12h.01" strokeWidth="2.5" />
        <path d="M12 12h.01" strokeWidth="2.5" />
        <path d="M16 12h.01" strokeWidth="2.5" />
      </svg>
    ),
    count: '200+',
    label: 'Happy Families and Counting'
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    count: '100%',
    label: 'Transparency Committed'
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" fillOpacity="0.22" />
      </svg>
    ),
    count: '4.8/5',
    label: 'Average Rating on Google'
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.735.534L12 19.667 7.743 21.95a.5.5 0 0 1-.735-.534l1.515-8.526" />
      </svg>
    ),
    count: '50+',
    label: 'Successful Projects Delivered'
  },
]

function ClientStories() {
  return (
    <div className="client-stories">
      {/* Banner */}
      <section
        className="page-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=85&auto=format&fit=crop)',
        }}
      >
        <div className="container page-banner__container">
          <div className="page-banner__content">
            <nav className="breadcrumb">
              <a href="/">Home</a>
              <span className="breadcrumb__sep">›</span>
              <span>Client Stories</span>
            </nav>
            <h1 className="page-banner__heading">
              Client <span className="text-gold">Stories</span>
            </h1>
            <p className="page-banner__subheading">Real Stories. Real Smiles.</p>
            <p className="page-banner__subtext">
              Real experiences from homeowners and investors who found their ideal property with Ghar Story.
            </p>
            <div className="page-banner__badges">
              <span className="page-banner__badge">✦ 4.8 / 5 Rating</span>
              <span className="page-banner__badge">✦ Verified Reviews</span>
              <span className="page-banner__badge">✦ 100% Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="client-stories__stats">
        <div className="container">
          <Reveal as="div" className="client-stories__stats-grid">
            {STATS.map((stat) => (
              <div key={stat.label} className="client-stories__stat-item">
                <span className="client-stories__stat-icon" aria-hidden="true">{stat.icon}</span>
                <strong className="client-stories__stat-count text-gold">{stat.count}</strong>
                <span className="client-stories__stat-label">{stat.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="client-stories__testimonials section">
        <div className="container">
          <Reveal as="div" className="client-stories__testimonials-header">
            <span className="section__pre-label">TESTIMONIALS</span>
            <h2 className="section__title">What Our Clients Say</h2>
            <p className="section__subtitle">
              Hear from our happy homeowners and investors who found their perfect spaces with us.
            </p>
          </Reveal>
          <div className="client-stories__testimonials-grid">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.id} as="div" className="reveal--card" delay={(index % 3) * 80}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="client-stories__video section section--alt">
        <div className="container client-stories__video-inner">
          <Reveal as="div" className="client-stories__video-player-wrap">
            <video
              className="client-stories__video-player"
              src="/clientstories.mp4"
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              onContextMenu={(e) => e.preventDefault()}
              preload="auto"
            />
          </Reveal>
          <Reveal as="div" className="client-stories__video-content" delay={100}>
            <span className="section__pre-label">CLIENT EXPERIENCE</span>
            <h2 className="section__title">
              More Than Just Properties,<br />We Build Relationships
            </h2>
            <p className="client-stories__video-desc">
              From contract signing to receiving your keys, watch how we guide every homeowner through a transparent and seamless journey with Ghar Story.
            </p>
            <a href="/contact" className="btn btn--gold">
              <span>Start Your Story</span> →
            </a>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <CTABanner
            title="Ready to Write Your Story?"
            subtitle="Let us help you find your dream property."
          />
        </div>
      </section>

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

export default ClientStories
