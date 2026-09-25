const WORDS = ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "Animations", "Clean Code"];

export default function Marquee() {
  return (
    <div className="marq" aria-hidden="true">
      <div>
        {[...WORDS, ...WORDS].map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  );
}
