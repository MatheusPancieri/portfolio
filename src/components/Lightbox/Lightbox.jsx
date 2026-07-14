import { useEffect, useState } from "react";

const Lightbox = ({ src, alt, type = "image", closeLabel, onClose }) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border-2 border-line rounded-md bg-panel-soft font-anonymous font-bold text-ink hover:bg-accent-soft transition-colors cursor-pointer"
      >
        ✕
      </button>
      {type === "video" ? (
        <video
          src={src}
          controls
          autoPlay
          onClick={(e) => e.stopPropagation()}
          className="max-w-[92vw] max-h-[88vh] border-2 border-line shadow-[8px_8px_0_0_rgba(59,51,37,0.5)]"
        />
      ) : (
        <div
          className={
            zoomed
              ? "relative w-full h-full overflow-auto os-scroll"
              : "relative max-w-[92vw] max-h-[88vh]"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            onClick={() => setZoomed((z) => !z)}
            className={
              zoomed
                ? "max-w-none border-2 border-line cursor-zoom-out"
                : "block mx-auto max-w-[92vw] max-h-[88vh] w-auto h-auto object-contain border-2 border-line shadow-[8px_8px_0_0_rgba(59,51,37,0.5)] cursor-zoom-in"
            }
          />
        </div>
      )}
    </div>
  );
};

export default Lightbox;
