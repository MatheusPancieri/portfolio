import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useLang } from "../../context/i18n.jsx";
import { LINKS } from "../../utils/content.js";

const TimelineItem = ({ item }) => (
  <div className="relative border-l-2 border-line/30 pl-5 pb-2">
    <span className="absolute -left-[9px] top-0 h-4 w-4">
      <span className="pixel-dot absolute inset-0 bg-line" />
      <span className="pixel-dot absolute inset-[2px] bg-accent" />
    </span>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h3 className="flex items-center gap-2 text-ink font-anonymous font-bold">
        {item.companyLogo && (
          <img
            src={item.companyLogo}
            alt=""
            className="rounded w-5 h-5 border border-line/30"
          />
        )}
        {item.title}
      </h3>
      <p className="text-ink-soft text-xs font-anonymous whitespace-nowrap">
        {item.period}
      </p>
    </div>
    <p className="mt-2 text-ink/80 text-sm font-inter leading-relaxed whitespace-pre-line">
      {item.description}
    </p>
    <div className="mt-2 flex flex-wrap gap-1.5">
      {item.highlight.map((tag) => (
        <span
          key={tag}
          className="text-[11px] font-anonymous text-ink border border-line/40 bg-panel-soft rounded-full px-2 py-0.5"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const AboutApp = () => {
  const { c } = useLang();
  const [tab, setTab] = useState("bio");
  const tabs = ["bio", "work", "education"];

  return (
    <div className="p-6">
      <div className="flex items-end gap-3">
        <h1 className="text-3xl font-anonymous font-bold text-ink">
          {c.about.name}
        </h1>
        <span className="text-ink-soft text-sm font-anonymous mb-1">
          {c.about.age}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-anonymous font-bold uppercase tracking-wide border-2 border-line rounded-md transition-all cursor-pointer ${
              tab === t
                ? "bg-accent text-ink shadow-[2px_2px_0_0_rgba(59,51,37,0.85)]"
                : "bg-panel-soft text-ink-soft hover:bg-accent-soft"
            }`}
          >
            {c.about.tabs[t]}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "bio" && (
          <div>
            <p className="text-ink/90 font-inter leading-relaxed">
              {c.about.bio}
            </p>
            <div className="mt-6 flex flex-col gap-2 font-anonymous text-sm">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ink hover:text-accent-deep w-fit"
              >
                <FaGithub /> github.com/MatheusPancieri
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ink hover:text-accent-deep w-fit"
              >
                <FaLinkedin /> linkedin.com/in/Matheus-Pancieri
              </a>
              <a
                href={`mailto:${LINKS.email}`}
                className="flex items-center gap-2 text-ink hover:text-accent-deep w-fit"
              >
                <FaEnvelope /> {LINKS.email}
              </a>
            </div>
          </div>
        )}
        {tab === "work" && (
          <div className="space-y-6">
            {c.about.experiences.map((item) => (
              <TimelineItem key={item.title} item={item} />
            ))}
          </div>
        )}
        {tab === "education" && (
          <div className="space-y-6">
            {c.about.education.map((item) => (
              <TimelineItem key={item.title} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutApp;
