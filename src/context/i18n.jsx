import { useState } from "react";
import { CONTENT } from "../utils/content.js";
import { EDITOR_OVERRIDES } from "../utils/profileContent.js";
import { useProfile } from "./ProfileContext.jsx";
import { LangContext } from "./langContext.js";

// Existing imports of useLang from this file keep working.
export { useLang } from "./langContext.js";

// The editor profile swaps a few sections (home, about bio, works) on top of
// the base content; each overridden section is merged one level deep.
const withProfile = (base, overrides) => {
  if (!overrides) return base;
  const merged = { ...base };
  for (const key in overrides) merged[key] = { ...base[key], ...overrides[key] };
  return merged;
};

export const LangProvider = ({ children }) => {
  const { profile } = useProfile();
  const [lang, setLang] = useState(
    () => localStorage.getItem("os-lang") || "en"
  );

  const toggleLang = () => {
    const next = lang === "en" ? "pt" : "en";
    setLang(next);
    localStorage.setItem("os-lang", next);
  };

  const c = withProfile(CONTENT[lang], profile === "editor" ? EDITOR_OVERRIDES[lang] : null);

  return (
    <LangContext.Provider value={{ lang, toggleLang, c }}>
      {children}
    </LangContext.Provider>
  );
};
