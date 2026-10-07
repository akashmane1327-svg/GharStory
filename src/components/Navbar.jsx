import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import '../styles/Navbar.css'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About Us' },
  { to: '/client-stories', label: 'Client Stories' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--menu-open' : ''}`}>
      <div className="navbar__container container">
        <NavLink to="/" className="navbar__logo" onClick={closeMenu} aria-label="Ghar Story Home">
          <Logo variant="full" height={44} className="navbar__logo-img" />
          <span className="navbar__logo-text">
            <span className="navbar__logo-name">Ghar Story</span>
            <span className="navbar__logo-tagline">Your Dream. Our Priority.</span>
          </span>
        </NavLink>

        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={({ isActive }) => (isActive ? 'active' : '')}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <a href="tel:+918888658892" className="navbar__phone">
            <span className="navbar__phone-icon" aria-hidden="true">📞</span>
            +91 88886 58892
          </a>
          <NavLink to="/contact" className="btn btn--gold btn--sm">Contact Us</NavLink>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div id="mobile-nav" className={`navbar__mobile-panel ${menuOpen ? 'navbar__mobile-panel--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="navbar__mobile-actions">
          <a href="tel:+918888658892" className="navbar__phone" onClick={closeMenu}>
            <span className="navbar__phone-icon" aria-hidden="true">📞</span>
            +91 88886 58892
          </a>
          <NavLink to="/contact" className="btn btn--gold btn--block" onClick={closeMenu}>Contact Us</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
