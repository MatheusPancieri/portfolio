import { useState } from "react";
import { useLang } from "../../context/i18n.jsx";
import Lightbox from "../Lightbox/Lightbox.jsx";
import { getProjectMedia } from "../../utils/projectMedia.js";
import folderIcon from "../../assets/icons/folder.webp";
import notesIcon from "../../assets/icons/notes.webp";

const stripExt = (file) => file.replace(/\.[^./]+$/, "");

const Tile = ({ kind, src, label, onClick }) => (
  <button
    onClick={onClick}
    title={label}
    className="group flex flex-col items-center gap-1.5 w-24 p-2 rounded-md hover:bg-accent-soft/40 cursor-pointer"
  >
    {kind === "image" && (
      <img
        src={src}
        alt=""
        draggable={false}
        className="icon-bounce w-12 h-12 object-cover rounded border-2 border-line shadow-[2px_2px_0_0_rgba(59,51,37,0.6)]"
      />
    )}
    {kind === "video" && (
      <span className="icon-bounce w-12 h-12 flex items-center justify-center rounded border-2 border-line bg-ink text-panel text-lg shadow-[2px_2px_0_0_rgba(59,51,37,0.6)]">
        ▶
      </span>
    )}
    {(kind === "folder" || kind === "text") && (
      <img
        src={kind === "folder" ? folderIcon : notesIcon}
        alt=""
        draggable={false}
        className="icon-bounce w-11 h-11 drop-shadow-[2px_2px_0_rgba(59,51,37,0.25)]"
      />
    )}
    <span className="w-full break-words text-xs font-anonymous text-ink text-center leading-tight px-1 rounded group-hover:bg-accent/60">
      {label}
    </span>
  </button>
);

const Breadcrumb = ({ items }) => (
  <div className="flex items-center gap-1.5 font-anonymous text-sm flex-wrap">
    {items.map((item, i) => {
      const isLast = i === items.length - 1;
      return (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-ink-soft">/</span>}
          {isLast || !item.onClick ? (
            <span className="text-ink">{item.label}</span>
          ) : (
            <button
              onClick={item.onClick}
              className="text-ink-soft hover:text-accent-deep cursor-pointer"
            >
              {item.label}
            </button>
          )}
        </span>
      );
    })}
  </div>
);

const WorksApp = () => {
  const { c } = useLang();
  const [activeIdx, setActiveIdx] = useState(null);
  const [showBio, setShowBio] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const project = activeIdx !== null ? c.works.projects[activeIdx] : null;
  const media = project ? getProjectMedia(project.folder) : [];

  const openFolder = (i) => {
    setActiveIdx(i);
    setShowBio(false);
  };
  const backToRoot = () => {
    setActiveIdx(null);
    setShowBio(false);
  };
  const backToFolder = () => setShowBio(false);

  // ---- Root: project folders ----
  if (!project) {
    return (
      <div className="p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h1 className="text-xl font-anonymous font-bold text-ink">
            {c.works.title}/
          </h1>
          <p className="text-ink-soft text-xs font-anonymous whitespace-nowrap">
            {c.works.subtitle}
          </p>
        </div>
        <p className="mt-1 text-xs text-ink-soft font-inter leading-relaxed">
          {c.works.note}
        </p>

        <div className="mt-5 flex flex-wrap gap-1">
          {c.works.projects.map((p, i) => (
            <Tile key={p.name} kind="folder" label={p.name} onClick={() => openFolder(i)} />
          ))}
        </div>
      </div>
    );
  }

  // ---- Bio.txt notepad view ----
  if (showBio) {
    return (
      <div className="p-6">
        <Breadcrumb
          items={[
            { label: c.works.title, onClick: backToRoot },
            { label: project.name, onClick: backToFolder },
            { label: c.works.bioFile },
          ]}
        />

        <div className="mt-4 border-2 border-line rounded-md bg-panel-soft shadow-[4px_4px_0_0_rgba(59,51,37,0.85)] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-line bg-panel">
            <img src={notesIcon} alt="" className="w-4 h-4" />
            <span className="font-anonymous text-xs font-bold text-ink">
              {c.works.bioFile}
            </span>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto os-scroll">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h2 className="text-xl font-anonymous font-bold text-ink">
                {project.name}
              </h2>
              <span className="text-ink-soft text-sm font-anonymous whitespace-nowrap">
                {project.date}
              </span>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-anonymous font-bold text-accent-deep hover:text-ink underline underline-offset-2"
              >
                {c.works.visitSite} ↗
              </a>
            )}

            <p className="mt-3 text-ink/85 font-inter leading-relaxed whitespace-pre-line">
              {project.descriptionFull}
            </p>

            <h3 className="mt-5 text-xs font-anonymous font-bold uppercase tracking-widest text-ink-soft">
              {c.works.tools}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="text-xs font-anonymous text-ink bg-accent-soft border border-line/40 rounded-full px-2.5 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>

            {media.length > 0 && (
              <>
                <h3 className="mt-5 text-xs font-anonymous font-bold uppercase tracking-widest text-ink-soft">
                  {c.works.media}
                </h3>
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {media.map((m) => (
                    <button
                      key={m.file}
                      onClick={() => setLightbox(m)}
                      title={c.works.zoomHint}
                      className="cursor-zoom-in"
                    >
                      {m.type === "video" ? (
                        <span className="flex items-center justify-center w-full aspect-square rounded border-2 border-line bg-ink text-panel text-xl shadow-[2px_2px_0_0_rgba(59,51,37,0.6)]">
                          ▶
                        </span>
                      ) : (
                        <img
                          src={m.url}
                          alt=""
                          className="w-full aspect-square object-cover rounded border-2 border-line shadow-[2px_2px_0_0_rgba(59,51,37,0.6)] hover:brightness-95 transition-[filter]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {lightbox && (
          <Lightbox
            src={lightbox.url}
            alt={project.name}
            type={lightbox.type}
            closeLabel={c.works.close}
            onClose={() => setLightbox(null)}
          />
        )}
      </div>
    );
  }

  // ---- Folder: files inside the project (media + Bio.txt) ----
  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: c.works.title, onClick: backToRoot },
          { label: project.name },
        ]}
      />

      <div className="mt-5 flex flex-wrap gap-1">
        <Tile kind="text" label={c.works.bioFile} onClick={() => setShowBio(true)} />
        {media.map((m) => (
          <Tile
            key={m.file}
            kind={m.type}
            src={m.url}
            label={stripExt(m.file)}
            onClick={() => setLightbox(m)}
          />
        ))}
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.url}
          alt={project.name}
          type={lightbox.type}
          closeLabel={c.works.close}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
};

export default WorksApp;
