import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import ProjectToolbar from '../components/ProjectToolbar'
import FilterPanel, { EMPTY_FILTERS } from '../components/FilterPanel'
import Reveal from '../components/Reveal'
import CTABanner from '../components/CTABanner'
import { useFavourites } from '../context/FavouritesContext'
import { PROJECTS } from '../data/projects'
import { WHATSAPP_URL } from '../utils/whatsapp'
import '../styles/Projects.css'

const PAGE_SIZE = 6

function Projects() {
  const [searchParams] = useSearchParams()
  const { isFavourite } = useFavourites()

  // Filter option lists are derived from the live dataset rather than
  // hardcoded, so they never go stale if projects.js changes.
  const filterOptions = useMemo(() => {
    const types = [...new Set(PROJECTS.map((p) => p.type))].sort()
    const locations = [...new Set(PROJECTS.map((p) => p.city))].sort()
    const statuses = [...new Set(PROJECTS.map((p) => p.status))].sort()
    const bhks = [...new Set(PROJECTS.flatMap((p) => p.bhk))].sort((a, b) => a - b)
    return { types, locations, statuses, bhks }
  }, [])

  // Seed state from the URL once on mount (the Home page quick-search
  // arrives here with ?location=&type=&bhk=&price=), then behave as
  // normal component state afterwards.
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [favouritesOnly, setFavouritesOnly] = useState(false)
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [filters, setFilters] = useState(() => {
    const location = searchParams.get('location')
    const type = searchParams.get('type')
    const bhk = searchParams.get('bhk')
    return {
      types: type ? [type] : [],
      locations: location ? [location] : [],
      bhks: bhk ? [Number(bhk)] : [],
      statuses: [],
    }
  })

  // Re-seed filters if the URL search params change after the initial
  // mount (e.g. user runs another quick-search from Home and lands back
  // here while already on /projects via SPA navigation).
  useEffect(() => {
    const location = searchParams.get('location')
    const type = searchParams.get('type')
    const bhk = searchParams.get('bhk')
    if (location || type || bhk) {
      setFilters({
        types: type ? [type] : [],
        locations: location ? [location] : [],
        bhks: bhk ? [Number(bhk)] : [],
        statuses: [],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const activeFilterCount =
    filters.types.length +
    filters.locations.length +
    filters.bhks.length +
    filters.statuses.length

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    let result = PROJECTS.filter((project) => {
      if (term) {
        const haystack = `${project.name} ${project.location} ${project.type}`.toLowerCase()
        if (!haystack.includes(term)) return false
      }
      if (filters.types.length && !filters.types.includes(project.type)) return false
      if (filters.locations.length && !filters.locations.includes(project.city)) return false
      if (filters.statuses.length && !filters.statuses.includes(project.status)) return false
      if (filters.bhks.length && !filters.bhks.some((b) => project.bhk.includes(b))) return false
      if (favouritesOnly && !isFavourite(project.id)) return false
      return true
    })

    switch (sortBy) {
      case 'newest':
        result = [...result].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        break
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // 'featured' — keep the original curated dataset order.
        break
    }

    return result
  }, [searchTerm, filters, favouritesOnly, sortBy, isFavourite])

  // Any change to the result-defining inputs should reset how many cards
  // are revealed, so users don't land mid-list with a stale Load More state.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [searchTerm, filters, favouritesOnly, sortBy])

  const visibleProjects = filteredProjects.slice(0, visibleCount)

  const handleApplyFilters = (nextFilters) => setFilters(nextFilters)
  const handleClearAllFilters = () => setFilters(EMPTY_FILTERS)

  const removeChip = (group, value) => {
    setFilters((prev) => ({ ...prev, [group]: prev[group].filter((v) => v !== value) }))
  }

  const clearEverything = () => {
    setSearchTerm('')
    setFilters(EMPTY_FILTERS)
    setFavouritesOnly(false)
  }

  // Flattened list of removable chips, one entry per active filter value.
  const chips = [
    ...filters.types.map((value) => ({ group: 'types', value, label: value })),
    ...filters.locations.map((value) => ({ group: 'locations', value, label: value })),
    ...filters.bhks.map((value) => ({ group: 'bhks', value, label: `${value} BHK` })),
    ...filters.statuses.map((value) => ({ group: 'statuses', value, label: value })),
  ]

  return (
    <div className="projects-page">
      <section
        className="page-banner"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop)',
        }}
      >
        <div className="container page-banner__container">
          <div className="page-banner__content">
            <nav className="breadcrumb">
              <a href="/">Home</a>
              <span className="breadcrumb__sep">›</span>
              <span>Projects</span>
            </nav>
            <h1 className="page-banner__heading">
              Explore Our <span className="text-gold">Projects</span>
            </h1>
            <p className="page-banner__subtext">
              Handpicked residential &amp; commercial properties across Pune's top localities.
            </p>
            <div className="page-banner__badges">
              <span className="page-banner__badge">✦ Verified Projects</span>
              <span className="page-banner__badge">✦ Direct Builder Deals</span>
              <span className="page-banner__badge">✦ Zero Brokerage</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section projects-page__main">
        <div className="container">
          <Reveal as="div" className="projects-page__toolbar-wrap">
            <ProjectToolbar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onToggleFilterPanel={() => setFilterPanelOpen((open) => !open)}
              filterPanelOpen={filterPanelOpen}
              activeFilterCount={activeFilterCount}
              favouritesOnly={favouritesOnly}
              onToggleFavouritesOnly={() => setFavouritesOnly((v) => !v)}
            />
          </Reveal>

          {chips.length > 0 && (
            <div className="projects-page__chips">
              {chips.map((chip) => (
                <button
                  key={`${chip.group}-${chip.value}`}
                  type="button"
                  className="projects-page__chip"
                  onClick={() => removeChip(chip.group, chip.value)}
                >
                  {chip.label}
                  <span aria-hidden="true">✕</span>
                </button>
              ))}
              <button type="button" className="projects-page__chip-clear" onClick={clearEverything}>
                Clear all
              </button>
            </div>
          )}

          <div className="projects-page__result-bar">
            <span className="projects-page__count">
              Showing {visibleProjects.length} of {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'Project' : 'Projects'}
            </span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="projects-page__empty">
              <span className="projects-page__empty-icon" aria-hidden="true">🏘️</span>
              <h2 className="projects-page__empty-title">No properties found</h2>
              <p className="projects-page__empty-text">
                Try adjusting your search or filters to see more results.
              </p>
              <button type="button" className="btn btn--navy" onClick={clearEverything}>
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="projects-page__grid">
                {visibleProjects.map((project, index) => (
                  <Reveal
                    key={project.id}
                    as="div"
                    className="reveal--card"
                    delay={(index % PAGE_SIZE) * 80}
                  >
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>

              {visibleCount < filteredProjects.length && (
                <div className="projects-page__load-more">
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  >
                    Load More Projects
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <FilterPanel
        options={filterOptions}
        appliedFilters={filters}
        isOpen={filterPanelOpen}
        onApply={handleApplyFilters}
        onClose={() => setFilterPanelOpen(false)}
        onClearAll={handleClearAllFilters}
      />

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

export default Projects
