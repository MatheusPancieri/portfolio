import { useState } from "react";
import { useLang } from "../../context/i18n.jsx";
import { useLaunch } from "../../context/LaunchContext.jsx";
import { useNotes } from "../../context/NotesContext.jsx";
import { APPS } from "./apps.jsx";
import folderIcon from "../../assets/icons/folder.webp";
import notesIcon from "../../assets/icons/notes.webp";

const Tile = ({ kind, label, onClick }) => (
  <button
    onClick={onClick}
    title={label}
    className="group flex flex-col items-center gap-1.5 w-24 p-2 rounded-md hover:bg-accent-soft/40 cursor-pointer"
  >
    <img
      src={kind === "folder" ? folderIcon : notesIcon}
      alt=""
      draggable={false}
      className="icon-bounce w-11 h-11 drop-shadow-[2px_2px_0_rgba(59,51,37,0.25)]"
    />
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
  const launch = useLaunch();
  const { setProjectIdx } = useNotes();
  const [activeIdx, setActiveIdx] = useState(null);

  const project = activeIdx !== null ? c.works.projects[activeIdx] : null;

  const openFolder = (i) => setActiveIdx(i);
  const backToRoot = () => setActiveIdx(null);

  const openBio = (e) => {
    setProjectIdx(activeIdx);
    const notesApp = APPS.find((a) => a.id === "project-notes");
    launch(notesApp, e.currentTarget.getBoundingClientRect());
  };

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

  // ---- Folder: files inside the project (just Bio.txt) ----
  return (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: c.works.title, onClick: backToRoot },
          { label: project.name },
        ]}
      />

      <div className="mt-5 flex flex-wrap gap-1">
        <Tile kind="text" label={c.works.bioFile} onClick={openBio} />
      </div>
    </div>
  );
};

export default WorksApp;
