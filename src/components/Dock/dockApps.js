import {
  VSCODE,
  VISUAL_STUDIO,
  FIGMA,
  CLAUDE,
  AFTER_EFFECTS,
  PREMIERE,
  PHOTOSHOP,
} from "../PixelIcon/pixelArt.js";

// Tools shown in the desktop dock, one group per profile. To add a tool,
// draw its 16x16 icon in pixelArt.js and add an entry here.
export const DOCK_GROUPS = [
  {
    id: "dev",
    apps: [
      { name: "VS Code", art: VSCODE },
      { name: "Visual Studio", art: VISUAL_STUDIO },
      { name: "Figma", art: FIGMA },
      { name: "Claude", art: CLAUDE },
    ],
  },
  {
    id: "edit",
    apps: [
      { name: "After Effects", art: AFTER_EFFECTS },
      { name: "Premiere Pro", art: PREMIERE },
      { name: "Photoshop", art: PHOTOSHOP },
    ],
  },
];
