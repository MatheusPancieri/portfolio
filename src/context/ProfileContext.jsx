import { createContext, useContext } from "react";

// Which profile the visitor picked on the welcome screen: "dev" | "editor".
// Chosen on every visit (not persisted), see DesktopPage.jsx.
export const ProfileContext = createContext({ profile: "dev", logOff: () => {} });

export const useProfile = () => useContext(ProfileContext);
