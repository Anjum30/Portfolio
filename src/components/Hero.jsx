import Typer from "./Typer.jsx";
import IdCard from "./IdCard.jsx";

const NAME = "Numan Anjum";
const ROLES = ["Frontend Developer", "React Developer", "UI Builder"];

export default function Hero() {
  // Moves the soft glow to follow the mouse
  const glow = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", e.clientX - b.left + "px");
    e.currentTarget.style.setProperty("--my", e.clientY - b.top + "px");
  };

  return (
    <section className="hero" onMouseMove={glow}>
      <div className="blob" />
      <div className="blob b2" />
      <div className="wrap hero-grid">
        <div>
          <span className="avail"><i />Available for work</span>
          <h1 aria-label={NAME}>
            {NAME.split("").map((c, i) => (
              <span key={i} className="ch" aria-hidden="true" style={{ animationDelay: i * 60 + "ms" }}>
                {c === " " ? "\u00a0" : c}
              </span>
            ))}
          </h1>
          <p className="role">
            I'm a <b><Typer words={ROLES} /></b>
            <i className="caret" />
          </p>
          <p className="intro">
            I turn designs into fast, responsive websites and React apps using clean HTML, CSS and JavaScript.
          </p>
          <div className="cta">
            <a className="btn primary" href="#projects">See my projects</a>
            <a className="btn ghost" href="#contact">Get in touch</a>
          </div>
        </div>
        <IdCard />
      </div>
    </section>
  );
}
