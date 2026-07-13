import { useEffect, useState } from "react";
import { useLang } from "../../context/i18n.jsx";
import signature from "../../assets/imgs/assinaturaMatheus.svg";

const BootScreen = ({ onDone }) => {
  const { c } = useLang();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setFading(true), 1700);
    const done = setTimeout(onDone, 2100);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-desk transition-opacity duration-400 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="grain-layer" />
      <img
        src={signature}
        alt="Matheus Pancieri"
        className="relative w-48 opacity-90"
      />
      <div className="relative mt-10 w-56 h-3 bg-panel border-2 border-line rounded-full overflow-hidden">
        <div className="boot-bar h-full bg-accent" />
      </div>
      <p className="relative mt-4 font-anonymous text-xs text-ink-soft">
        {c.boot.loading}
      </p>
    </div>
  );
};

export default BootScreen;
