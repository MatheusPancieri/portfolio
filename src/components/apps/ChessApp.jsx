import { useRef, useState } from "react";
import { Chess } from "chess.js";
import { useLang } from "../../context/i18n.jsx";
import whitePawn from "../../assets/chess/white-pawn.webp";
import whiteKnight from "../../assets/chess/white-knight.webp";
import whiteBishop from "../../assets/chess/white-bishop.webp";
import whiteRook from "../../assets/chess/white-rook.webp";
import whiteQueen from "../../assets/chess/white-queen.webp";
import whiteKing from "../../assets/chess/white-king.webp";
import blackPawn from "../../assets/chess/black-pawn.webp";
import blackKnight from "../../assets/chess/black-knight.webp";
import blackBishop from "../../assets/chess/black-bishop.webp";
import blackRook from "../../assets/chess/black-rook.webp";
import blackQueen from "../../assets/chess/black-queen.webp";
import blackKing from "../../assets/chess/black-king.webp";

// Pixel Art Chess by Ajay Karat / Devil's Work.shop (devilswork.shop),
// licensed CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).
// Sprites converted from PNG to WebP, otherwise unmodified.
const PIECE_IMAGES = {
  w: { p: whitePawn, n: whiteKnight, b: whiteBishop, r: whiteRook, q: whiteQueen, k: whiteKing },
  b: { p: blackPawn, n: blackKnight, b: blackBishop, r: blackRook, q: blackQueen, k: blackKing },
};

const FILES = "abcdefgh";
const toSquare = (row, col) => `${FILES[col]}${8 - row}`;

const ChessApp = () => {
  const { c } = useLang();
  const gameRef = useRef(null);
  if (!gameRef.current) gameRef.current = new Chess();

  const [board, setBoard] = useState(() => gameRef.current.board());
  const [turn, setTurn] = useState(() => gameRef.current.turn());
  const [selected, setSelected] = useState(null);
  const [targets, setTargets] = useState([]);
  const [gameOver, setGameOver] = useState(null); // { reason, winner } | null

  const syncFromGame = () => {
    const game = gameRef.current;
    setBoard(game.board());
    setTurn(game.turn());
    setSelected(null);
    setTargets([]);
    if (game.isCheckmate()) {
      setGameOver({ reason: "checkmate", winner: game.turn() === "w" ? "b" : "w" });
    } else if (game.isStalemate()) {
      setGameOver({ reason: "stalemate" });
    } else if (game.isDraw()) {
      setGameOver({ reason: "draw" });
    } else {
      setGameOver(null);
    }
  };

  const newGame = () => {
    gameRef.current.reset();
    syncFromGame();
  };

  const selectSquare = (square) => {
    const game = gameRef.current;
    const piece = game.get(square);
    if (!piece || piece.color !== game.turn()) return;
    setSelected(square);
    setTargets(game.moves({ square, verbose: true }).map((m) => m.to));
  };

  const onSquareClick = (square) => {
    if (gameOver) return;
    const game = gameRef.current;

    if (selected && targets.includes(square)) {
      try {
        game.move({ from: selected, to: square, promotion: "q" });
        syncFromGame();
      } catch {
        setSelected(null);
        setTargets([]);
      }
      return;
    }

    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      selectSquare(square);
    } else {
      setSelected(null);
      setTargets([]);
    }
  };

  const kingSquare = (color) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const sq = board[row][col];
        if (sq && sq.type === "k" && sq.color === color) return toSquare(row, col);
      }
    }
    return null;
  };

  const inCheckSquare = gameRef.current.isCheck() ? kingSquare(turn) : null;

  const statusText = () => {
    if (gameOver?.reason === "checkmate") {
      return gameOver.winner === "w" ? c.chess.checkmateWhite : c.chess.checkmateBlack;
    }
    if (gameOver?.reason === "stalemate") return c.chess.stalemate;
    if (gameOver?.reason === "draw") return c.chess.draw;
    if (inCheckSquare) return turn === "w" ? c.chess.checkWhite : c.chess.checkBlack;
    return turn === "w" ? c.chess.turnWhite : c.chess.turnBlack;
  };

  return (
    <div className="h-full flex flex-col items-center p-4 gap-3 overflow-y-auto os-scroll">
      <div className="flex items-center justify-between w-full max-w-[416px]">
        <span
          className={`font-anonymous text-sm font-bold ${
            gameOver ? "text-accent-deep" : "text-ink"
          }`}
        >
          {statusText()}
        </span>
        <button
          onClick={newGame}
          className="px-3 py-1 border-2 border-line rounded-md bg-panel-soft font-anonymous text-xs font-bold text-ink hover:bg-accent-soft transition-colors cursor-pointer shrink-0"
        >
          {c.chess.newGame}
        </button>
      </div>

      <div className="grid grid-cols-8 w-full max-w-[384px] border-2 border-line shadow-[4px_4px_0_0_rgba(59,51,37,0.85)] shrink-0">
        {board.map((row, r) =>
          row.map((piece, col) => {
            const square = toSquare(r, col);
            const isDark = (r + col) % 2 === 1;
            const isSelected = selected === square;
            const isTarget = targets.includes(square);
            const isCheck = inCheckSquare === square;
            return (
              <button
                key={square}
                onClick={() => onSquareClick(square)}
                className={`relative aspect-square flex items-center justify-center cursor-pointer ${
                  isDark ? "bg-desk-deep" : "bg-panel"
                } ${isSelected ? "outline outline-2 outline-accent-deep -outline-offset-2" : ""}`}
              >
                {isCheck && (
                  <span className="absolute inset-0 bg-[#e25d33]/50 pointer-events-none" />
                )}
                {piece && (
                  <img
                    src={PIECE_IMAGES[piece.color][piece.type]}
                    alt=""
                    draggable={false}
                    className="relative max-w-[70%] max-h-[70%] object-contain [image-rendering:pixelated] drop-shadow-[1px_1px_0_rgba(59,51,37,0.4)]"
                  />
                )}
                {isTarget && !piece && (
                  <span className="pixel-dot absolute w-3 h-3 bg-accent-deep/70" />
                )}
                {isTarget && piece && (
                  <span className="absolute inset-1 outline outline-2 outline-accent-deep/80 pointer-events-none" />
                )}
              </button>
            );
          })
        )}
      </div>

      <p className="text-[11px] text-ink-soft font-inter text-center max-w-[380px]">
        {c.chess.hint}
      </p>
    </div>
  );
};

export default ChessApp;
