import { createContext, useContext, useState } from "react";

// Holds which project's Bio.txt is currently shown in the Notes app —
// set by WorksApp right before launching it, read by NotesApp.
const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
  const [projectIdx, setProjectIdx] = useState(null);
  return (
    <NotesContext.Provider value={{ projectIdx, setProjectIdx }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
