import './home.css';

/** Editorial statement block — large, quiet type straight after the hero. */
export default function Intro() {
  return (
    <section className="section shell intro">
      <p className="intro__statement" data-reveal>
        Soul Path Holidays is a trusted travel company based in Ahmedabad, specializing in customized
        international tour packages to 50+ destinations worldwide — creating unforgettable experiences and
        lifelong memories.
      </p>

      <div className="intro__meta" data-reveal>
        <div>
          <p className="label">Trusted since</p>
          <p className="intro__meta-value">2021</p>
        </div>
        <div>
          <p className="label">Based in</p>
          <p className="intro__meta-value">Ahmedabad</p>
        </div>
        <div>
          <p className="label">Destinations</p>
          <p className="intro__meta-value">50+</p>
        </div>
        <div>
          <p className="label">Travellers hosted</p>
          <p className="intro__meta-value">500+</p>
        </div>
      </div>
    </section>
  );
}
