import '../styles/TestimonialCard.css'

function TestimonialCard({ testimonial }) {
  const { name, location, rating, text, project, avatar } = testimonial

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`testimonial-card__star ${i < rating ? 'testimonial-card__star--filled' : ''}`}>
      ★
    </span>
  ))

  return (
    <article className="testimonial-card">
      <div className="testimonial-card__quote-icon">"</div>
      <p className="testimonial-card__text">{text}</p>

      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar">
          {avatar
            ? <img src={avatar} alt={name} />
            : <span className="testimonial-card__avatar-placeholder">{name.charAt(0)}</span>
          }
        </div>
        <div className="testimonial-card__author-info">
          <strong className="testimonial-card__name">{name}</strong>
          <span className="testimonial-card__location">{location}</span>
        </div>
        <div className="testimonial-card__stars">{stars}</div>
      </div>

      <div className="testimonial-card__project">
        <span className="testimonial-card__project-icon">🏢</span>
        <span>{project}</span>
      </div>
    </article>
  )
}

export default TestimonialCard
