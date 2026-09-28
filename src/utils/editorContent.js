// Content for the video-editor portfolio (editor.matheuspancieri.dev).
// Same idea as content.js: every piece of text lives here, in EN and PT.
//
// PROJECTS — to add a video, just add an entry to EDITOR_PROJECTS:
//   youtube:  the video ID (the part after "v=" / "youtu.be/"), or
//   drive:    the Google Drive file ID (drive.google.com/file/d/<ID>/view,
//             shared as "anyone with the link"). With neither, a
//             placeholder slate shows until the link exists.
//   duration: "mm:ss" or "hh:mm:ss" — drives the clip width on the timeline.
//   vertical: true for shorts/reels (9:16), shown pillarboxed in the monitor.
//   title / client / role / description: { en, pt }.
//   tools:    tags shown on the project's file in the OS works/ folder
//             (editor profile).

export const EDITOR_LINKS = {
  email: 'matheuspancieri@outlook.com',
  linkedin:
    'https://www.linkedin.com/in/matheus-pancieri-preza-da-silva-159923275/',
  youtube: '',
  instagram: '',
  // YT Jobs profile — the ytjobs.co app on the editor desktop.
  ytjobs: 'https://ytjobs.co/talent/profile/633182',
  devPortfolio: 'https://matheuspancieri.dev',
};

export const EDITOR_PROJECTS = [
  {
    id: 'mcdonalds',
    drive: '1DxKpUusLlOXVW_kq-DQ6uJUxBoDG16E8',
    duration: '02:21',
    vertical: false,
    type: 'longform',
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    title: { en: "McDonald's: the origin story", pt: 'McDonald’s: a história por trás' },
    client: { en: 'YouTube documentary', pt: 'Documentário pro YouTube' },
    role: { en: 'Edit, b-roll and motion', pt: 'Edição, b-roll e motion' },
    description: {
      en: 'Documentary-style segment on how McDonald’s started: archival photos, b-roll and animated overlays carrying the narration.',
      pt: 'Trecho estilo documentário sobre como o McDonald’s começou: fotos de arquivo, b-roll e overlays animados guiando a narração.',
    },
  },
  {
    id: 'dollar-stores',
    drive: '1NEsBNbqDqSCnVrIS-dv2x5WE9ld7JeYV',
    duration: '00:30',
    vertical: false,
    type: 'explainer',
    tools: ['Premiere Pro', 'After Effects'],
    title: { en: 'Dollar General vs Family Dollar', pt: 'Dollar General vs Family Dollar' },
    client: { en: 'YouTube channel (trial edit)', pt: 'Canal do YouTube (edição teste)' },
    role: { en: 'Edit and motion graphics', pt: 'Edição e motion graphics' },
    description: {
      en: 'A 30-second explainer cut: animated logos, map callouts and number pops that keep the pace up.',
      pt: 'Um explicativo de 30 segundos: logos animados, mapa com marcações e números saltando pra manter o ritmo.',
    },
  },
  {
    id: 'flashing-lights',
    drive: '1THDnIag_SQUyq_he0QOMGLRjiv6KZDgQ',
    duration: '00:17',
    vertical: false,
    type: 'amv',
    tools: ['After Effects'],
    title: { en: 'Flashing Lights', pt: 'Flashing Lights' },
    client: { en: 'Adastra', pt: 'Adastra' },
    role: { en: 'Edit, effects and typography', pt: 'Edição, efeitos e tipografia' },
    description: {
      en: 'Anime music edit synced to the beat: paper texture, glow, overlays and kinetic type.',
      pt: 'Edit de anime sincronizado com a batida: textura de papel, glow, overlays e tipografia animada.',
    },
  },
];

const en = {
  meta: {
    title: 'Matheus Pancieri | Video Editor',
    description:
      'Matheus Pancieri — video editor. Long-form, b-roll heavy storytelling, shorts and ads.',
  },
  nav: { reel: 'Reel', work: 'Work', about: 'About', contact: 'Contact' },
  hero: {
    tag: 'Portfolio',
    title: 'I cut stories people watch until the end.',
    body: 'I am Matheus Pancieri, a video editor. I cut long-form YouTube, documentary-style b-roll, shorts and ads, and I care about pacing, sound and the frame after the cut.',
    ctaWork: 'See the work',
    ctaContact: 'Get in touch',
  },
  monitor: {
    program: 'Program',
    placeholder: 'Video coming soon',
    play: 'Play',
    prev: 'Previous clip',
    next: 'Next clip',
  },
  work: {
    title: 'Work',
    sequence: 'Sequence',
    hint: 'Click a clip to load it in the monitor.',
    types: {
      reel: 'Reel',
      longform: 'Long-form',
      explainer: 'Explainer',
      amv: 'Anime edit',
      short: 'Short',
      ad: 'Ad',
    },
  },
  about: {
    title: 'About',
    body: [
      'I am Matheus, a video editor and developer from Brazil with 6+ years of editing experience. I started editing as a hobby, and now I am making it my career.',
      'Today I edit narration-driven long-form videos, source and place documentary b-roll, design transitions and sound, and cut vertical versions for social.',
    ],
    servicesTitle: 'What I do',
    services: [
      'Long-form YouTube editing',
      'B-roll research & placement',
      'Transitions, overlays & SFX',
      'Shorts / Reels / TikTok',
      'Color correction',
      'Motion graphics',
    ],
    toolsTitle: 'Tools',
  },
  contact: {
    title: 'Have footage? Let’s cut it.',
    body: 'Tell me about the project — format, length and deadline — and I’ll get back to you.',
    email: 'Send an email',
    copied: 'Email copied!',
    devLink: 'Looking for my developer portfolio?',
  },
  ticker: 'Matheus Pancieri — Video Editor',
  footer: 'Edited by Matheus Pancieri',
};

const pt = {
  meta: {
    title: 'Matheus Pancieri | Editor de Vídeo',
    description:
      'Matheus Pancieri — editor de vídeo. Long-form, storytelling com b-roll, shorts e anúncios.',
  },
  nav: { reel: 'Reel', work: 'Trabalhos', about: 'Sobre', contact: 'Contato' },
  hero: {
    tag: 'Portfólio',
    title: 'Eu corto histórias que as pessoas assistem até o fim.',
    body: 'Sou o Matheus Pancieri, editor de vídeo. Corto long-form pro YouTube, b-roll estilo documentário, shorts e anúncios, e me importo com ritmo, som e o quadro depois do corte.',
    ctaWork: 'Ver trabalhos',
    ctaContact: 'Falar comigo',
  },
  monitor: {
    program: 'Programa',
    placeholder: 'Vídeo em breve',
    play: 'Reproduzir',
    prev: 'Clipe anterior',
    next: 'Próximo clipe',
  },
  work: {
    title: 'Trabalhos',
    sequence: 'Sequência',
    hint: 'Clique num clipe pra carregar no monitor.',
    types: {
      reel: 'Reel',
      longform: 'Long-form',
      explainer: 'Explicativo',
      amv: 'Edit de anime',
      short: 'Short',
      ad: 'Anúncio',
    },
  },
  about: {
    title: 'Sobre',
    body: [
      'Sou o Matheus, editor de vídeo e desenvolvedor, com mais de 6 anos de experiência em edição. Comecei editando por hobby e hoje quero seguir carreira nisso.',
      'Hoje edito vídeos long-form guiados por narração, pesquiso e posiciono b-roll documental, faço transições e sound design, e corto versões verticais pras redes.',
    ],
    servicesTitle: 'O que eu faço',
    services: [
      'Edição long-form pro YouTube',
      'Pesquisa e posicionamento de b-roll',
      'Transições, overlays e SFX',
      'Shorts / Reels / TikTok',
      'Correção de cor',
      'Motion graphics',
    ],
    toolsTitle: 'Ferramentas',
  },
  contact: {
    title: 'Tem material? Bora cortar.',
    body: 'Me conta do projeto — formato, duração e prazo — que eu te respondo.',
    email: 'Mandar um email',
    copied: 'Email copiado!',
    devLink: 'Procurando meu portfólio de desenvolvedor?',
  },
  ticker: 'Matheus Pancieri — Editor de Vídeo',
  footer: 'Editado por Matheus Pancieri',
};

// abbr is what shows on the app-icon tile; name is the caption under it.
export const EDITOR_TOOLS = [
  { abbr: 'Ae', name: 'After Effects' },
  { abbr: 'Pr', name: 'Premiere Pro' },
  { abbr: 'Ps', name: 'Photoshop' },
];

export const EDITOR_CONTENT = { en, pt };
