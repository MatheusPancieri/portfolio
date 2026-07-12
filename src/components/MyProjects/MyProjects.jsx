import { Fragment, useEffect, useRef, useState } from "react";
import BlissCodeImage from "../../assets/imgs/theblisscode-show.webp";
import AkademiaImage from "../../assets/imgs/akademia-show.webp";
import Modal from "../Modal/Modal.jsx";

const projects = [
  {
    name: "The Bliss Code",
    date: "02/2025",
    image: BlissCodeImage,
    description:
      "I designed the UI/UX for The Bliss Code, a landing page in the self-development niche. I focused on a clear content structure, storytelling, and a visual identity that conveys positivity and trust.",
    descriptionModal:
      "In this project, I worked solely on UI/UX design. The goal was to create a clear and engaging landing page that conveys credibility and encourages conversion. I structured the content based on storytelling, visual hierarchy, and a light identity that reinforces self-growth and positivity.",
    technologies: ["Figma", "After Effects", "Photoshop"],
  },
  {
    name: "Akademia",
    date: "04/2025",
    image: AkademiaImage,
    description:
      "I designed the UI/UX for Akademia do Corpo, a fitness website focused on attracting new members. The project emphasized a bold black-and-yellow identity, clear content structure, and strategic CTAs.",
    descriptionModal:
      "I was responsible for the UI/UX design. The challenge was to communicate energy, confidence, and action. I created a strong black-and-yellow visual identity, organized the content for easy navigation, and designed strategic CTAs to drive conversions. The final result is a responsive and impactful layout.",
    technologies: ["Figma", "After Effects", "Photoshop"],
  },
];

const PREVIEW_WIDTH = 460;
const PREVIEW_HEIGHT = 260;
const CURSOR_OFFSET = 28;

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, []);

  const movePreview = (e) => {
    const el = previewRef.current;
    if (!el) return;

    let x = e.clientX + CURSOR_OFFSET;
    let y = e.clientY + CURSOR_OFFSET;

    if (x + PREVIEW_WIDTH > window.innerWidth) {
      x = e.clientX - PREVIEW_WIDTH - CURSOR_OFFSET;
    }
    if (y + PREVIEW_HEIGHT > window.innerHeight) {
      y = e.clientY - PREVIEW_HEIGHT - CURSOR_OFFSET;
    }

    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      className="px-6 py-12 max-w-6xl mx-auto mt-20"
      id="projects"
      onMouseMove={movePreview}
    >
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-white text-2xl font-anonymous font-semibold">
          My Projects
        </h2>
        <p className="text-white/40 text-base font-anonymous">
          UI/UX Design | Developer
        </p>
      </div>

      <hr className="border-white/20 mb-8" />

      <div className="font-anonymous text-white text-xl">
        {projects.map((project, index) => (
          <Fragment key={project.name}>
            <button
              onClick={() => openLightbox(index)}
              onMouseEnter={(e) => {
                setHoveredIndex(index);
                movePreview(e);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className="w-full flex justify-between items-center py-4 text-left cursor-pointer transition-colors hover:text-white/70"
            >
              <span>{project.name}</span>
              <span className="text-white/50 text-sm">{project.date}</span>
            </button>
            {index !== projects.length - 1 && (
              <div className="border-t border-white/20 w-full"></div>
            )}
          </Fragment>
        ))}
      </div>

      <div
        ref={previewRef}
        className={`pointer-events-none fixed top-0 left-0 z-40 flex gap-4 transition-opacity duration-150 ${
          hoveredIndex !== null ? "opacity-100" : "opacity-0"
        }`}
        style={{ width: PREVIEW_WIDTH }}
      >
        {hoveredIndex !== null && (
          <>
            <img
              src={projects[hoveredIndex].image}
              alt=""
              className="w-64 h-40 object-cover rounded-lg shadow-2xl border border-white/20 flex-shrink-0"
            />
            <p className="self-center text-sm text-white/80 leading-relaxed font-anonymous">
              {projects[hoveredIndex].description}
            </p>
          </>
        )}
      </div>

      {activeIndex !== null && (
        <Modal open={lightboxOpen} onClose={() => setLightboxOpen(false)}>
          <div className="bg-neutral-900 rounded-lg max-w-5xl mx-auto text-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center">
                <img
                  src={projects[activeIndex].image}
                  alt={projects[activeIndex].name}
                  className="rounded-lg shadow-2xl border border-white/20 object-cover w-full h-auto"
                />
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {projects[activeIndex].name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {projects[activeIndex].date}
                  </p>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {projects[activeIndex].descriptionModal}
                </p>

                <div>
                  <h3 className="text-sm font-semibold text-gray-200">
                    Tools
                  </h3>
                  <p className="text-sm text-gray-400">
                    {projects[activeIndex].technologies.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Projects;
