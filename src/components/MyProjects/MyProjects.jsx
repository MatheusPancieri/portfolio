import React from "react";
// import BlissCodeImage from "../../assets/imgs/theblisscode-show.png";
// import AkademiaImage from "../../assets/imgs/akademia-show.png";
// import BaikalImage from "../../assets/imgs/baikal-show.png";
// import CdmImage from "../../assets/imgs/cdm-show.png";

const projects = [
  { name: "The Bliss Code", date: "02/2025" },
  { name: "Akademia", date: "04/2025" },
  { name: "Baikal", date: "12/2024" },
  { name: "CDM", date: "10/2024" },
];
// const projectsDetail = [
//   {
//     img: BlissCodeImage,
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie dui eget elit molestie vestibulum. Proin lobortis justo id erat suscipit, quis porta ex ornare. Ut id eleifend justo. Cras sapien eros, condimentum quis gravida aliquet, malesuada eget augue. Aliquam interdum libero turpis, quis blandit nisi luctus ac. In sit amet justo sit amet mi feugiat bibendum vel sit amet augue. Sed quis quam vel velit facilisis lacinia. Aenean tempor quam eros, fringilla lacinia turpis tempus sed. Mauris condimentum justo ex, eu elementum enim rhoncus quis. Fusce nisi magna, interdum ac nulla nec, tempor tincidunt odio. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
//   },
//   {
//     img: AkademiaImage,
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie dui eget elit molestie vestibulum. Proin lobortis justo id erat suscipit, quis porta ex ornare. Ut id eleifend justo. Cras sapien eros, condimentum quis gravida aliquet, malesuada eget augue. Aliquam interdum libero turpis, quis blandit nisi luctus ac. In sit amet justo sit amet mi feugiat bibendum vel sit amet augue. Sed quis quam vel velit facilisis lacinia. Aenean tempor quam eros, fringilla lacinia turpis tempus sed. Mauris condimentum justo ex, eu elementum enim rhoncus quis. Fusce nisi magna, interdum ac nulla nec, tempor tincidunt odio. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
//   },
//   {
//     img: BaikalImage,
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie dui eget elit molestie vestibulum. Proin lobortis justo id erat suscipit, quis porta ex ornare. Ut id eleifend justo. Cras sapien eros, condimentum quis gravida aliquet, malesuada eget augue. Aliquam interdum libero turpis, quis blandit nisi luctus ac. In sit amet justo sit amet mi feugiat bibendum vel sit amet augue. Sed quis quam vel velit facilisis lacinia. Aenean tempor quam eros, fringilla lacinia turpis tempus sed. Mauris condimentum justo ex, eu elementum enim rhoncus quis. Fusce nisi magna, interdum ac nulla nec, tempor tincidunt odio. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
//   },
//   {
//     img: CdmImage,
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie dui eget elit molestie vestibulum. Proin lobortis justo id erat suscipit, quis porta ex ornare. Ut id eleifend justo. Cras sapien eros, condimentum quis gravida aliquet, malesuada eget augue. Aliquam interdum libero turpis, quis blandit nisi luctus ac. In sit amet justo sit amet mi feugiat bibendum vel sit amet augue. Sed quis quam vel velit facilisis lacinia. Aenean tempor quam eros, fringilla lacinia turpis tempus sed. Mauris condimentum justo ex, eu elementum enim rhoncus quis. Fusce nisi magna, interdum ac nulla nec, tempor tincidunt odio. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
//   },
// ];

const Projects = () => {
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
            <button className="w-full flex justify-between items-center hover:underline cursor-pointer transition-all duration-200">
              <span className="flex items-center gap-2">
                <span className="text-white/50">▸</span>
                {project.name}
              </span>
              <span className="text-white/50 text-sm">{project.date}</span>
            </button>
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
