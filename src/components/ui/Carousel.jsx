import { useCarousel } from '../../hooks/useCarousel';
import './Carousel.css';

/**
 * Native scroll-snap rail with hairline progress + arrow controls.
 * `children` should be a set of equal-width items.
 */
export default function Carousel({ children, ariaLabel, className = '', controls = true }) {
  const { ref, progress, edges, scrollBy } = useCarousel();

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel__rail" ref={ref} role="list" aria-label={ariaLabel}>
        {children}
      </div>

      <div className="carousel__foot">
        <div className="carousel__progress" aria-hidden="true">
          <span className="carousel__progress-bar" style={{ transform: `scaleX(${progress || 0.06})` }} />
        </div>

        {controls ? (
          <div className="carousel__controls">
            <button
              type="button"
              className="carousel__arrow"
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              disabled={edges.start}
            >
              <svg width="26" height="8" viewBox="0 0 26 8" fill="none" stroke="currentColor" aria-hidden="true">
                <path d="M26 4H1M1 4l4-3M1 4l4 3" strokeWidth="1" />
              </svg>
            </button>
            <button
              type="button"
              className="carousel__arrow"
              onClick={() => scrollBy(1)}
              aria-label="Next"
              disabled={edges.end}
            >
              <svg width="26" height="8" viewBox="0 0 26 8" fill="none" stroke="currentColor" aria-hidden="true">
                <path d="M0 4h25M25 4l-4-3M25 4l-4 3" strokeWidth="1" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
