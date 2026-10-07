import CTABanner from '../components/CTABanner'
import Reveal from '../components/Reveal'
import { WHATSAPP_URL } from '../utils/whatsapp'
import '../styles/About.css'

const STATS = [
  { count: '50+', label: 'Top Developer Tie-ups' },
  { count: '200+', label: 'Happy Families' },
  { count: '8+', label: 'Years Experience' },
  { count: '4.8/5', label: 'Client Rating' },
]

const VALUES = [
  { icon: '🛡️', title: 'Trust & Transparency', desc: 'We believe in honest dealings and complete transparency with every client.' },
  { icon: '🎯', title: 'Client-First Approach', desc: 'Your dream and your budget are our top priority in every recommendation.' },
  { icon: '🏆', title: 'Quality Projects', desc: 'We partner only with verified builders who maintain the highest standards.' },
  { icon: '🤝', title: 'After-Sales Support', desc: 'Our relationship with you does not end at possession — we are here always.' },
  { icon: '💡', title: 'Market Expertise', desc: 'Deep knowledge of Pune real estate helps us guide you to the right investment.' },
  { icon: '⚡', title: 'Swift Execution', desc: 'From shortlisting to final documentation, we make every step efficient.' },
]

const TEAM = [
  { name: 'Pritam Mane', role: 'Founder & CEO', img: null },
  { name: 'Priya Mehta', role: 'Head of Sales', img: null },
  { name: 'Anil Kulkarni', role: 'Senior Property Advisor', img: null },
  { name: 'Sneha Joshi', role: 'Client Relations Manager', img: null },
]

function About() {
  return (
    <div className="about-page">
      {/* Banner */}
      <section
        className="page-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85&auto=format&fit=crop)',
        }}
      >
        <div className="container page-banner__container">
          <div className="page-banner__content">
            <nav className="breadcrumb">
              <a href="/">Home</a>
              <span className="breadcrumb__sep">›</span>
              <span>About Us</span>
            </nav>
            <h1 className="page-banner__heading">
              About <span className="text-gold">Ghar Story</span>
            </h1>
            <p className="page-banner__subtext">
              Pune's trusted real estate partner, helping families find their perfect homes since 2019.
            </p>
            <div className="page-banner__badges">
              <span className="page-banner__badge">✦ Serving Pune Since 2019</span>
              <span className="page-banner__badge">✦ 200+ Happy Families</span>
              <span className="page-banner__badge">✦ 100% Transparency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="about-page__intro section">
        <div className="container about-page__intro-inner">
          <Reveal as="div" className="about-page__intro-image">
            <img
              src="/about-building.png"
              alt="Ghar Story Premium Residential Projects"
            />
          </Reveal>
          <Reveal as="div" className="about-page__intro-content" delay={100}>
            <span className="section__pre-label">WHO WE ARE</span>
            <h2 className="section__title">Your Dream. Our Priority.</h2>
            <p className="about-page__intro-text">
              Ghar Story was founded with a single mission — to make property buying simple, transparent, and stress-free for every family in Pune.
            </p>
            <p className="about-page__intro-text">
              With direct tie-ups with 50+ top developers across Pune's fastest-growing localities, we connect buyers directly with builders — eliminating brokerage hassles and ensuring you always get the best deal.
            </p>
            <p className="about-page__intro-text">
              From first inquiry to final possession and beyond, our team of experienced property advisors is with you every step of the way.
            </p>
            <div className="about-page__intro-stats">
              {STATS.map((stat) => (
                <div key={stat.label} className="about-page__intro-stat">
                  <strong className="text-gold">{stat.count}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Ghar Story Section */}
      <section className="about-page__why section section--alt">
        <div className="container about-page__why-container">
          <Reveal as="div" className="about-page__why-card">
            <span className="about-page__why-tag">WHY GHAR STORY</span>
            <h2 className="about-page__why-title">Pune's Direct Property Partner</h2>
            <div className="about-page__why-items">
              <div className="about-page__why-item">
                <span className="about-page__why-icon">🏛️</span>
                <div className="about-page__why-text">
                  <strong>Direct Builder Pricing</strong>
                  <p>Verified projects with 100% price transparency and zero hidden brokerage.</p>
                </div>
              </div>
              <div className="about-page__why-item">
                <span className="about-page__why-icon">📍</span>
                <div className="about-page__why-text">
                  <strong>Prime Pune Localities</strong>
                  <p>Baner, Wakad, Hinjewadi, Kharadi, Bopkhel, Ravet, and more.</p>
                </div>
              </div>
              <div className="about-page__why-item">
                <span className="about-page__why-icon">🤝</span>
                <div className="about-page__why-text">
                  <strong>End-to-End Assistance</strong>
                  <p>Free site visits, documentation guidance, and after-possession support.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="about-page__values section">
        <div className="container">
          <Reveal as="div" className="about-page__values-header">
            <span className="section__pre-label">WHAT WE STAND FOR</span>
            <h2 className="section__title">Our Core Values</h2>
          </Reveal>
          <div className="about-page__values-grid">
            {VALUES.map((value, index) => (
              <Reveal key={value.title} as="div" className="about-page__value-card" delay={index * 70}>
                <span className="about-page__value-icon" aria-hidden="true">{value.icon}</span>
                <h3 className="about-page__value-title">{value.title}</h3>
                <p className="about-page__value-desc">{value.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-page__team section">
        <div className="container">
          <Reveal as="div" className="about-page__team-header">
            <span className="section__pre-label">THE PEOPLE BEHIND GHAR STORY</span>
            <h2 className="section__title">Meet Our Team</h2>
          </Reveal>
          <div className="about-page__team-grid">
            {TEAM.map((member, index) => (
              <Reveal key={member.name} as="div" className="about-page__team-card" delay={index * 80}>
                <div className="about-page__team-avatar">
                  {member.img
                    ? <img src={member.img} alt={member.name} />
                    : <span className="about-page__team-placeholder">{member.name.charAt(0)}</span>
                  }
                </div>
                <h3 className="about-page__team-name">{member.name}</h3>
                <p className="about-page__team-role">{member.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--alt">
        <div className="container">
          <CTABanner />
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

export default About
