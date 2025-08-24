import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import BlissCodeImage from "../../assets/imgs/theblisscode-show.png";
import AkademiaImage from "../../assets/imgs/akademia-show.png";
import Modal from "../Modal/Modal.jsx";

const projects = [
  {
    name: "The Bliss Code",
    date: "02/2025",
    image: BlissCodeImage,
    description:
      "I designed the UI/UX for The Bliss Code, a landing page in the self-development niche. I focused on a clear content structure, storytelling, and a visual identity that conveys positivity and trust. The result is a responsive, engaging, and conversion-driven page that improves user experience and credibility",
  },
  {
    name: "Akademia",
    date: "04/2025",
    image: AkademiaImage,
    description:
      "I designed the UI/UX for Akademia do Corpo, a fitness website focused on attracting new members. The project emphasized a bold black-and-yellow identity, clear content structure, and strategic CTAs. The final result is a responsive and engaging website that builds trust and drives conversions.",
  },
  {
    name: "Baikal",
    date: "12/2024",
    image: "",
    description: "Descrição do projeto Baikal...",
  },
  {
    name: "CDM",
    date: "10/2024",
    image: "",
    description: "Descrição do projeto CDM...",
  },
];

const Projects = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    projects.forEach((p) => {
      if (p.image) {
        const img = new Image();
        img.src = p.image;
      }
    });
  }, []);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleProject = (index) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);

    if (newIndex !== null) {
      setTimeout(() => {
        document.getElementById(`project-${newIndex}`)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }
  };

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto mt-20">
      {/* Cabeçalho */}
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-white text-2xl font-anonymous font-semibold">
          My Projects
        </h2>
        <p className="text-white text-base font-anonymous">
          UI/UX Design | Resume
        </p>
      </div>

      {/* Linha de separação */}
      <hr className="border-white/20 mb-8" />

      {/* Lista de projetos */}
      <div className="space-y-6 font-anonymous text-white text-xl">
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <div id={`project-${index}`}>
              <button
                onClick={() => toggleProject(index)}
                className="w-full flex justify-between items-center cursor-pointer transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <span className="text-white/50">
                    {openIndex === index ? "▾" : "▸"}
                  </span>
                  <span className="hover:underline">{project.name}</span>
                </span>
                <span className="text-white/50 text-sm">{project.date}</span>
              </button>

              {/* DropDown animado */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      height: { duration: 0.4, ease: "easeInOut" },
                      opacity: { duration: 0.25, ease: "easeOut" },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-4 border border-white/20 rounded-lg">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full md:w-1/2 rounded-lg shadow-2xl border border-white/20 object-cover cursor-pointer"
                          onClick={() => setOpen(true)}
                        />
                      )}
                      <Modal open={open} onClose={() => setOpen(false)}>
                        {" "}
                        <p className="mx-auto text-red-700">Salve</p>
                      </Modal>
                      <div className="flex flex-col justify-between md:w-1/2">
                        <h1 className="text-2xl font-bold">{project.name}</h1>
                        <p className="text-base text-white/80">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            {index !== projects.length - 1 && (
              <div className="border-t border-white/20 w-full"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Projects;
