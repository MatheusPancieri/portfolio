import React from "react";

const ExperienceItem = ({ exp }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-end">
      <div className="flex gap-2 items-end">
        {exp.companyLogo && (
          <img
            src={exp.companyLogo}
            alt={exp.title}
            className="rounded-lg w-8 h-8"
          />
        )}
        <h2 className="text-white text-lg font-anonymous font-semibold">
          {exp.title}
        </h2>
      </div>
      <p className="text-white/40 text-base font-anonymous">{exp.period}</p>
    </div>

    <p className="text-white/80 text-sm font-anonymous leading-relaxed text-justify">
      {exp.description}
    </p>
  </div>
);

export default ExperienceItem;
