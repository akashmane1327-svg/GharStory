import '../styles/ProjectToolbar.css'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Default / Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

function ProjectToolbar({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onToggleFilterPanel,
  filterPanelOpen,
  activeFilterCount,
  favouritesOnly,
  onToggleFavouritesOnly,
}) {
  return (
    <div className="project-toolbar">
      <div className="project-toolbar__search">
        <span className="project-toolbar__search-icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          className="project-toolbar__search-input"
          placeholder="Search by project name, location, or type..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search projects"
        />
        {searchTerm && (
          <button
            type="button"
            className="project-toolbar__search-clear"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="project-toolbar__controls">
        <div className="project-toolbar__sort">
          <span className="project-toolbar__sort-icon" aria-hidden="true">↕</span>
          <select
            className="project-toolbar__sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort projects"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className={`project-toolbar__btn ${filterPanelOpen ? 'project-toolbar__btn--active' : ''}`}
          onClick={onToggleFilterPanel}
          aria-expanded={filterPanelOpen}
          aria-controls="project-filter-panel"
        >
          <span aria-hidden="true">⚙</span>
          Filters
          {activeFilterCount > 0 && (
            <span className="project-toolbar__count-badge">{activeFilterCount}</span>
          )}
        </button>

        <button
          type="button"
          className={`project-toolbar__btn ${favouritesOnly ? 'project-toolbar__btn--active' : ''}`}
          onClick={onToggleFavouritesOnly}
          aria-pressed={favouritesOnly}
        >
          <span aria-hidden="true">{favouritesOnly ? '♥' : '♡'}</span>
          Favourites
        </button>
      </div>
    </div>
  )
}

export default ProjectToolbar
