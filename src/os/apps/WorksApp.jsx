import { useState } from "react";
import { useLang } from "../i18n.jsx";

const WorksApp = () => {
  const { c } = useLang();
  const [active, setActive] = useState(null);
  const project = active !== null ? c.works.projects[active] : null;

  if (project) {
    return (
      <div className="p-6">
        <button
          onClick={() => setActive(null)}
          className="font-anonymous text-sm text-ink-soft hover:text-accent-deep cursor-pointer"
        >
          {c.works.back}
        </button>

        <img
          src={project.image}
          alt={project.name}
          className="mt-4 w-full rounded-md border-2 border-line shadow-[4px_4px_0_0_rgba(59,51,37,0.85)]"
        />

        <div className="mt-5 flex items-baseline justify-between">
          <h2 className="text-2xl font-anonymous font-bold text-ink">
            {project.name}
          </h2>
          <span className="text-ink-soft text-sm font-anonymous">
            {project.date}
          </span>
        </div>

        <p className="mt-3 text-ink/85 font-inter leading-relaxed">
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
  }

  return (
    <div className="p-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-anonymous font-bold text-ink">
          {c.works.title}/
        </h1>
        <p className="text-ink-soft text-xs font-anonymous">
          {c.works.subtitle}
        </p>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {c.works.projects.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setActive(i)}
            className="group text-left bg-panel-soft border-2 border-line rounded-md overflow-hidden shadow-[4px_4px_0_0_rgba(59,51,37,0.85)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(59,51,37,0.85)] transition-all cursor-pointer"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-36 object-cover object-top border-b-2 border-line group-hover:scale-[1.03] transition-transform"
            />
            <div className="p-4">
              <div className="flex items-baseline justify-between">
                <h2 className="font-anonymous font-bold text-ink">{p.name}</h2>
                <span className="text-ink-soft text-xs font-anonymous">
                  {p.date}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink/75 font-inter leading-relaxed">
                {p.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorksApp;
