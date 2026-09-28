import HomeApp from "./HomeApp.jsx";
import AboutApp from "./AboutApp.jsx";
import WorksApp from "./WorksApp.jsx";
import ProjectNotesApp from "./ProjectNotesApp.jsx";
import NotepadApp from "./NotepadApp.jsx";
import ContactApp from "./ContactApp.jsx";
import ChessApp from "./ChessApp.jsx";
import { LINKS } from "../../utils/content.js";
import { EDITOR_LINKS } from "../../utils/editorContent.js";
import IconImg from "../IconImg.jsx";
import PixelAppIcon from "../PixelIcon/PixelAppIcon.jsx";
import { YTJOBS } from "../PixelIcon/pixelArt.js";
import questionBookIcon from "../../assets/icons/question-book.webp";
import personIcon from "../../assets/icons/person.webp";
import folderIcon from "../../assets/icons/folder.webp";
import notesIcon from "../../assets/icons/notes.webp";
import writeMachineIcon from "../../assets/icons/write-machine.webp";
import githubIcon from "../../assets/icons/github.webp";
import discordIcon from "../../assets/icons/discord.webp";
import linkedinIcon from "../../assets/icons/linkedin.webp";
import chessIcon from "../../assets/icons/chess.webp";

// Desktop apps per profile (null = every visible app not marked `only` for
// another profile). A list also sets the order, on the desktop and the
// mobile grid. The editor profile keeps it minimal: its works live on the
// desktop itself (WorksCarousel).
const PROFILE_APPS = { dev: null, editor: ["discord", "about", "ytjobs"] };

export const desktopApps = (profile) => {
  const visible = APPS.filter((a) => !a.hidden && (!a.only || a.only === profile));
  const list = PROFILE_APPS[profile];
  return list ? list.map((id) => visible.find((a) => a.id === id)).filter(Boolean) : visible;
};

// HomeApp and WorksApp import APPS back from this file, so their Component
// is read through a getter (at render time) rather than while this module
// evaluates — otherwise whichever side of the cycle loads first can hit the
// other uninitialized (it breaks under Vite hot reload).
export const APPS = [
  {
    id: "home",
    label: (c) => c.desktop.apps.home,
    Icon: IconImg(questionBookIcon),
    get Component() {
      return HomeApp;
    },
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
    get Component() {
      return WorksApp;
    },
    w: 760,
    h: 580,
  },
  {
    id: "project-notes",
    label: (c) => c.works.bioFile,
    Icon: IconImg(notesIcon),
    Component: ProjectNotesApp,
    w: 600,
    h: 620,
    hidden: true,
  },
  {
    id: "notes",
    label: (c) => c.desktop.apps.notes,
    Icon: IconImg(notesIcon),
    Component: NotepadApp,
    w: 480,
    h: 520,
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
    id: "ytjobs",
    label: (c) => c.desktop.apps.ytjobs,
    Icon: PixelAppIcon(YTJOBS),
    external: EDITOR_LINKS.ytjobs,
    only: "editor",
    // Without a link there's nothing to open (and no window to fall back to).
    hidden: !EDITOR_LINKS.ytjobs,
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
