import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import '../styles/SearchBar.css'

// Home page quick-search: a lightweight entry point into the Projects page.
// Selections here become real, applied filters there (via URL query params),
// rather than being purely decorative.
function SearchBar() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [bhk, setBhk] = useState('')

  const cities = useMemo(
    () => [...new Set(PROJECTS.map((project) => project.city))].sort(),
    []
  )
  const types = useMemo(
    () => [...new Set(PROJECTS.map((project) => project.type))].sort(),
    []
  )
  const bhkOptions = useMemo(
    () => [...new Set(PROJECTS.flatMap((project) => project.bhk))].sort((a, b) => a - b),
    []
  )

  const handleSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (type) params.set('type', type)
    if (bhk) params.set('bhk', bhk)
    navigate(params.toString() ? `/projects?${params.toString()}` : '/projects')
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-bar__field">
        <span className="search-bar__icon" aria-hidden="true">📍</span>
        <div className="search-bar__field-inner">
          <label className="search-bar__label" htmlFor="quick-location">Location</label>
          <select
            id="quick-location"
            className="search-bar__select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Any Location</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="search-bar__divider" aria-hidden="true"></div>

      <div className="search-bar__field">
        <span className="search-bar__icon" aria-hidden="true">🏢</span>
        <div className="search-bar__field-inner">
          <label className="search-bar__label" htmlFor="quick-type">Property Type</label>
          <select
            id="quick-type"
            className="search-bar__select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="search-bar__divider" aria-hidden="true"></div>

      <div className="search-bar__field">
        <span className="search-bar__icon" aria-hidden="true">🏠</span>
        <div className="search-bar__field-inner">
          <label className="search-bar__label" htmlFor="quick-bhk">Configuration</label>
          <select
            id="quick-bhk"
            className="search-bar__select"
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
          >
            <option value="">All</option>
            {bhkOptions.map((b) => (
              <option key={b} value={b}>{b} BHK</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn--gold search-bar__btn">
        <span aria-hidden="true">🔍</span> Search Projects
      </button>
    </form>
  )
}

export default SearchBar
