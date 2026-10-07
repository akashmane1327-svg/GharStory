import { WHATSAPP_URL } from '../utils/whatsapp'
import '../styles/CTABanner.css'

function CTABanner({ title, subtitle }) {
  return (
    <section className="cta-banner">
      <div className="cta-banner__icon">🏠</div>
      <div className="cta-banner__text">
        <h3 className="cta-banner__title">{title || 'Looking for the best property deals?'}</h3>
        <p className="cta-banner__subtitle">{subtitle || 'Get expert guidance and best offers on premium projects.'}</p>
      </div>
      <div className="cta-banner__actions">
        <a href="tel:+918888658892" className="btn btn--gold">
          <span aria-hidden="true">📞</span> Call Now
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--outline-light">
          <span aria-hidden="true">💬</span> WhatsApp Us
        </a>
      </div>
    </section>
  )
}

export default CTABanner
