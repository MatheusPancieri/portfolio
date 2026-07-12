import assinaturaMatheus from "../../assets/imgs/assinaturaMatheus.svg";

const links = [
  { label: "About Me", href: "#about" },
  { label: "My Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
];

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-30 flex h-screen w-64 flex-col px-8 py-10">
      <img src={assinaturaMatheus} alt="Logo assinatura Matheus" className="w-28" />

      <nav className="mt-16 border-l border-white/20 pl-6">
        <ul className="flex flex-col gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-anonymous text-sm uppercase tracking-wide text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
