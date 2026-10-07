import { useInView } from '../hooks/useInView'

// Lightweight scroll-reveal wrapper: fades + lifts children into place the
// first time they enter the viewport. `delay` (ms) staggers groups of items
// (e.g. a grid of cards) without needing an animation library.
function Reveal({ children, as: Tag = 'div', className = '', delay = 0, style, ...rest }) {
  const [ref, isInView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${isInView ? 'reveal--visible' : ''} ${className}`.trim()}
      style={{ ...style, transitionDelay: isInView ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
