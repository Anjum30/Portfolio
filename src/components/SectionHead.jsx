import Reveal from "./Reveal.jsx";

export default function SectionHead({ title, text }) {
  return (
    <Reveal>
      <h2>{title}</h2>
      <p className="lead">{text}</p>
    </Reveal>
  );
}
