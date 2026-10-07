import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import '../styles/ProjectCard.css'

const STATUS_BADGE = {
  'New Launch': 'badge--gold',
  'Under Construction': 'badge--navy',
  'Ready to Move': 'badge--teal',
}

function ProjectCard({ project }) {
  const { isFavourite, toggleFavourite } = useFavourites()
  const liked = isFavourite(project.id)

  const {
    id,
    name,
    location,
    type,
    status,
    image,
  } = project

  const handleToggleFavourite = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavourite(id)
  }

  return (
    <article className="project-card">
      <div className="project-card__image-wrapper">
        <img src={image} alt={name} className="project-card__image" loading="lazy" />
        <div className="project-card__badges">
          <span className={`badge ${STATUS_BADGE[status] || 'badge--gold'}`}>{status}</span>
          <span className="badge badge--outline">{type}</span>
        </div>
        <button
          type="button"
          className={`project-card__like ${liked ? 'project-card__like--active' : ''}`}
          onClick={handleToggleFavourite}
          aria-label={liked ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
          aria-pressed={liked}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M12 20.5s-7.5-4.6-10.2-9.2C-0.1 7.8 1.6 4 5.3 4c2.1 0 3.7 1.2 4.7 2.9C11 5.2 12.6 4 14.7 4c3.7 0 5.4 3.8 3.5 7.3C19.5 15.9 12 20.5 12 20.5Z"
              fill={liked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__name" title={name}>{name}</h3>
        <p className="project-card__location">
          <span className="project-card__location-icon" aria-hidden="true">📍</span>
          {location}
        </p>

        <Link to={`/contact?project=${id}`} className="btn btn--outline project-card__btn">
          View Details
        </Link>
      </div>
    </article>
  )
}

export default ProjectCard
