/**
 * GharStory Logo Component
 * 
 * Supports:
 * - variant="full"  : The complete brand identity (House + "घर" + divider + "STORY")
 * - variant="badge" : Full logo enclosed in the dark slate card tile (as in brand artwork)
 * - variant="mark"  : House icon only (gable roof, chimney, 4-pane window)
 * - variant="png"   : High-res transparent PNG raster
 */
export default function Logo({
  variant = 'full',
  height = 48,
  className = '',
  alt = 'Ghar Story',
  ...props
}) {
  const srcMap = {
    full: '/logo.svg',
    badge: '/logo-badge.svg',
    mark: '/logo-mark.svg',
    png: '/logo.png',
  }

  const resolvedSrc = srcMap[variant] || '/logo.svg'

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      height={height}
      className={`ghar-story-logo ghar-story-logo--${variant} ${className}`.trim()}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      loading="eager"
      decoding="async"
      {...props}
    />
  )
}
