import HomeApp from "./apps/HomeApp.jsx";
import AboutApp from "./apps/AboutApp.jsx";
import WorksApp from "./apps/WorksApp.jsx";
import ContactApp from "./apps/ContactApp.jsx";
import ChessApp from "./apps/ChessApp.jsx";
import { LINKS } from "./content.js";
import IconImg from "./IconImg.jsx";
import notesIcon from "../assets/icons/notes.webp";
import personIcon from "../assets/icons/person.webp";
import folderIcon from "../assets/icons/folder.webp";
import writeMachineIcon from "../assets/icons/write-machine.webp";
import githubIcon from "../assets/icons/github.webp";
import chessIcon from "../assets/icons/chess.webp";

export const APPS = [
  {
    id: "home",
    label: (c) => c.desktop.apps.home,
    Icon: IconImg(notesIcon),
    Component: HomeApp,
    w: 520,
    h: 560,
  },
  {
    id: "about",
    label: (c) => c.desktop.apps.about,
    Icon: IconImg(personIcon),
    Component: AboutApp,
    w: 680,
    h: 600,
  },
  {
    id: "works",
    label: (c) => c.desktop.apps.works,
    Icon: IconImg(folderIcon),
    Component: WorksApp,
    w: 760,
    h: 580,
  },
  {
    id: "contact",
    label: (c) => c.desktop.apps.contact,
    Icon: IconImg(writeMachineIcon),
    Component: ContactApp,
    w: 480,
    h: 620,
  },
  {
    id: "github",
    label: (c) => c.desktop.apps.github,
    Icon: IconImg(githubIcon),
    external: LINKS.github,
  },
  {
    id: "chess",
    label: (c) => c.desktop.apps.chess,
    Icon: IconImg(chessIcon),
    Component: ChessApp,
    w: 420,
    h: 480,
  },
];
