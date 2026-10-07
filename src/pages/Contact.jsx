import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CTABanner from '../components/CTABanner'
import Reveal from '../components/Reveal'
import { PROJECTS } from '../data/projects'
import { WHATSAPP_URL } from '../utils/whatsapp'
import '../styles/Contact.css'

const CONTACT_INFO = [
  { icon: '📞', title: 'Call Us', detail: '+91 88886 58892', link: 'tel:+918888658892' },
  { icon: '✉️', title: 'Email Us', detail: 'gharstory89@gmail.com', link: 'mailto:gharstory89@gmail.com' },
  { icon: '📍', title: 'Visit Us', detail: '156/3, Colony No 16, Ganesh Nagar, Bopkhel, Pune - 411031', link: '#map' },
  { icon: '🕒', title: 'Working Hours', detail: 'Mon–Sat: 9:00 AM – 7:00 PM', link: null },
]

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  location: '',
  budget: '',
  message: '',
}

function Contact() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const [needsActivation, setNeedsActivation] = useState(false)

  // If we arrived from a ProjectCard's "View Details" link
  // (/contact?project=<id>), look up that project and prefill the
  // message field so the visitor doesn't have to retype it.
  const projectId = searchParams.get('project')
  const inquiryProject = projectId
    ? PROJECTS.find((p) => String(p.id) === projectId)
    : null

  useEffect(() => {
    if (inquiryProject) {
      setForm((prev) => ({
        ...prev,
        message: `Hi, I'm interested in ${inquiryProject.name} (${inquiryProject.location}). Please share more details.`,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setNeedsActivation(false)

    try {
      const response = await fetch('https://formsubmit.co/ajax/gharstory89@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          'Client Name': form.name,
          'Phone Number': form.phone,
          'Email Address': form.email || 'Not provided',
          'Preferred Location': form.location || 'Any',
          'Budget Range': form.budget || 'Flexible',
          'Inquiring Project': inquiryProject ? `${inquiryProject.name} (${inquiryProject.location})` : 'General Inquiry',
          'Client Message': form.message || 'Interested in property options',
          _subject: `New Client Lead: ${form.name} (${form.phone}) - Ghar Story`,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      const data = await response.json()
      if (response.ok && (data.success === 'true' || data.success === true)) {
        setSubmitted(true)
        setNeedsActivation(false)
      } else if (data.message && data.message.toLowerCase().includes('activat')) {
        setNeedsActivation(true)
      } else {
        throw new Error(data.message || 'Unable to send your message.')
      }
    } catch (err) {
      console.error('Email submission error:', err)
      setSubmitError('Unable to send automatically right now. Please send your details directly via WhatsApp or Email below.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setForm(EMPTY_FORM)
    setSubmitted(false)
    setNeedsActivation(false)
    setSubmitError(null)
  }

  const fallbackWhatsAppText = `Hi Ghar Story,\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || 'N/A'}\nLocation: ${form.location || 'N/A'}\nBudget: ${form.budget || 'N/A'}\n${inquiryProject ? `Project: ${inquiryProject.name}\n` : ''}Message: ${form.message || 'Interested in properties'}`
  const fallbackWhatsAppUrl = `https://wa.me/918888658892?text=${encodeURIComponent(fallbackWhatsAppText)}`

  return (
    <div className="contact-page">
      {/* Banner */}
      <section
        className="page-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=85&auto=format&fit=crop)',
        }}
      >
        <div className="container page-banner__container">
          <div className="page-banner__content">
            <nav className="breadcrumb">
              <a href="/">Home</a>
              <span className="breadcrumb__sep">›</span>
              <span>Contact Us</span>
            </nav>
            <h1 className="page-banner__heading">
              Get In <span className="text-gold">Touch</span>
            </h1>
            <p className="page-banner__subtext">
              Have questions about projects, configurations, or locations? Our Pune property experts are here to help.
            </p>
            <div className="page-banner__badges">
              <span className="page-banner__badge">✦ Instant Response</span>
              <span className="page-banner__badge">✦ Free Site Visits</span>
              <span className="page-banner__badge">✦ Office: Bopkhel, Pune</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-page__info section">
        <div className="container">
          <div className="contact-page__info-grid">
            {CONTACT_INFO.map((item, index) => (
              <Reveal key={item.title} as="div" className="contact-page__info-card" delay={index * 70}>
                <span className="contact-page__info-icon" aria-hidden="true">{item.icon}</span>
                <h3 className="contact-page__info-title">{item.title}</h3>
                {item.link
                  ? <a href={item.link} className="contact-page__info-detail">{item.detail}</a>
                  : <span className="contact-page__info-detail">{item.detail}</span>
                }
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="contact-page__main section section--alt">
        <div className="container contact-page__main-inner">
          <Reveal as="div" className="contact-page__form-wrapper">
            <h2 className="contact-page__form-title">Send Us a Message</h2>
            <p className="contact-page__form-subtitle">
              Fill in your details and we'll get back to you within 24 hours.
            </p>

            {inquiryProject && !submitted && (
              <div className="contact-page__inquiry-banner">
                <span aria-hidden="true">🏢</span>
                Inquiring about <strong>{inquiryProject.name}</strong>, {inquiryProject.location}
              </div>
            )}

            {submitted ? (
              <div className="contact-page__success">
                <span className="contact-page__success-icon" aria-hidden="true">✅</span>
                <h3 className="contact-page__success-title">Inquiry Sent to Ghar Story!</h3>
                <p className="contact-page__success-desc">
                  Thank you, <strong className="text-gold">{form.name}</strong>. Your inquiry details have been delivered to our team at <strong>gharstory89@gmail.com</strong>.
                </p>
                <div className="contact-page__success-box">
                  <div className="contact-page__success-row">
                    <span className="contact-page__success-label">Phone:</span>
                    <strong>{form.phone}</strong>
                  </div>
                  {form.email && (
                    <div className="contact-page__success-row">
                      <span className="contact-page__success-label">Email:</span>
                      <strong>{form.email}</strong>
                    </div>
                  )}
                  {form.location && (
                    <div className="contact-page__success-row">
                      <span className="contact-page__success-label">Location:</span>
                      <strong style={{ textTransform: 'capitalize' }}>{form.location}</strong>
                    </div>
                  )}
                  {form.budget && (
                    <div className="contact-page__success-row">
                      <span className="contact-page__success-label">Budget:</span>
                      <strong>{form.budget}</strong>
                    </div>
                  )}
                </div>
                <p className="contact-page__success-followup">
                  Our senior property advisor will reach out to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn--outline-light contact-page__reset-btn"
                >
                  ← Send Another Inquiry
                </button>
              </div>
            ) : (
              <form className="contact-page__form" onSubmit={handleSubmit}>
                {needsActivation && (
                  <div className="contact-page__activation">
                    <div className="contact-page__activation-icon" aria-hidden="true">📩</div>
                    <div className="contact-page__activation-content">
                      <h4 className="contact-page__activation-title">One-Time Activation Email Sent!</h4>
                      <p className="contact-page__activation-desc">
                        FormSubmit has sent an activation link to <strong>gharstory89@gmail.com</strong>.
                        Please check your Gmail inbox and click the <strong>"Activate Form"</strong> button. Once clicked, this form is permanently activated and submissions will land in your inbox.
                      </p>
                      <div className="contact-page__activation-actions">
                        <a
                          href="https://mail.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--gold btn--sm"
                        >
                          Open Gmail Inbox ↗
                        </a>
                        <a
                          href={fallbackWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--outline-light btn--sm"
                        >
                          💬 Send via WhatsApp Now
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {submitError && !needsActivation && (
                  <div className="contact-page__error">
                    <p className="contact-page__error-text">⚠️ {submitError}</p>
                    <div className="contact-page__error-actions">
                      <a
                        href={fallbackWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--gold btn--sm"
                      >
                        💬 Send via WhatsApp
                      </a>
                      <a
                        href={`mailto:gharstory89@gmail.com?subject=Property Inquiry from ${encodeURIComponent(form.name || 'Client')}&body=${encodeURIComponent(fallbackWhatsAppText)}`}
                        className="btn btn--outline-light btn--sm"
                      >
                        ✉️ Open Email App
                      </a>
                    </div>
                  </div>
                )}

                <div className="contact-page__form-row">
                  <div className="contact-page__field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-page__field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      pattern="[0-9+ -]{8,15}"
                      title="Please enter a valid phone number"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-page__form-row">
                  <div className="contact-page__field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-page__field">
                    <label htmlFor="location">Preferred Location</label>
                    <select
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                    >
                      <option value="">Select Location</option>
                      <option value="bopkhel">Bopkhel</option>
                      <option value="dighi">Dighi</option>
                      <option value="charoli">Charoli / Wadmukhwadi</option>
                      <option value="hinjewadi">Hinjewadi</option>
                      <option value="wakad">Wakad</option>
                      <option value="baner">Baner</option>
                      <option value="kharadi">Kharadi</option>
                      <option value="ravet">Ravet</option>
                    </select>
                  </div>
                </div>

                <div className="contact-page__field">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select Budget</option>
                    <option value="50-75">50L – 75L</option>
                    <option value="75-100">75L – 1Cr</option>
                    <option value="100-150">1Cr – 1.5Cr</option>
                    <option value="150+">1.5Cr+</option>
                  </select>
                </div>

                <div className="contact-page__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn--gold contact-page__submit"
                >
                  {isSubmitting ? (
                    <span className="contact-page__submitting-wrap">
                      <span className="contact-page__spinner" aria-hidden="true"></span>
                      Sending Details to Email...
                    </span>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            )}
          </Reveal>

          {/* Map */}
          <Reveal as="div" className="contact-page__map" delay={100}>
            <iframe
              id="map"
              title="Ghar Story Office Location"
              src="https://maps.google.com/maps?q=156/3,+Colony+No+16,+Ganesh+Nagar,+Bopkhel,+Pune+411031&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
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

export default Contact
