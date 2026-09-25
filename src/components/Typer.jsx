import { useEffect, useState } from "react";

// Types a word, pauses, deletes it, then moves to the next word
export default function Typer({ words }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? 45 : 90;
    if (!deleting && text === word) delay = 1400;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") { setDeleting(false); setIndex((index + 1) % words.length); }
      else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);

    return () => clearTimeout(id);
  }, [text, deleting, index, words]);

  return <span>{text}</span>;
}
