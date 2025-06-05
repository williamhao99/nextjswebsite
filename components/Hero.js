// components/Hero.js
import SpotifyWidget from './SpotifyWidget';
import ChessWidget from './ChessWidget';
import ClashWidget from './ClashWidget';

export default function Hero({
  heroText = "I'm Will — welcome to my website!",
  description = "I am a rising sophomore at UT Austin, and this website serves as my personal portfolio that contains my work, blog, projects, and more."
}) {
  return (
    <section className="container medium section-hero">
      <div className="hero-wrapper">
        <div className="hero-content">
          <h1 className="h1 hero-title">{heroText}</h1>
          {description && (
            <p className="body-1 hero-desc">{description}</p>
          )}
          <div className="hero-widgets">
            <SpotifyWidget />
            <ChessWidget />
            <ClashWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
