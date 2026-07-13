import { BrowserRouter, Routes, Route } from "react-router-dom";
import DesktopPage from "./pages/Desktop/DesktopPage.jsx";
import OldVersionPage from "./pages/OldVersion/OldVersionPage.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DesktopPage />} />
      <Route path="/old-version" element={<OldVersionPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
