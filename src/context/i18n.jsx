import { createContext, useContext, useState } from "react";
import { CONTENT } from "../utils/content.js";

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem("os-lang") || "en"
  );

  const toggleLang = () => {
    const next = lang === "en" ? "pt" : "en";
    setLang(next);
    localStorage.setItem("os-lang", next);
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, c: CONTENT[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
