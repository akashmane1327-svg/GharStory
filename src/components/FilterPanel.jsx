import { useEffect, useState } from 'react'
import '../styles/FilterPanel.css'

// Empty "draft" filter state — used both as the initial shape and as the
// target for Clear All, so the two stay in sync by construction.
const EMPTY_FILTERS = {
  types: [],
  locations: [],
  bhks: [],
  statuses: [],
}

function toggleInArray(array, value) {
  return array.includes(value) ? array.filter((item) => item !== value) : [...array, value]
}

// Expandable filter drawer. Keeps a local "draft" copy of the filters so
// users can change checkboxes freely and only commit them to the page
// (and the URL/results) when they click Apply — Cancel/close discards
// anything unapplied.
function FilterPanel({ options, appliedFilters, isOpen, onApply, onClose, onClearAll }) {
  const [draft, setDraft] = useState(appliedFilters)

  // Re-sync the draft from the applied filters every time the panel opens,
  // so stale edits from a previous open-without-apply don't linger.
  useEffect(() => {
    if (isOpen) {
      setDraft(appliedFilters)
    }
  }, [isOpen, appliedFilters])

  if (!isOpen) return null

  const update = (group, value) => {
    setDraft((prev) => ({ ...prev, [group]: toggleInArray(prev[group], value) }))
  }

  const handleApply = () => {
    onApply(draft)
    onClose()
  }

  const handleClearAll = () => {
    setDraft(EMPTY_FILTERS)
    onClearAll()
  }

  return (
    <>
      <div className="filter-panel__backdrop" onClick={onClose} aria-hidden="true"></div>
      <div
        id="project-filter-panel"
        className="filter-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Filter projects"
      >
        <div className="filter-panel__header">
          <h2 className="filter-panel__title">Filters</h2>
          <button
            type="button"
            className="filter-panel__close"
            onClick={onClose}
            aria-label="Close filter panel"
          >
            ✕
          </button>
        </div>

        <div className="filter-panel__body">
          <fieldset className="filter-panel__group">
            <legend className="filter-panel__group-title">Property Type</legend>
            <div className="filter-panel__options">
              {options.types.map((type) => (
                <label key={type} className="filter-panel__option">
                  <input
                    type="checkbox"
                    checked={draft.types.includes(type)}
                    onChange={() => update('types', type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="filter-panel__group">
            <legend className="filter-panel__group-title">Location</legend>
            <div className="filter-panel__options">
              {options.locations.map((city) => (
                <label key={city} className="filter-panel__option">
                  <input
                    type="checkbox"
                    checked={draft.locations.includes(city)}
                    onChange={() => update('locations', city)}
                  />
                  <span>{city}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {options.bhks.length > 0 && (
            <fieldset className="filter-panel__group">
              <legend className="filter-panel__group-title">Bedrooms</legend>
              <div className="filter-panel__options">
                {options.bhks.map((bhk) => (
                  <label key={bhk} className="filter-panel__option">
                    <input
                      type="checkbox"
                      checked={draft.bhks.includes(bhk)}
                      onChange={() => update('bhks', bhk)}
                    />
                    <span>{bhk} BHK</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset className="filter-panel__group">
            <legend className="filter-panel__group-title">Status</legend>
            <div className="filter-panel__options">
              {options.statuses.map((status) => (
                <label key={status} className="filter-panel__option">
                  <input
                    type="checkbox"
                    checked={draft.statuses.includes(status)}
                    onChange={() => update('statuses', status)}
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="filter-panel__footer">
          <button type="button" className="btn btn--outline btn--sm" onClick={handleClearAll}>
            Clear All
          </button>
          <button type="button" className="btn btn--navy btn--sm" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}

export { EMPTY_FILTERS }
export default FilterPanel
