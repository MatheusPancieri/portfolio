// Pixel-art icons (dock tools, profiles), drawn to match the desktop's 8-bit
// icons. Each row is a string, one char per pixel: "." is empty, any other
// char is looked up in the palette. Only the fill is drawn here — PixelIcon
// adds the 1px black outline around the silhouette.

const ADOBE_BORDER = [
  "................",
  "..ffffffffffff..",
];

// Adobe-style tile: 12x12 inner area, letters passed as the 7 text rows
// (rows 4-10), each 12 chars wide.
const adobeTile = (textRows, colors) => {
  const inner = (content) => `.f${content}f.`;
  const blank = inner("dddddddddddd");
  return {
    palette: colors,
    rows: [
      ...ADOBE_BORDER,
      blank,
      blank,
      ...textRows.map(inner),
      blank,
      blank,
      blank,
      ADOBE_BORDER[1],
      ADOBE_BORDER[0],
    ],
  };
};

export const PREMIERE = adobeTile(
  [
    "ddfffddddddd",
    "ddfddfdddddd",
    "ddfddfdfdffd",
    "ddfffddffddd",
    "ddfddddfdddd",
    "ddfddddfdddd",
    "ddfddddfdddd",
  ],
  { f: "#9999ff", d: "#00005b" },
);

export const AFTER_EFFECTS = adobeTile(
  [
    "dddffddddddd",
    "ddfddfdddddd",
    "ddfddfddffdd",
    "ddffffdfddfd",
    "ddfddfdffffd",
    "ddfddfdfdddd",
    "ddfddfddfffd",
  ],
  { f: "#9999ff", d: "#00005b" },
);

export const PHOTOSHOP = adobeTile(
  [
    "ddfffddddddd",
    "ddfddfdddddd",
    "ddfddfddfffd",
    "ddfffddfdddd",
    "ddfdddddffdd",
    "ddfdddddddfd",
    "ddfddddfffdd",
  ],
  { f: "#31a8ff", d: "#001e36" },
);

// Band on the right, two crossing arms, the stubs on the left.
export const VSCODE = {
  palette: { L: "#1f9cf0", M: "#007acc", D: "#0065a9" },
  rows: [
    "................",
    "..........DLLL..",
    ".........DDLLLL.",
    "..M.....DDDLLLL.",
    ".MMM...DDD.LLLL.",
    ".MMMM.DDD..LLLL.",
    "..MMMMMD...LLLL.",
    "...MMMM....LLLL.",
    "...MMMM....LLLL.",
    "..DDMMMM...LLLL.",
    ".DDDD.MMM..LLLL.",
    ".DDD...MMM.LLLL.",
    "..D.....MMMLLLL.",
    ".........MMLLLL.",
    "..........MLLL..",
    "................",
  ],
};

// Same construction as VS Code, but the left side closes into a loop.
export const VISUAL_STUDIO = {
  palette: { L: "#b179f1", M: "#865fc5", D: "#5c2d91" },
  rows: [
    "................",
    "..........DLLL..",
    ".........DDLLLL.",
    ".M......DDDLLLL.",
    ".MM....DDD.LLLL.",
    ".MMM..DDD..LLLL.",
    ".M.MMDDD...LLLL.",
    ".M..MMM....LLLL.",
    ".M..MMM....LLLL.",
    ".M.MMMMM...LLLL.",
    ".MMM..MMM..LLLL.",
    ".MM....MMM.LLLL.",
    ".M......MMMLLLL.",
    ".........MMLLLL.",
    "..........MLLL..",
    "................",
  ],
};

export const FIGMA = {
  palette: { R: "#f24e1e", O: "#ff7262", P: "#a259ff", B: "#1abcfe", G: "#0acf83" },
  rows: [
    "................",
    "................",
    ".....RRROOO.....",
    "....RRRROOOO....",
    "....RRRROOOO....",
    ".....RRROOO.....",
    ".....PPP.BB.....",
    "....PPPPBBBB....",
    "....PPPPBBBB....",
    ".....PPP.BB.....",
    ".....GGG........",
    "....GGGG........",
    "....GGGG........",
    ".....GG.........",
    "................",
    "................",
  ],
};

export const CLAUDE = {
  palette: { C: "#d97757", c: "#f0a283" },
  rows: [
    "................",
    ".......CC.......",
    "..C....CC....C..",
    "..CC...CC...CC..",
    "...CC..CC..CC...",
    "....CC.CC.CC....",
    ".....CCccCC.....",
    ".CCCCCccccCCCCC.",
    ".CCCCCccccCCCCC.",
    ".....CCccCC.....",
    "....CC.CC.CC....",
    "...CC..CC..CC...",
    "..CC...CC...CC..",
    "..C....CC....C..",
    ".......CC.......",
    "................",
  ],
};

// Profile button (taskbar / mobile status bar): line art in the text color.
export const USER = {
  outline: false,
  palette: { k: "currentColor" },
  rows: [
    "....kkk....",
    "...kk.kk...",
    "..kk...kk..",
    "..k.....k..",
    "..kk...kk..",
    "...kk.kk...",
    "....kkk....",
    "...........",
    ".kkkkkkkkk.",
    "kk.......kk",
    "k.........k",
    "k.........k",
    "kkkkkkkkkkk",
  ],
};

// Welcome-screen profiles. Dev: a beige computer with an amber prompt.
export const PROFILE_DEV = {
  palette: { C: "#fbf7ea", D: "#c9bfa5", S: "#2a2418", G: "#f5a302", R: "#e25d33" },
  rows: [
    "................",
    ".CCCCCCCCCCCCCC.",
    ".CSSSSSSSSSSSSD.",
    ".CSSGSSSSSSSSSD.",
    ".CSSSGSSSSSSSSD.",
    ".CSSSSGSSSSSSSD.",
    ".CSSSGSSSSSSSSD.",
    ".CSSGSSSGGGGSSD.",
    ".CSSSSSSSSSSSSD.",
    ".CDDDDDDDDDDDDD.",
    ".DDDDDDDDDDDRDD.",
    "................",
    "......DDDD......",
    "...DDDDDDDDDD...",
    "...DDDDDDDDDD...",
    "................",
  ],
};

// Editor: a clapperboard, amber/ink stripes over a slate.
export const PROFILE_EDITOR = {
  palette: { A: "#f5a302", I: "#2a2418", D: "#3b3325", W: "#fbf7ea" },
  rows: [
    "................",
    "..........AIIAA.",
    "......IAAIIAAII.",
    ".IIAAIIAA.......",
    ".AAII...........",
    "................",
    ".AAIIAAIIAAIIAA.",
    ".AIIAAIIAAIIAAI.",
    ".DDDDDDDDDDDDDD.",
    ".DWWWWWDWWWWWWD.",
    ".DDDDDDDDDDDDDD.",
    ".DWWWWWDWWWWWWD.",
    ".DDDDDDDDDDDDDD.",
    ".DDDDDDDDDDDDDD.",
    "................",
    "................",
  ],
};

// ytjobs.co desktop app (editor profile): a YouTube-red briefcase with the
// play button on it.
export const YTJOBS = {
  palette: { D: "#3b3325", H: "#ff5a6e", R: "#f2002a", r: "#b3001b", W: "#ffffff" },
  rows: [
    "................",
    "................",
    "................",
    ".....DDDDDD.....",
    ".....D....D.....",
    ".HHHHHHHHHHHHHH.",
    ".RRRRRRRRRRRRRR.",
    ".RRRRRWRRRRRRRR.",
    ".RRRRRWWWRRRRRR.",
    ".RRRRRWWWWRRRRR.",
    ".RRRRRWWWRRRRRR.",
    ".RRRRRWRRRRRRRR.",
    ".RRRRRRRRRRRRRR.",
    ".rrrrrrrrrrrrrr.",
    "................",
    "................",
  ],
};
