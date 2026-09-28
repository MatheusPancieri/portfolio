// Content overrides for the "editor" profile. Only the sections that change
// live here — everything else (contact, chess, experience...) comes from
// content.js as-is. i18n.jsx merges these on top section by section.
//
// Works projects come from EDITOR_PROJECTS in editorContent.js, the same
// list the /editor page uses: add a video there and it shows up in both.
import { EDITOR_CONTENT, EDITOR_PROJECTS } from './editorContent.js';
import { getBanner } from './projectMedia.js';

const worksProjects = (lang) =>
  EDITOR_PROJECTS.map((p) => ({
    name: p.title[lang],
    banner: getBanner(p.id),
    date: `${p.client[lang]} · ${p.duration}`,
    video: true,
    youtube: p.youtube,
    drive: p.drive,
    vertical: p.vertical,
    description: p.description[lang],
    descriptionFull: `${p.role[lang]}.\n\n${p.description[lang]}`,
    technologies: p.tools,
  }));

const en = {
  home: {
    role: 'Video Editor · Long-form, shorts & ads',
    intro:
      'Welcome to my desktop, editor edition. Everything here works like a tiny operating system, open the apps to see what I cut and how I work.',
    shortcuts: {
      about: 'Who I am, experience & education',
      works: "Videos I've edited",
      contact: 'Send me your footage',
    },
  },
  about: {
    bio: EDITOR_CONTENT.en.about.body.join(' '),
  },
  works: {
    subtitle: 'Video Editor | Motion',
    note: "A selection of videos I've edited: long-form, shorts and ads.",
    bioFile: 'Cut.txt',
  },
};

const pt = {
  home: {
    role: 'Editor de Vídeo · Long-form, shorts e anúncios',
    intro:
      'Bem-vindo ao meu desktop, edição de editor. Tudo aqui funciona como um pequeno sistema operacional, abra os apps pra ver o que eu edito e como eu trabalho.',
    shortcuts: {
      about: 'Quem eu sou, experiência e formação',
      works: 'Vídeos que eu editei',
      contact: 'Me manda seu material',
    },
  },
  about: {
    bio: EDITOR_CONTENT.pt.about.body.join(' '),
  },
  works: {
    subtitle: 'Editor de Vídeo | Motion',
    note: 'Uma seleção de vídeos que eu editei: long-form, shorts e anúncios.',
    bioFile: 'Corte.txt',
  },
};

export const EDITOR_OVERRIDES = {
  en: { ...en, works: { ...en.works, projects: worksProjects('en') } },
  pt: { ...pt, works: { ...pt.works, projects: worksProjects('pt') } },
};
