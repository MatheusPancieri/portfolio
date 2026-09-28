import { useEffect, useState } from "react";
import { FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { toSeconds, toTimecode } from "../timecode.js";
import { hasVideo, videoEmbedUrl, videoThumbUrl } from "../../../utils/videoEmbed.js";

// Program monitor: click-to-load YouTube/Drive embed (no iframe/cookies until the
// visitor presses play), with a slate placeholder while a project has no link.
const Monitor = ({ project, lang, t, typeLabel, onPrev, onNext }) => {
  const [playing, setPlaying] = useState(false);

  // Loading a different clip stops the current one.
  useEffect(() => setPlaying(false), [project.id]);

  const title = project.title[lang];
  const ready = hasVideo(project);

  return (
    <div className={`ed-panel ed-monitor ed-label-${project.type} flex flex-col`}>
      <div className="ed-panel-head">
        <span className="truncate">
          {t.program}: <span className="text-ed-ink">{title}</span>
        </span>
        <span className="ed-tag shrink-0">{typeLabel}</span>
      </div>

      <div className="relative aspect-video bg-black overflow-hidden">
        {ready && playing ? (
          <iframe
            className={`absolute inset-y-0 h-full ${
              project.vertical ? "left-1/2 -translate-x-1/2 aspect-[9/16]" : "inset-x-0 w-full"
            }`}
            src={videoEmbedUrl(project, { autoplay: true })}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : ready ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full cursor-pointer"
            aria-label={`${t.play}: ${title}`}
          >
            <img
              src={videoThumbUrl(project)}
              referrerPolicy="no-referrer"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <span className="ed-play-btn">
              <FaPlay />
            </span>
          </button>
        ) : (
          <Slate title={title} label={t.placeholder} />
        )}
        <span className="ed-safe-area" aria-hidden="true" />
      </div>

      <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-ed-line">
        <span className="font-anonymous text-ed-accent tabular-nums text-sm">
          {toTimecode(0)}
        </span>
        <div className="flex items-center gap-1">
          <button type="button" className="ed-transport" onClick={onPrev} aria-label={t.prev}>
            <FaStepBackward />
          </button>
          <button
            type="button"
            className="ed-transport"
            onClick={() => setPlaying(true)}
            disabled={!ready}
            aria-label={t.play}
          >
            <FaPlay />
          </button>
          <button type="button" className="ed-transport" onClick={onNext} aria-label={t.next}>
            <FaStepForward />
          </button>
        </div>
        <span className="font-anonymous text-ed-muted tabular-nums text-sm">
          {toTimecode(toSeconds(project.duration))}
        </span>
      </div>
    </div>
  );
};

// SMPTE-style color bars + a clapper slate
const Slate = ({ title, label }) => (
  <div className="absolute inset-0 flex flex-col">
    <div className="flex flex-[3]">
      {["#c0c0c0", "#c0c000", "#00c0c0", "#00c000", "#c000c0", "#c00000", "#0000c0"].map((c) => (
        <span key={c} className="flex-1 opacity-35" style={{ background: c }} />
      ))}
    </div>
    <div className="flex-1 bg-[#0d0b08]" />
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="bg-ed-bg/90 border-2 border-ed-line px-5 py-4 text-center shadow-[4px_4px_0_0_rgba(0,0,0,0.6)] max-w-[80%]">
        <p className="font-anonymous text-ed-ink text-lg sm:text-2xl leading-tight">{title}</p>
        <p className="font-inter text-ed-muted text-xs sm:text-sm mt-2">
          {label}
        </p>
      </div>
    </div>
  </div>
);

export default Monitor;
