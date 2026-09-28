import { useLang } from "../../context/i18n.jsx";
import PixelIcon from "../PixelIcon/PixelIcon.jsx";
import { PROFILE_DEV, PROFILE_EDITOR } from "../PixelIcon/pixelArt.js";
import signature from "../../assets/imgs/assinaturaMatheus.svg";
import globeIcon from "../../assets/icons/globe.webp";

// Welcome screen after the Windows XP log-on, in the OS palette: dark bands
// top and bottom, the signature left of a fading divider, profiles on the
// right, language where XP has "Turn off computer". Shown on every visit
// before the desktop (see DesktopPage.jsx).
const PROFILES = [
  { id: "dev", art: PROFILE_DEV },
  { id: "editor", art: PROFILE_EDITOR },
];

const ProfileSelect = ({ onSelect }) => {
  const { c, toggleLang } = useLang();

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-desk">
      <div className="xp-band xp-band-top" />

      <div className="xp-stage relative flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 px-6 py-8 overflow-y-auto">
        <div className="grain-layer" />

        <div className="relative md:flex-1 flex md:justify-end md:pr-14">
          <img
            src={signature}
            alt="Matheus Pancieri"
            className="w-40 md:w-60 opacity-90 select-none"
            draggable={false}
          />
        </div>

        <div className="xp-divider hidden md:block" />

        <div className="relative md:flex-1 w-full max-w-sm md:max-w-none md:pl-10">
          <div className="flex flex-col gap-2 md:max-w-sm">
            {PROFILES.map((p) => (
              <button key={p.id} type="button" onClick={() => onSelect(p.id)} className="xp-user">
                <span className="xp-user-pic">
                  <PixelIcon art={p.art} className="w-11 h-11" />
                </span>
                <span className="min-w-0">
                  <span className="block font-anonymous text-xl text-ink">{c.profile[p.id].name}</span>
                  <span className="block font-inter text-sm text-ink-soft mt-0.5">{c.profile[p.id].role}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="xp-band xp-band-bottom flex items-center px-6">
        <button type="button" onClick={toggleLang} className="xp-power">
          <span className="xp-power-icon">
            <img src={globeIcon} alt="" className="w-5 h-5" draggable={false} />
          </span>
          <span className="xp-power-label">{c.profile.language}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSelect;
