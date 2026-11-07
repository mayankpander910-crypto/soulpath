import SearchWidget from '../components/ui/SearchWidget';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-label="Where every journey becomes an adventure">
      <div className="hero__media">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/video/hero-poster.jpg"
        >
          <source src="/assets/video/hero-1280.webm" type="video/webm" />
          <source src="/assets/video/hero-1280.mp4" type="video/mp4" />
        </video>
        <div className="hero__scrim" />
      </div>

      <div className="hero__inner">
        <p className="label hero__eyebrow">Immersive Travel Experiences</p>

        <h1 className="display display--xl hero__title">
          Where Every <span>Journey</span>
          <br />
          Becomes an Adventure
        </h1>

        <div className="hero__search">
          <SearchWidget />
        </div>
      </div>
    </section>
  );
}
