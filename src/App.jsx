import { BrowserRouter, Routes, Route } from "react-router-dom";
import DesktopPage from "./pages/Desktop/DesktopPage.jsx";
import OldVersionPage from "./pages/OldVersion/OldVersionPage.jsx";
import EditorPage from "./pages/Editor/EditorPage.jsx";

// Two portfolios, same OS layout: "/dev" (programmer) and "/editor" (video
// editor). "/" asks which one. editor.matheuspancieri.dev is served by this
// same build and opens straight into the editor profile.
const isEditorHost = window.location.hostname.startsWith("editor.");

const App = () => (
  <BrowserRouter>
    {/* Moving film grain over everything (see .noise-overlay in index.css) */}
    <div className="noise-overlay" aria-hidden="true" />
    <Routes>
      <Route path="/" element={<DesktopPage profile={isEditorHost ? "editor" : null} />} />
      <Route path="/dev" element={<DesktopPage profile="dev" />} />
      <Route path="/editor" element={<DesktopPage profile="editor" />} />
      {/* Previous standalone editor page (dark editing-suite layout) */}
      <Route path="/reel" element={<EditorPage />} />
      <Route path="/old-version" element={<OldVersionPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
