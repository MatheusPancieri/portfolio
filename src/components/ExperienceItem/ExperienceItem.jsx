const ExperienceItem = ({ exp }) => (
  <div className="relative border-l border-white/15 pl-6">
    <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-white/50" />

    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h2 className="flex items-center gap-2 text-white text-lg font-anonymous font-semibold">
        {exp.companyLogo && (
          <img
            src={exp.companyLogo}
            alt={exp.title}
            className="rounded-md w-6 h-6"
          />
        )}
        {exp.title}
      </h2>
      <p className="text-white/40 text-xs font-anonymous tracking-wide whitespace-nowrap">
        {exp.period}
      </p>
    </div>

    <p className="mt-3 text-white/70 text-sm font-anonymous leading-relaxed">
      {exp.description}
    </p>

    {exp.highlight?.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-2">
        {exp.highlight.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-anonymous text-white/60 border border-white/15 rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default ExperienceItem;
