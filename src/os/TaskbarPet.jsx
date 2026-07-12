import { useRef, useState } from "react";
import { useLang } from "./i18n.jsx";
import petIdle from "../assets/pet/pet-idle.png";
import petHop from "../assets/pet/pet-hop.png";
import petHappy from "../assets/pet/pet-happy.png";
import petParty from "../assets/pet/pet-party.png";

const SIZE = 40; // displayed frame size (source cells are 64px)

const SHEETS = {
  idle: { src: petIdle, frames: 4 },
  happy: { src: petHappy, frames: 4 },
  party: { src: petParty, frames: 4 },
  hop: { src: petHop, frames: 6 },
};

// A little taskbar creature that collects clicks.
const TaskbarPet = () => {
  const { c } = useLang();
  const [score, setScore] = useState(
    () => Number(localStorage.getItem("pet-score")) || 0
  );
  const [hopping, setHopping] = useState(false);
  const [pops, setPops] = useState([]);
  const popId = useRef(0);

  const mood = score >= 100 ? "party" : score >= 25 ? "happy" : "idle";
  const anim = hopping ? "hop" : mood;
  const sheet = SHEETS[anim];

  const feed = () => {
    const next = score + 1;
    setScore(next);
    localStorage.setItem("pet-score", String(next));
    setHopping(true);

    const id = ++popId.current;
    setPops((p) => [...p, id]);
    setTimeout(() => setPops((p) => p.filter((x) => x !== id)), 700);
  };

  return (
    <button
      onClick={feed}
      title={c.taskbar.petTitle}
      className="relative flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent-soft/60 transition-colors cursor-pointer select-none"
    >
      {pops.map((id) => (
        <span
          key={id}
          className="score-pop absolute -top-1 left-4 text-xs font-anonymous font-bold text-accent-deep pointer-events-none"
        >
          +1
        </span>
      ))}

      <span
        // remount on every click so the hop restarts from frame 1
        key={hopping ? `hop-${popId.current}` : anim}
        onAnimationEnd={() => hopping && setHopping(false)}
        className={hopping ? "pet-sprite pet-play-hop" : "pet-sprite pet-loop"}
        style={{
          backgroundImage: `url(${sheet.src})`,
          backgroundSize: `${sheet.frames * SIZE}px ${SIZE}px`,
        }}
      />

      <span className="font-anonymous text-xs font-bold text-ink-soft tabular-nums">
        {score}
      </span>
    </button>
  );
};

export default TaskbarPet;
