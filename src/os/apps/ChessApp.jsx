import { FaChessKnight } from "react-icons/fa";
import { useLang } from "../i18n.jsx";

const ChessApp = () => {
  const { c } = useLang();

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      {/* Mini pixel chessboard */}
      <div className="grid grid-cols-4 border-2 border-line rounded-sm overflow-hidden shadow-[4px_4px_0_0_rgba(59,51,37,0.85)]">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className={`w-9 h-9 ${
              (Math.floor(i / 4) + i) % 2 === 0 ? "bg-accent-soft" : "bg-line"
            }`}
          />
        ))}
      </div>
      <FaChessKnight className="w-8 h-8 text-ink -mt-13 mb-8 drop-shadow-[2px_2px_0_rgba(59,51,37,0.4)]" />
      <h2 className="text-xl font-anonymous font-bold text-ink">
        {c.chess.comingSoon}
      </h2>
      <p className="mt-2 text-sm text-ink-soft font-inter max-w-60">
        {c.chess.note}
      </p>
    </div>
  );
};

export default ChessApp;
