import { useEffect, useState } from "react";

export default function Header({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      setProgress((window.scrollY / (d.scrollHeight - innerHeight || 1)) * 100);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      <div className="wrap bar-h">
        <a className="logo" href="#top">NA.</a>
        <button className="menu" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
        <nav className={open ? "open" : ""}>
          {["Skills", "Projects", "Contact"].map((l) => (
            <a key={l} href={"#" + l.toLowerCase()} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <button id="theme" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "☀" : "◐"}
          </button>
        </nav>
      </div>
      <div className="progress" style={{ width: progress + "%" }} />
    </header>
  );
}
