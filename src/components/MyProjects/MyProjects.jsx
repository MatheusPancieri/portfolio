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
    descriptionModal:
      "In this project, I worked solely on UI/UX design. The goal was to create a clear and engaging landing page that conveys credibility and encourages conversion. I structured the content based on storytelling, visual hierarchy, and a light identity that reinforces self-growth and positivity.",
    technologies: ["Figma", "After Effects", "Photoshop"],
  },
  {
    name: "Akademia",
    date: "04/2025",
    image: AkademiaImage,
    description:
      "I designed the UI/UX for Akademia do Corpo, a fitness website focused on attracting new members. The project emphasized a bold black-and-yellow identity, clear content structure, and strategic CTAs. The final result is a responsive and engaging website that builds trust and drives conversions.",
    descriptionModal:
      "I was responsible for the UI/UX design. The challenge was to communicate energy, confidence, and action. I created a strong black-and-yellow visual identity, organized the content for easy navigation, and designed strategic CTAs to drive conversions. The final result is a responsive and impactful layout.",
    technologies: ["Figma", "After Effects", "Photoshop"],
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
    <section className="px-6 py-12 max-w-6xl mx-auto mt-20" id="projects">
      {/* Cabeçalho */}
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-white text-2xl font-anonymous font-semibold">
          My Projects
        </h2>
        <p className="text-white/40 text-base font-anonymous">
          UI/UX Design | Developer
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
                        <div className="bg-neutral-900 rounded-lg max-w-5xl mx-auto text-white p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Imagem lado esquerdo */}
                            <div className="flex items-center justify-center">
                              <img
                                src={project.image}
                                alt={project.name}
                                className="rounded-lg shadow-2xl border border-white/20 object-cover w-full h-auto"
                              />
                            </div>

                            {/* Study case lado direito */}
                            <div className="flex flex-col justify-center space-y-4">
                              <div>
                                <h2 className="text-2xl font-bold">
                                  {project.name}
                                </h2>
                                <p className="text-sm text-gray-400">
                                  {project.date}
                                </p>
                              </div>

                              <p className="text-gray-300 leading-relaxed">
                                {project.descriptionModal}
                              </p>

                              <div>
                                <h3 className="text-sm font-semibold text-gray-200">
                                  Tools
                                </h3>
                                <p className="text-sm text-gray-400">
                                  {project.technologies.join(", ")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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
            {index !== projects.length && (
              <div className="border-t border-white/20 w-full"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Projects;
