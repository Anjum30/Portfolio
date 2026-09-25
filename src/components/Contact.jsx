import Reveal from "./Reveal.jsx";

export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <Reveal cls="contact">
          <h2>Let's work together</h2>
          <p>I'm open to frontend roles and freelance projects. Send me a message and I'll reply within two days.</p>
          <a className="btn" href="mailto:you@example.com">Email me</a>
        </Reveal>
      </div>
    </section>
  );
}
