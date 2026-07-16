import { useLang } from "../../context/i18n.jsx";
import { useNotes } from "../../context/NotesContext.jsx";
import { getProjectMedia } from "../../utils/projectMedia.js";
import notesIcon from "../../assets/icons/notes.webp";

const ProjectNotesApp = () => {
  const { c } = useLang();
  const { projectIdx } = useNotes();
  const project = projectIdx !== null ? c.works.projects[projectIdx] : null;

  if (!project) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center gap-2 text-center">
        <img src={notesIcon} alt="" className="w-10 h-10 opacity-50" />
        <p className="text-sm text-ink-soft font-anonymous">{c.works.empty}</p>
      </div>
    );
  }

  const images = getProjectMedia(project.folder).filter((m) => m.type === "image");

  return (
    <div className="p-5">
      {images.length > 0 && (
        project.coverBare ? (
          <div className="flex justify-center">
            <img
              src={images[0].url}
              alt={project.name}
              draggable={false}
              className="w-24 h-24 object-contain"
            />
          </div>
        ) : (
          <div className={`grid gap-3 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
            {images.map((img) => (
              <img
                key={img.file}
                src={img.url}
                alt={project.name}
                draggable={false}
                className={`w-full object-cover rounded-md border-2 border-line shadow-[4px_4px_0_0_rgba(59,51,37,0.7)] ${
                  images.length > 1 ? "aspect-square" : "aspect-video"
                }`}
              />
            ))}
          </div>
        )
      )}

      <div className={`flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 ${images.length > 0 ? "mt-4" : ""}`}>
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
    </div>
  );
};

export default ProjectNotesApp;
