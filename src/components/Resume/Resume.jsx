import { div, h1, h2 } from "framer-motion/client";
import React from "react";
import Fiems from "../../assets/imgs/fiems-icon.png";
import GrupoSix from "../../assets/imgs/grupo_six_logo.webp";
import Alvorada from "../../assets/imgs/alvorada_logo.webp";
import ExperienceItem from "../ExperienceItem/ExperienceItem.jsx";
const education = [
  {
    title: "Computer Engineering – UCDB",
    period: "2022 – Expected Graduation: 2028",
    description: `
      Currently a Computer Engineering student (6th semester) at Universidade Católica 
      Dom Bosco. My academic path has given me solid foundations in software 
      development, algorithms, and systems, which I have already applied in professional 
      projects and internships. I work with multiple programming languages including 
      C#, C++, C, Java, and Python, and have knowledge in .NET, ASP.NET, Entity 
      Framework Core, SQL/MSSQL, and web technologies such as HTML and CSS. 
      Additionally, I develop UI/UX designs using Figma, focusing on functional and 
      user-friendly interfaces.
    `,
    highlight: [
      "C#",
      "C++",
      "Java",
      "Python",
      ".NET",
      "ASP.NET",
      "Entity Framework Core",
      "SQL/MSSQL",
      "HTML/CSS",
      "Figma",
    ],
  },
  {
    title: "Additional Courses – Balta.io",
    period: "2023",
    description: `
      Courses focused on .NET ecosystem, SQL Server, and programming fundamentals:
      - Fundamentals of Entity Framework | Data Access with .NET, C#, Dapper, and SQL Server
      - Fundamentals of HTML and CSS | Fundamentals of SQL Server
      - Fundamentals of Object-Oriented Programming | Fundamentals of C#
    `,
    highlight: ["Entity Framework", "C#", "SQL Server", "OOP", "HTML/CSS"],
  },
  {
    title: "Additional Course – FreeCodeCamp",
    period: "2023",
    description: `
      Completed the "Foundational C# with Microsoft" module, gaining practical 
      knowledge of C# fundamentals and object-oriented programming concepts.
    `,
    highlight: ["C#", "OOP"],
  },
  {
    title: "Additional Courses – Origamid",
    period: "2024 - 2025",
    description: `
      Courses focused on web development and design fundamentals:
      Front End & UX/UI Design
    `,
    highlight: ["UI Design", "HTML", "CSS"],
  },
];

const experiences = [
  {
    title: "Auxiliar Developer – GrupoSix",
    companyLogo: GrupoSix,
    period: "Jun 2025 – Present",
    description: `
    At GrupoSix, I have been working across different areas of web 
    development and deployment. My responsibilities include deploying 
    websites, managing files and hosting environments, configuring domains, 
    and making adjustments to existing sites. I also participate in creating 
    products and building new pages using modern technologies such as 
    Tailwind CSS, HTML, CSS, JavaScript, and React. This role has allowed me 
    to gain practical experience in both front-end development and the 
    operational side of maintaining websites in production.
  `,
    highlight: [
      "Deploy",
      "Domain configuration",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
    ],
  },
  {
    title: "Developer Intern – FIEMS",
    companyLogo: Fiems,
    period: "Aug 2024 – Jun 2025",
    description: `
      During my internship at FIEMS, I primarily contributed to the
      development team by supporting a proprietary process automation
      software. My role focused on creating and customizing workflows
      using JavaScript and jQuery, enabling the automation of internal
      processes and improving overall system usability. I also gained
      experience making small adjustments in C# and occasionally
      provided technical support to internal users. This position allowed
      me to strengthen my problem-solving skills while contributing
      directly to the efficiency of organizational operations.
    `,
    highlight: ["process automation software", "JavaScript", "jQuery", "C#"],
  },
  {
    title: "IT Intern – Alvorada Produtos Agropecuários",
    companyLogo: Alvorada,
    period: "Jul 2024 – Aug 2024",
    description: `
    During my internship at Alvorada Produtos Agropecuários, I provided 
    technical support and gained hands-on experience with IT operations. 
    My responsibilities included configuring PCs and systems to ensure 
    secure and efficient operations, diagnosing and resolving technical 
    issues to maintain business continuity, and assisting users with 
    technology-related inquiries. I also worked with tables and data 
    analysis to support informed decision-making. This role gave me a 
    solid foundation in IT support and strengthened my problem-solving 
    and communication skills.
  `,
    highlight: [
      "PC configuration",
      "Technical support",
      "Troubleshooting",
      "Data analysis",
    ],
  },
];
const Resume = () => {
  const [activeTab, setActiveTab] = React.useState("work");

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto mt-5">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-white text-2xl font-anonymous font-semibold">
          Work{" "}
          <span className="text-white/40 font-light text-2xl ml-0.5 mr-0.5">
            /
          </span>
          Education
        </h2>
        <p className="text-white/40 text-base font-anonymous">
          Software Developer | UI/UX Designer
        </p>
      </div>
      {/* Linha de separação */}
      <hr className="border-white/20 mb-8" />
      <div>
        <div className="flex justify-center gap-2">
          <button
            className={`w-80 py-2 border border-white/20 text-white rounded-l-full transition ${
              activeTab === "work" ? "bg-white/10" : "hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("work")}
          >
            Work Experience
          </button>

          <button
            className={`w-80 py-2 border border-white/20 text-white rounded-r-full transition ${
              activeTab === "education" ? "bg-white/10" : "hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("education")}
          >
            Education
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="w-160 py-4 px-6 border border-white/20 rounded-xl text-white text-center">
            {activeTab === "work" && (
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <ExperienceItem key={i} exp={exp} />
                ))}
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <ExperienceItem key={i} exp={edu} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
