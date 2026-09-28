import { createContext, useContext } from "react";

// Lives apart from LangProvider (i18n.jsx) so hot reloads of that file don't
// create a new context object and leave consumers reading a stale one (null).
export const LangContext = createContext(null);

export const useLang = () => useContext(LangContext);
