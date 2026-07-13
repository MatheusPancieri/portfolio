import { createContext, useContext } from "react";

// Provided by Desktop (opens a window) and MobileLauncher (opens fullscreen),
// so apps like home.mdx can launch other apps without knowing the shell.
export const LaunchContext = createContext(() => {});
export const useLaunch = () => useContext(LaunchContext);
