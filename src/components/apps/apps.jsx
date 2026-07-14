import HomeApp from "./HomeApp.jsx";
import AboutApp from "./AboutApp.jsx";
import WorksApp from "./WorksApp.jsx";
import ContactApp from "./ContactApp.jsx";
import ChessApp from "./ChessApp.jsx";
import { LINKS } from "../../utils/content.js";
import IconImg from "../IconImg.jsx";
import questionBookIcon from "../../assets/icons/question-book.webp";
import personIcon from "../../assets/icons/person.webp";
import folderIcon from "../../assets/icons/folder.webp";
import writeMachineIcon from "../../assets/icons/write-machine.webp";
import githubIcon from "../../assets/icons/github.webp";
import discordIcon from "../../assets/icons/discord.webp";
import linkedinIcon from "../../assets/icons/linkedin.webp";
import chessIcon from "../../assets/icons/chess.webp";

export const APPS = [
  {
    id: "home",
    label: (c) => c.desktop.apps.home,
    Icon: IconImg(questionBookIcon),
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
    id: "discord",
    label: (c) => c.desktop.apps.discord,
    Icon: IconImg(discordIcon),
    copyText: LINKS.discordUsername,
    toast: (c) => c.toast.discordCopied,
  },
  {
    id: "linkedin",
    label: (c) => c.desktop.apps.linkedin,
    Icon: IconImg(linkedinIcon),
    external: LINKS.linkedin,
  },
  {
    id: "chess",
    label: (c) => c.desktop.apps.chess,
    Icon: IconImg(chessIcon),
    Component: ChessApp,
    w: 460,
    h: 560,
  },
];
