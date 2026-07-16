import { useState } from "react";
import { useLang } from "../../context/i18n.jsx";

const STORAGE_KEY = "os-notepad-text";

const NotepadApp = () => {
  const { c } = useLang();
  const [text, setText] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? ""
  );

  const onChange = (e) => {
    setText(e.target.value);
    localStorage.setItem(STORAGE_KEY, e.target.value);
  };

  return (
    <textarea
      value={text}
      onChange={onChange}
      placeholder={c.notepad.placeholder}
      spellCheck={false}
      className="w-full h-full min-h-[50vh] p-4 bg-panel text-ink font-anonymous text-sm leading-relaxed resize-none outline-none placeholder:text-ink-soft/50"
    />
  );
};

export default NotepadApp;
