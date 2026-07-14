import BlissCodeImage from '../assets/imgs/theblisscode-show.webp';
import AkademiaImage from '../assets/imgs/akademia-show.webp';
import CidadeDosMeninosImage from '../assets/imgs/cidadedosmeninos-show.webp';
import ChatbotImage from '../assets/imgs/chatbot-show.webp';
import DacImage from '../assets/imgs/dac-show.webp';
import UpsellImage from '../assets/imgs/upsell-show.webp';
import VslImage from '../assets/imgs/vsl-show.webp';
import HexalogImage from '../assets/imgs/hexalog-show.webp';
import Fiems from '../assets/imgs/logo-fiems.webp';
import GrupoSix from '../assets/imgs/logo-gruposix.webp';
import Alvorada from '../assets/imgs/logo-alvorada.webp';

export const LINKS = {
  github: 'https://github.com/MatheusPancieri',
  discord: 'https://discord.com/users/mmmmmmmm4401',
  linkedin:
    'https://www.linkedin.com/in/matheus-pancieri-preza-da-silva-159923275/',
  email: 'matheuspancieri@outlook.com',
};

const en = {
  boot: { loading: 'booting pancieriOS...' },
  desktop: {
    apps: {
      home: 'home.mdx',
      about: 'about.me',
      works: 'works',
      contact: 'contact',
      github: 'github',
      discord: 'discord',
      linkedin: 'linkedin',
      chess: 'chess.com',
    },
  },
  taskbar: {
    petTitle: 'Feed me clicks',
  },
  window: { close: 'Close', minimize: 'Minimize', maximize: 'Maximize' },
  home: {
    title: 'home.mdx',
    greeting: "Hello, I'm Matheus Pancieri",
    role: 'Software Developer · UI/UX Designer',
    intro:
      'Welcome to my desktop. Everything here works like a tiny operating system, feel free to open the apps to know me better.',
    shortcutsTitle: 'Quick start',
    shortcuts: {
      about: 'Who I am, experience & education',
      works: "Projects I've designed and built",
      contact: 'Send me a message',
    },
    footer: 'PS: the pet in the taskbar likes to be clicked.',
  },
  about: {
    title: 'about.me',
    name: 'Matheus Pancieri Preza da Silva',
    age: '21y',
    tabs: { bio: 'Bio', work: 'Experience', education: 'Education' },
    bio: "I'm a Computer Engineering student from Brazil, based in Campo Grande, with experience in web development using .NET, ASP.NET, EF Core, SQL, JavaScript, jQuery, HTML/CSS, Tailwind and UI/UX Design. I also design user interfaces in Figma, aiming for clean, responsive, and user-friendly layouts.",
    experiences: [
      {
        title: 'Fullstack Developer - GrupoSix',
        companyLogo: GrupoSix,
        period: 'Jan 2026 – Present',
        description:
          "As a FullStack developer at Grupo Six, I've been working on increasingly challenging projects. On a daily basis, I create and maintain new layouts and build automations that streamline the team's delivery workflow.\n\nAmong my most complex projects, I built a fully interactive subscription management software from scratch, integrating external APIs from multiple platforms and implementing payment methods. I'm also responsible for the full configuration of marketing software, managing existing server infrastructure, and creating interactive dashboards for user management, domain tracking, and accounts payable.\n\nAdditionally, I manage the web sales flow and developed a fully automated page creation process, with standardized layouts focused on faster delivery, improved SEO, and better usability.\n\nI'm constantly striving to grow both personally and professionally, and I'm always open to new opportunities and challenges.",
        highlight: [
          'All the previous highlights, plus+',
          'Cloudflare',
          'Stripe',
          'Shopify',
          'UI/UX Design',
          'Next.js',
          'Database',
          'JS/TS',
          'Python',
        ],
      },
      {
        title: 'Auxiliar Developer – GrupoSix',
        companyLogo: GrupoSix,
        period: 'Jun 2025 – Dec 2025',
        description:
          'At GrupoSix, I have been working across different areas of web development and deployment. My responsibilities include deploying websites, managing files and hosting environments, configuring domains, and making adjustments to existing sites. I also participate in creating products and building new pages using modern technologies such as Tailwind CSS, HTML, CSS, JavaScript, and React.',
        highlight: [
          'Deploy',
          'Domain configuration',
          'Tailwind CSS',
          'JavaScript',
          'React',
        ],
      },
      {
        title: 'Developer Intern – FIEMS',
        companyLogo: Fiems,
        period: 'Aug 2024 – Jun 2025',
        description:
          'During my internship at FIEMS, I contributed to the development team supporting a proprietary process automation software. My role focused on creating and customizing workflows using JavaScript and jQuery, enabling the automation of internal processes. I also made small adjustments in C# and occasionally provided technical support to internal users.',
        highlight: ['Process automation', 'JavaScript', 'jQuery', 'C#'],
      },
      {
        title: 'IT Intern – Alvorada Produtos Agropecuários',
        companyLogo: Alvorada,
        period: 'Jul 2024 – Aug 2024',
        description:
          'I provided technical support and gained hands-on experience with IT operations: configuring PCs and systems, diagnosing and resolving technical issues, assisting users, and working with tables and data analysis to support decision-making.',
        highlight: [
          'PC configuration',
          'Technical support',
          'Troubleshooting',
          'Data analysis',
        ],
      },
    ],
    education: [
      {
        title: 'Computer Engineering – UCDB',
        period: '2022 – Expected Graduation: 2028',
        description:
          'Computer Engineering student (6th semester) at Universidade Católica Dom Bosco. Solid foundations in software development, algorithms, and systems, applied in professional projects and internships. I work with C#, C++, C, Java, and Python, plus .NET, ASP.NET, EF Core, SQL/MSSQL, HTML/CSS, and UI/UX design in Figma.',
        highlight: ['C#', 'Java', 'Python', '.NET', 'SQL', 'Figma'],
      },
      {
        title: 'Additional Courses – Balta.io',
        period: '2023',
        description:
          'Courses focused on the .NET ecosystem, SQL Server, and programming fundamentals: Entity Framework, data access with .NET/C#/Dapper, HTML & CSS, SQL Server, OOP, and C# fundamentals.',
        highlight: ['Entity Framework', 'C#', 'SQL Server', 'OOP'],
      },
      {
        title: 'Additional Course – FreeCodeCamp',
        period: '2023',
        description:
          'Completed the "Foundational C# with Microsoft" module, gaining practical knowledge of C# fundamentals and object-oriented programming concepts.',
        highlight: ['C#', 'OOP'],
      },
      {
        title: 'Additional Courses – Origamid',
        period: '2024 – 2025',
        description:
          'Courses focused on web development and design fundamentals: Front End & UX/UI Design.',
        highlight: ['UI Design', 'HTML', 'CSS'],
      },
    ],
  },
  works: {
    title: 'works',
    subtitle: 'UI/UX Design | Developer',
    back: '← back',
    tools: 'Tools',
    zoomHint: 'Click image to zoom',
    close: 'Close',
    visitSite: 'Visit site',
    note: 'This is just some of my side projects that i take on in my free time, my main role is Full Stack Developer at O Grupo Six.',
    projects: [
      {
        name: 'The Bliss Code',
        date: '02/2025',
        image: BlissCodeImage,
        description:
          'Vibrant, engaging landing page with color direction and visual hierarchy aligned to the brand’s transformation-focused positioning.',
        descriptionFull:
          'I worked as UI/UX designer on the landing page, translating the brand’s energy into interface design. I worked color direction, visual rhythm, and content hierarchy to build a vibrant, engaging page aligned with the product’s transformation-focused proposition.',
        technologies: ['Figma', 'After Effects', 'Photoshop'],
      },
      {
        name: 'Akademia',
        date: '04/2025',
        image: AkademiaImage,
        description:
          'Fitness website focused on attracting new members, with a bold black-and-yellow identity and strategic CTAs.',
        descriptionFull:
          'I was responsible for the UI/UX design. The challenge was to communicate energy, confidence, and action. I created a strong black-and-yellow visual identity, organized the content for easy navigation, and designed strategic CTAs to drive conversions. The final result is a responsive and impactful layout.',
        technologies: ['Figma', 'After Effects', 'Photoshop'],
      },
      {
        name: 'Cidade dos Meninos',
        date: '05/2025',
        image: CidadeDosMeninosImage,
        description:
          'Institutional website with UI/UX design focused on conveying warmth and organizing information clearly and accessibly.',
        descriptionFull:
          'I was responsible for the UI/UX design of the institutional website. The focus was building a coherent visual identity and a navigation architecture that conveys warmth, prioritizing information hierarchy and clarity. Each section was structured so visitors can find what they need with minimal effort, maintaining visual consistency throughout.',
        technologies: ['Figma', 'Illustrator', 'Photoshop'],
      },
      {
        name: 'IA Chatbot',
        date: '06/2025',
        image: ChatbotImage,
        description:
          'Chatbot interface inspired by current AI product references, adapted to the brand’s visual identity.',
        descriptionFull:
          'I designed the chatbot interface based on leading current AI product references, adapting visual and interaction patterns to the brand identity. I prioritized a clean, familiar, and fluid experience — from onboarding to conversation — so users feel comfortable from the first interaction.',
        technologies: ['Figma', 'Illustrator'],
      },
      {
        name: 'DAC',
        date: '07/2025',
        image: DacImage,
        description:
          'Landing page for a computer-vision forest fire detection system, communicating complex technology clearly.',
        descriptionFull:
          'I designed the landing page for a computer-vision-based forest fire detection system. The goal was to communicate the product clearly and accessibly, translating complex technology into an experience any visitor can easily understand.',
        technologies: ['Figma', 'Photoshop', 'Illustrator'],
      },
      {
        name: 'YourHealthGuru',
        date: '08/2025',
        image: UpsellImage,
        description:
          'Upsell offer page structured for clarity and objectivity, reducing friction in the purchase decision.',
        descriptionFull:
          'I structured the offer page with a focus on clarity and objectivity, organizing information directly to reduce noise in the decision-making process. I prioritized benefits, social proof, and the call to action in a hierarchy that lets users grasp the offer’s value quickly.',
        technologies: ['Figma', 'Photoshop'],
      },
      {
        name: 'Healthy',
        date: '09/2025',
        image: VslImage,
        link: 'https://desafio-ogruposix-matheuspancieri.vercel.app/',
        description:
          'Video sales letter (VSL) page with an early hook and content hierarchy built to guide the narrative toward conversion.',
        descriptionFull:
          'I built a video sales letter (VSL) page focused on creating a strong hook right from the start and improving reading flow. I organized content hierarchy and pacing to naturally guide users through the narrative toward conversion.',
        technologies: ['Figma', 'After Effects', 'Photoshop'],
      },
      {
        name: 'Hexalog',
        date: '10/2025',
        image: HexalogImage,
        link: 'https://hexalogfull.com/',
        description:
          'Landing page for a formulation and manufacturing company, with a bold, dark, high-impact aesthetic.',
        descriptionFull:
          'I designed the landing page for a product formulation and manufacturing company, with a bold, dark, high-impact aesthetic. I built a strong, modern identity to convey agility and confidence — from formula concept to market delivery — reinforcing the brand’s premium positioning.',
        technologies: ['Figma', 'Illustrator', 'Photoshop'],
      },
    ],
  },
  contact: {
    title: 'contact',
    heading: 'Send me a message',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send',
    sending: 'Sending...',
    success: 'Message sent!',
    successNote: "I'll get back to you soon.",
    directly: 'Or email me directly:',
    errors: {
      nameRequired: 'Please enter your name',
      nameMin: 'Name must be at least 2 characters',
      emailRequired: 'Please enter your email',
      emailInvalid: "That doesn't look like a valid email",
      messageRequired: 'Please enter a message',
      messageMin: 'Message must be at least 10 characters',
      sendFailed:
        'Something went wrong. Please try again or email me directly.',
    },
  },
  chess: {
    title: 'chess.com',
    turnWhite: 'White to move',
    turnBlack: 'Black to move',
    checkWhite: 'White is in check',
    checkBlack: 'Black is in check',
    checkmateWhite: 'Checkmate — White wins',
    checkmateBlack: 'Checkmate — Black wins',
    stalemate: 'Stalemate — draw',
    draw: 'Draw',
    newGame: 'New game',
    hint: 'Click a piece to see its legal moves, then click a highlighted square to play it. Pawns always promote to queen.',
  },
  mobile: {
    close: 'Close',
  },
};

const pt = {
  boot: { loading: 'iniciando pancieriOS...' },
  desktop: {
    apps: {
      home: 'home.mdx',
      about: 'sobre.mim',
      works: 'trabalhos',
      contact: 'contato',
      github: 'github',
      discord: 'discord',
      linkedin: 'linkedin',
      chess: 'chess.com',
    },
  },
  taskbar: {
    petTitle: 'Me alimente com cliques',
  },
  window: { close: 'Fechar', minimize: 'Minimizar', maximize: 'Maximizar' },
  home: {
    title: 'home.mdx',
    greeting: 'Olá, eu sou Matheus Pancieri',
    role: 'Desenvolvedor de Software · UI/UX Designer',
    intro:
      'Bem-vindo ao meu desktop. Tudo aqui funciona como um pequeno sistema operacional — abra os apps para me conhecer melhor.',
    shortcutsTitle: 'Comece por aqui',
    shortcuts: {
      about: 'Quem eu sou, experiência e formação',
      works: 'Projetos que eu criei e desenvolvi',
      contact: 'Me mande uma mensagem',
    },
    footer: 'PS: o bichinho na barra de tarefas gosta de cliques.',
  },
  about: {
    title: 'sobre.mim',
    name: 'Matheus Pancieri',
    age: '20 anos',
    tabs: { bio: 'Bio', work: 'Experiência', education: 'Formação' },
    bio: 'Sou estudante de Engenharia da Computação no Brasil, em Campo Grande, com experiência em desenvolvimento web usando .NET, ASP.NET, EF Core, SQL, JavaScript, jQuery, HTML/CSS e Tailwind. Também crio interfaces no Figma, buscando layouts limpos, responsivos e amigáveis.',
    experiences: [
      {
        title: 'Desenvolvedor Fullstack – GrupoSix',
        companyLogo: GrupoSix,
        period: 'Jan 2026 – Atual',
        description:
          'Como desenvolvedor júnior no Grupo Six, venho atuando em projetos cada vez mais desafiadores. No dia a dia, crio e mantenho novos layouts e desenvolvo automações que otimizam o fluxo de entrega do time.\n\nEntre os projetos mais complexos, construí do zero um software de gerenciamento de assinaturas totalmente interativo, integrando APIs externas de diversas plataformas e implementando métodos de pagamento. Também sou responsável pela configuração completa de softwares de marketing, pela gestão dos servidores existentes e pela criação de dashboards interativos para controle de usuários, domínios e contas a pagar.\n\nAlém disso, gerencio o fluxo de vendas web e desenvolvi um processo totalmente automatizado de criação de páginas, com layouts padronizados focados em agilidade de entrega, melhorias de SEO e usabilidade.\n\nBusco evoluir constantemente como pessoa e profissional, sempre aberto a novas oportunidades e desafios.',
        highlight: [
          'Deploy',
          'Configuração de domínios',
          'Tailwind CSS',
          'UI/UX Design',
          'Next.js',
          'Banco de dados',
          'JavaScript',
          'React',
        ],
      },
      {
        title: 'Desenvolvedor Auxiliar – GrupoSix',
        companyLogo: GrupoSix,
        period: 'Jun 2025 – Dez 2025',
        description:
          'No GrupoSix, atuei em diferentes áreas de desenvolvimento web e deploy. Minhas responsabilidades incluíam publicar sites, gerenciar arquivos e ambientes de hospedagem, configurar domínios e ajustar sites existentes. Também participava da criação de produtos e novas páginas usando Tailwind CSS, HTML, CSS, JavaScript e React.',
        highlight: [
          'Deploy',
          'Configuração de domínios',
          'Tailwind CSS',
          'JavaScript',
          'React',
        ],
      },
      {
        title: 'Estagiário de Desenvolvimento – FIEMS',
        companyLogo: Fiems,
        period: 'Ago 2024 – Jun 2025',
        description:
          'Durante meu estágio na FIEMS, contribuí com o time de desenvolvimento dando suporte a um software proprietário de automação de processos. Meu foco foi criar e customizar workflows com JavaScript e jQuery, automatizando processos internos. Também fiz pequenos ajustes em C# e prestei suporte técnico a usuários internos.',
        highlight: ['Automação de processos', 'JavaScript', 'jQuery', 'C#'],
      },
      {
        title: 'Estagiário de TI – Alvorada Produtos Agropecuários',
        companyLogo: Alvorada,
        period: 'Jul 2024 – Ago 2024',
        description:
          'Prestei suporte técnico e ganhei experiência prática com operações de TI: configuração de PCs e sistemas, diagnóstico e resolução de problemas, atendimento a usuários e análise de dados para apoiar decisões.',
        highlight: [
          'Configuração de PCs',
          'Suporte técnico',
          'Troubleshooting',
          'Análise de dados',
        ],
      },
    ],
    education: [
      {
        title: 'Engenharia da Computação – UCDB',
        period: '2022 – Conclusão prevista: 2028',
        description:
          'Estudante de Engenharia da Computação (6º semestre) na Universidade Católica Dom Bosco. Bases sólidas em desenvolvimento de software, algoritmos e sistemas, aplicadas em projetos profissionais e estágios. Trabalho com C#, C++, C, Java e Python, além de .NET, ASP.NET, EF Core, SQL/MSSQL, HTML/CSS e design UI/UX no Figma.',
        highlight: ['C#', 'Java', 'Python', '.NET', 'SQL', 'Figma'],
      },
      {
        title: 'Cursos complementares – Balta.io',
        period: '2023',
        description:
          'Cursos focados no ecossistema .NET, SQL Server e fundamentos de programação: Entity Framework, acesso a dados com .NET/C#/Dapper, HTML e CSS, SQL Server, POO e fundamentos de C#.',
        highlight: ['Entity Framework', 'C#', 'SQL Server', 'POO'],
      },
      {
        title: 'Curso complementar – FreeCodeCamp',
        period: '2023',
        description:
          'Concluí o módulo "Foundational C# with Microsoft", com conhecimento prático de fundamentos de C# e programação orientada a objetos.',
        highlight: ['C#', 'POO'],
      },
      {
        title: 'Cursos complementares – Origamid',
        period: '2024 – 2025',
        description:
          'Cursos focados em desenvolvimento web e fundamentos de design: Front End e UX/UI Design.',
        highlight: ['UI Design', 'HTML', 'CSS'],
      },
    ],
  },
  works: {
    title: 'trabalhos',
    subtitle: 'UI/UX Design | Desenvolvedor',
    back: '← voltar',
    tools: 'Ferramentas',
    zoomHint: 'Clique na imagem para ampliar',
    close: 'Fechar',
    visitSite: 'Ver site',
    note: 'Projetos paralelos que faço no meu tempo livre — atuo como Full Stack Developer na O Grupo Six.',
    projects: [
      {
        name: 'The Bliss Code',
        date: '02/2025',
        image: BlissCodeImage,
        description:
          'Landing page vibrante e envolvente, com direção de cor e hierarquia visual alinhadas à proposta de transformação da marca.',
        descriptionFull:
          'Atuei como UI/UX designer da landing page, traduzindo em interface a energia que a marca buscava transmitir. Trabalhei direção de cor, ritmo visual e hierarquia de conteúdo para construir uma página vibrante e envolvente, alinhada à proposta de transformação do produto.',
        technologies: ['Figma', 'After Effects', 'Photoshop'],
      },
      {
        name: 'Akademia',
        date: '04/2025',
        image: AkademiaImage,
        description:
          'Site fitness focado em atrair novos alunos, com identidade marcante em preto e amarelo e CTAs estratégicos.',
        descriptionFull:
          'Fui responsável pelo UI/UX design. O desafio era comunicar energia, confiança e ação. Criei uma identidade visual forte em preto e amarelo, organizei o conteúdo para facilitar a navegação e desenhei CTAs estratégicos para gerar conversões. O resultado é um layout responsivo e impactante.',
        technologies: ['Figma', 'After Effects', 'Photoshop'],
      },
      {
        name: 'Cidade dos Meninos',
        date: '05/2025',
        image: CidadeDosMeninosImage,
        description:
          'Website institucional com UI/UX design focado em transmitir acolhimento e organizar a informação de forma clara e acessível.',
        descriptionFull:
          'Fui responsável pelo UI/UX design do site institucional. O foco foi construir uma identidade visual coerente e uma arquitetura de navegação que transmite acolhimento, priorizando hierarquia da informação e clareza. Cada seção foi estruturada para que o visitante encontre o que precisa com o mínimo de esforço, mantendo consistência visual do início ao fim.',
        technologies: ['Figma', 'Illustrator', 'Photoshop'],
      },
      {
        name: 'IA Chatbot',
        date: '06/2025',
        image: ChatbotImage,
        description:
          'Interface de chatbot inspirada em referências atuais de produtos de IA, adaptada à identidade visual da marca.',
        descriptionFull:
          'Desenhei a interface do chatbot com base nas melhores referências atuais de produtos de IA, adaptando os padrões visuais e de interação à identidade da marca. Priorizei uma experiência limpa, familiar e fluida — do onboarding até a conversa — para que o usuário se sentisse à vontade desde o primeiro contato.',
        technologies: ['Figma', 'Illustrator'],
      },
      {
        name: 'DAC',
        date: '07/2025',
        image: DacImage,
        description:
          'Landing page de um sistema de detecção de incêndios florestais por visão computacional, comunicando uma tecnologia complexa de forma clara.',
        descriptionFull:
          'Desenvolvi a landing page de um sistema de detecção de incêndios florestais baseado em visão computacional. O trabalho foi comunicar o objetivo do produto de forma clara e acessível, traduzindo uma tecnologia complexa em uma experiência fácil de compreender para qualquer visitante.',
        technologies: ['Figma', 'Photoshop', 'Illustrator'],
      },
      {
        name: 'YourHealthGuru',
        date: '08/2025',
        image: UpsellImage,
        description:
          'Página de oferta (upsell) estruturada para clareza e objetividade, reduzindo ruído na decisão de compra.',
        descriptionFull:
          'Estruturei a página de oferta com foco em clareza e objetividade, organizando as informações de forma direta para reduzir ruído no processo de decisão. Priorizei benefícios, prova social e chamada para ação em uma hierarquia que permite ao usuário entender o valor da oferta rapidamente.',
        technologies: ['Figma', 'Photoshop'],
      },
      {
        name: 'Healthy',
        date: '09/2025',
        image: VslImage,
        link: 'https://desafio-ogruposix-matheuspancieri.vercel.app/',
        description:
          'Página de vídeo de vendas (VSL) com hook logo no início e hierarquia de conteúdo pensada para guiar a narrativa até a conversão.',
        descriptionFull:
          'Desenvolvi uma página de vídeo de vendas (VSL) buscando criar um gancho ("catch") logo nos primeiros segundos e melhorar o fluxo de leitura. Organizei a hierarquia e o ritmo do conteúdo para guiar o usuário naturalmente pela narrativa até a conversão.',
        technologies: ['Figma', 'After Effects', 'Photoshop'],
      },
      {
        name: 'Hexalog',
        date: '10/2025',
        image: HexalogImage,
        link: 'https://hexalogfull.com/',
        description:
          'Landing page de uma indústria de formulação e produção, com estética escura, ousada e identidade premium.',
        descriptionFull:
          'Desenvolvi a landing page de uma indústria de formulação e produção de produtos, com estética escura, ousada e de alto impacto. Trabalhei uma identidade visual forte e moderna para transmitir agilidade e confiança — do conceito da fórmula à entrega no mercado —, reforçando o posicionamento premium da marca.',
        technologies: ['Figma', 'Illustrator', 'Photoshop'],
      },
    ],
  },
  contact: {
    title: 'contato',
    heading: 'Me mande uma mensagem',
    name: 'Nome',
    email: 'Email',
    message: 'Mensagem',
    send: 'Enviar',
    sending: 'Enviando...',
    success: 'Mensagem enviada!',
    successNote: 'Logo entro em contato.',
    directly: 'Ou me mande um email direto:',
    errors: {
      nameRequired: 'Digite seu nome',
      nameMin: 'O nome precisa ter no mínimo 2 caracteres',
      emailRequired: 'Digite seu email',
      emailInvalid: 'Esse email não parece válido',
      messageRequired: 'Digite uma mensagem',
      messageMin: 'A mensagem precisa ter no mínimo 10 caracteres',
      sendFailed:
        'Algo deu errado. Tente novamente ou me mande um email direto.',
    },
  },
  chess: {
    title: 'chess.com',
    turnWhite: 'Vez das brancas',
    turnBlack: 'Vez das pretas',
    checkWhite: 'Brancas em xeque',
    checkBlack: 'Pretas em xeque',
    checkmateWhite: 'Xeque-mate — brancas vencem',
    checkmateBlack: 'Xeque-mate — pretas vencem',
    stalemate: 'Afogamento — empate',
    draw: 'Empate',
    newGame: 'Novo jogo',
    hint: 'Clique numa peça pra ver os lances possíveis, depois clique na casa destacada pra jogar. Peões sempre promovem a dama.',
  },
  mobile: {
    close: 'Fechar',
  },
};

export const CONTENT = { en, pt };
