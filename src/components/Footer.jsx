import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import '../styles/Footer.css'

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About Us' },
  { to: '/client-stories', label: 'Client Stories' },
  { to: '/contact', label: 'Contact' },
]

const LOCATIONS = ['Pune', 'Hinjewadi', 'Wakad', 'Baner', 'Kharadi']

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__brand">
          <div className="footer__logo">
            <Logo variant="full" height={52} className="footer__logo-img" />
            <div>
              <span className="footer__logo-name">Ghar Story</span>
              <span className="footer__logo-tagline">Your Dream. Our Priority.</span>
            </div>
          </div>
          <p className="footer__brand-desc">
            We help you find the perfect property that fits your lifestyle and budget — direct from
            verified builders, with no brokerage hassle.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook" className="footer__social-link">f</a>
            <a href="#" aria-label="Instagram" className="footer__social-link">ig</a>
            <a href="#" aria-label="YouTube" className="footer__social-link">yt</a>
            <a href="#" aria-label="LinkedIn" className="footer__social-link">in</a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__col-links">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}><NavLink to={link.to}>{link.label}</NavLink></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Popular Locations</h4>
          <ul className="footer__col-links">
            {LOCATIONS.map((location) => (
              <li key={location}>
                <NavLink to={location === 'Pune' ? '/projects' : `/projects?location=${encodeURIComponent(location)}`}>
                  {location}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Contact Us</h4>
          <ul className="footer__contact-list">
            <li>
              <span className="footer__contact-icon" aria-hidden="true">📞</span>
              <a href="tel:+918888658892">+91 88886 58892</a>
            </li>
            <li>
              <span className="footer__contact-icon" aria-hidden="true">✉️</span>
              <a href="mailto:gharstory89@gmail.com">gharstory89@gmail.com</a>
            </li>
            <li>
              <span className="footer__contact-icon" aria-hidden="true">📍</span>
              <span>156/3, Colony No 16, Ganesh Nagar, Bopkhel, Pune - 411031</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="container">© 2026 Ghar Story. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
