import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";

const SKILLS = [
  { name: "HTML", icon: "</>", text: "Semantic, accessible markup that works well with screen readers and search engines.", tags: ["Semantic tags", "Forms", "SEO basics", "Accessibility"] },
  { name: "CSS", icon: "{}", text: "Modern layouts and smooth animations that look right on every screen size.", tags: ["Flexbox", "Grid", "Animations", "Responsive"] },
  { name: "JavaScript", icon: "JS", text: "Interactive features written in clean, modern ES6+ code.", tags: ["ES6+", "DOM", "Fetch API", "Async/Await"] },
  { name: "React", icon: "⚛", text: "Reusable components and app-like pages built with hooks and routing.", tags: ["Hooks", "Components", "Context API", "React Router"] },
];

function SkillCard({ skill, index }) {
  // 3D tilt + light that follows the mouse
  const move = (e) => {
    const el = e.currentTarget, b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;
    el.style.setProperty("--rx", -y * 10 + "deg");
    el.style.setProperty("--ry", x * 10 + "deg");
    el.style.setProperty("--gx", (x + 0.5) * 100 + "%");
    el.style.setProperty("--gy", (y + 0.5) * 100 + "%");
  };
  const leave = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal delay={index * 120}>
      <div className="skill" onMouseMove={move} onMouseLeave={leave}>
        <div className="badge">{skill.icon}</div>
        <h3>{skill.name}</h3>
        <p>{skill.text}</p>
        <div className="chips">
          {skill.tags.map((t, j) => (
            <span key={t} className="chip" style={{ "--d": index * 120 + 400 + j * 90 + "ms" }}>{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <SectionHead title="Skills" text="The tools I use every day, and what I use them for." />
        <div className="skills">
          {SKILLS.map((s, i) => <SkillCard key={s.name} skill={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
