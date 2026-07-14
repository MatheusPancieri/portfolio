# Como o portfólio funciona — pancieriOS

Documentação completa da arquitetura atual do projeto. O site é um portfólio
que simula um pequeno sistema operacional de desktop: ícones abrem janelas
arrastáveis, existe uma taskbar com um bichinho clicável, relógio e troca de
idioma, e em telas pequenas tudo vira um launcher de celular.

## Stack

| Camada | Tecnologia |
|---|---|
| Build | Vite 7 |
| UI | React 19 (JSX, sem TypeScript) |
| Estilo | Tailwind CSS 4 (via `@tailwindcss/vite`, tokens no `@theme`) |
| Ícones | react-icons (placeholders até termos ícones próprios) |
| Fontes | Anonymous Pro (mono, UI do "OS") + Inter (textos longos) |

Router: `react-router-dom` (`BrowserRouter`), só duas rotas — `/` (o "OS") e
`/old-version` (o portfólio pré-rebuild, ver seção própria). Sem state
manager externo nem backend — tudo é estado React em memória, com
`localStorage`/`sessionStorage` para persistir pequenas coisas, e EmailJS
pro formulário de contato (client-side, sem servidor próprio).

## Mapa de pastas

```
src/
├── index.css                       # tema (@theme), grain, animações CSS globais
├── main.jsx                        # bootstrap React
├── App.jsx                         # BrowserRouter + Routes ("/" e "/old-version")
├── assets/
│   ├── imgs/                       # fotos de projetos, logos, assinatura SVG
│   ├── icons/                      # ícones dos apps (webp)
│   └── pet/                        # spritesheets do bichinho (4 PNGs)
├── context/                        # providers React (Context + hooks de consumo)
│   ├── i18n.jsx                    # LangProvider / useLang (troca EN↔PT)
│   ├── WindowManager.jsx           # estado das janelas (reducer + context)
│   └── LaunchContext.jsx           # abstração "abrir app" (desktop e mobile)
├── utils/
│   ├── content.js                  # TODO o texto do site em EN e PT + dados + LINKS
│   └── useIconPositions.js         # hook: posições dos ícones do desktop (localStorage)
├── components/                     # peças do "sistema operacional"
│   ├── IconImg.jsx                 # factory: <img> webp → componente Icon
│   ├── Desktop/Desktop.jsx         # shell desktop: grain, logo, ícones, janelas
│   ├── DesktopIcon/DesktopIcon.jsx # ícone clicável e arrastável da área de trabalho
│   ├── Window/Window.jsx           # janela: chrome, animações de zoom, drag
│   ├── Taskbar/Taskbar.jsx         # barra inferior: pet, janelas abertas, EN/PT, relógio
│   ├── TaskbarPet/TaskbarPet.jsx   # bichinho de spritesheet clicável
│   ├── Clock/Clock.jsx             # relógio/data (locale segue o idioma)
│   ├── BootScreen/BootScreen.jsx   # tela de boot com barra de progresso
│   ├── MobileLauncher/MobileLauncher.jsx  # modo celular: grade de apps + app fullscreen
│   ├── Lightbox/Lightbox.jsx       # modal de imagem: clique para tela cheia, clique de novo para 100%+scroll, Esc/backdrop fecha
│   └── apps/                       # registro + conteúdo de cada janela
│       ├── apps.jsx                # registro dos apps (ícone, tamanho, componente)
│       ├── HomeApp.jsx             # home.mdx — intro estilo README + atalhos
│       ├── AboutApp.jsx            # about.me — abas Bio/Experiência/Formação
│       ├── WorksApp.jsx            # works — lista de projetos + detalhe (imagem com zoom via Lightbox)
│       ├── ContactApp.jsx          # contact — formulário com Zod + react-hook-form + EmailJS
│       └── ChessApp.jsx            # chess.com — xadrez completo (chess.js + sprites em src/assets/chess/)
└── pages/
    ├── Desktop/
    │   └── DesktopPage.jsx         # rota "/" — shell raiz: boot, mobile vs desktop
    └── OldVersion/
        ├── OldVersionPage.jsx      # rota "/old-version" — portfólio pré-rebuild
        └── components/             # componentes do layout antigo (Sidebar, AboutMe, MyProjects, Resume, ...)
```

## Fluxo de inicialização

1. `main.jsx` renderiza `App`, que monta o `BrowserRouter` com as rotas `/`
   (`DesktopPage`) e `/old-version` (`OldVersionPage`).
2. `DesktopPage` monta dois providers globais:
   - `LangProvider` (idioma) e `WindowsProvider` (janelas).
3. Decide o shell pela largura da tela (`< 768px` = mobile, com listener de
   resize): `<MobileLauncher />` ou `<Desktop />`.
4. Se `sessionStorage["os-booted"]` não existe, mostra o `BootScreen` por
   ~2s (barra de progresso animada em CSS, `boot-fill`), grava a flag e
   some com fade. Por sessão de navegador, o boot só aparece uma vez.
   `/old-version` não passa por nada disso — é uma página independente.

## Tema e grain

Tudo é definido em [src/index.css](src/index.css):

- **Tokens de cor** no bloco `@theme` do Tailwind 4 — isso gera classes como
  `bg-desk`, `bg-panel`, `text-ink`, `bg-accent`, `border-line`:
  - `desk` `#e8e1cf` (bege do fundo) · `panel` `#fbf7ea` (creme das janelas)
  - `ink` `#2a2418` (texto/contornos) · `accent` `#f5a302` (amarelo-laranja)
  - `accent-deep` `#d98a00` · `accent-soft` `#fcd882` · `line` `#3b3325`
- **Sombras "hard"** (deslocadas, sem blur, estilo retrô) usadas em botões,
  cards e janelas.
- **Fontes pixel** (`IBM CGA` / `Perfect DOS VGA 437`, em `src/assets/fonts/`):
  são fontes de codepage 437 — o cmap delas mapeia os code points de Latin-1
  Supplement (ex.: U+00E1 "á" desenha "ß") e de General Punctuation (ex.:
  U+2014 travessão "—" desenha "ù") pros símbolos do CP437, não pras letras
  acentuadas / travessões/aspas de verdade. Os `@font-face` em `index.css`
  restringem `unicode-range` a `U+0000-007F, U+0100-1FFF, U+2070-10FFFF`
  (excluindo só esses dois blocos), o que força o navegador a cair pro
  próximo da pilha (`Anonymous Pro` / `Inter`, carregadas via Google Fonts
  no `index.html`) especificamente pros acentos e pontuação tipográfica do
  português. Sem isso, todo texto em PT com á/ã/ç/é/ê/– /—/etc. sai com
  símbolo trocado.
- **Grain**: a classe `.grain-layer` é um `<div>` absoluto com um SVG inline
  (data URI) de `feTurbulence` com o alpha "thresholdado" — isso gera
  pontinhos distintos (speckle) em vez de chiado uniforme. **A ordem das
  camadas importa**: o grain é o *primeiro filho* do Desktop, então assinatura,
  ícones, janelas e taskbar pintam por cima dele. Knobs: `opacity` (força),
  `baseFrequency` (tamanho dos pontos), o último valor da matriz (densidade).

## Idioma (i18n)

- [content.js](src/utils/content.js) tem **todo** o texto do site duplicado em
  dois objetos: `en` e `pt` (labels, bio, projetos, experiências, formação).
  Para editar qualquer texto do site, é **só mexer nesse arquivo**.
- [i18n.jsx](src/context/i18n.jsx) expõe `useLang()` → `{ lang, toggleLang, c }`,
  onde `c` é o objeto de conteúdo do idioma atual. Os componentes leem tudo
  de `c` (ex.: `c.about.tabs.bio`).
- O botão EN/PT fica na taskbar; a escolha persiste em `localStorage["os-lang"]`.
  O relógio também muda de locale junto.

## Gerenciador de janelas

[WindowManager.jsx](src/context/WindowManager.jsx) é um `useReducer` dentro de um
context. Cada janela é um objeto:

```js
{ id, x, y, w, h, z, minimized, maximized, closing, iconRect }
```

Ações: `open`, `close` (marca `closing`, quem remove é a animação),
`destroy`, `minimize`, `restore`, `focus` (sobe o `z`), `move`, `toggleMax`.

Detalhes importantes:
- **Uma instância por app**: `open` de um app já aberto só foca (ou restaura).
- **Posição em cascata**: cada janela nova nasce um pouco deslocada da
  anterior, e o tamanho é limitado ao viewport.
- **`iconRect`**: quando você clica num ícone, o `getBoundingClientRect()`
  dele é salvo na janela — é a origem/destino das animações de zoom.
- A API (`open`, `close`, ...) é um objeto estável em `useRef`, então
  consumidores não re-renderizam à toa.

## A janela ([Window.jsx](src/components/Window/Window.jsx))

É aqui que mora a mágica das animações estilo macOS:

- **Abrir**: no mount, a janela é renderizada já na posição final, mas com um
  `transform` que a encolhe/desloca até o retângulo do ícone
  (`translate + scale`), e aí anima para `transform: none` (380ms,
  `cubic-bezier(0.2, 0.9, 0.25, 1)`). Visualmente ela "sai de dentro" do ícone.
- **Fechar**: o reverso — anima de volta para o ícone, e no fim chama
  `destroy` para desmontar.
- **Minimizar/restaurar**: mesma técnica, mas o alvo é o botão da janela na
  taskbar (`document.getElementById("taskbtn-" + id)`). Minimizada, a janela
  fica `visibility: hidden` mas **continua montada** — o estado interno do app
  (aba aberta, formulário digitado) não se perde.
- **Nunca medimos a janela com `getBoundingClientRect` durante animação** —
  o retângulo "de descanso" vem do estado (`restingRect()`), porque medir um
  elemento transformado devolve valores errados.
- **Drag**: `pointerdown` na barra de título captura o ponteiro **na própria
  barra** (capturar no div da janela redirecionaria os eventos para longe do
  handler e o drag engasga — foi um bug real). Durante o arrasto, a posição é
  aplicada via `transform: translate3d(...)` (só compositor, sem relayout, sem
  stutter); no `pointerup` o `left/top` real é commitado no estado.
- **Maximizar**: duplo clique na barra ou o botão verde; vira um retângulo
  quase fullscreen (desconta a taskbar).
- Os três botões redondos: fechar `#e25d33`, minimizar `accent`, maximizar
  `#8a9a5b`.

## Registro de apps e lançamento

[apps.jsx](src/components/apps/apps.jsx) é a única lista de apps. Cada entrada:

```js
{ id, label: (c) => ..., Icon, Component, w, h }   // app com janela
{ id, label, Icon, external: "https://..." }        // link externo (github, discord)
```

**Para adicionar um app novo**: criar o componente em `src/components/apps/`,
adicionar textos no `content.js` (en + pt) e uma entrada aqui. Desktop,
taskbar e mobile passam a conhecê-lo automaticamente.

[LaunchContext.jsx](src/context/LaunchContext.jsx) existe para o `HomeApp` (e
qualquer app) poder abrir outros apps sem saber em qual shell está: no
desktop o launch abre janela, no mobile abre fullscreen. Links externos
abrem em nova aba nos dois casos.

## Taskbar

[Taskbar.jsx](src/components/Taskbar/Taskbar.jsx) (56px, `TASKBAR_H`):

- **Pet** (esquerda) → ver seção abaixo.
- **Botões de janelas abertas**: um por janela, com `id="taskbtn-<id>"`
  (âncora das animações de minimizar). Clique: minimizada→restaura,
  focada→minimiza, atrás→foca. O botão ativo fica amarelo.
- **EN/PT** e **relógio** (direita). O relógio atualiza a cada 15s.

## O bichinho (TaskbarPet)

[TaskbarPet.jsx](src/components/TaskbarPet/TaskbarPet.jsx) + spritesheets em `src/assets/pet/`:

| Arquivo | Frames | Quando toca |
|---|---|---|
| `pet-idle.png` | 4 | loop padrão (respira/pisca) |
| `pet-happy.png` | 4 | loop quando score ≥ 25 |
| `pet-party.png` | 4 | loop quando score ≥ 100 (chapéu + confete) |
| `pet-hop.png` | 6 | uma vez a cada clique (squash & stretch) |

- Cada frame é uma célula de **64×64px**, exibida a 40px com
  `image-rendering: pixelated` (pixel duro, sem blur).
- A animação é CSS puro: `background-position` andando com `steps(n)`
  (`pet-cycle-4` / `pet-cycle-6` no index.css). O React só troca a
  `backgroundImage` e a classe.
- O pulo usa `key` que muda a cada clique → o span remonta → a animação
  reinicia do frame 1 mesmo em cliques rápidos. `onAnimationEnd` devolve
  ao loop do humor atual.
- Score: persiste em `localStorage["pet-score"]`; cada clique mostra um
  "+1" flutuante (animação `score-pop`).
- Os PNGs foram **extraídos automaticamente** de uma imagem única gerada por
  IA (script `extract-pet.mjs`, fora do repo): remoção do fundo por flood-fill
  a partir das bordas (preserva branco dos olhos), segmentação de frames por
  colunas vazias, alinhamento pela linha do chão (preserva altura do pulo) e
  downscale nearest-neighbor. Se um dia quiser trocar a arte, gere outra
  imagem no mesmo formato de grade que o processo se repete.

## Modo mobile

[MobileLauncher.jsx](src/components/MobileLauncher/MobileLauncher.jsx), ativo abaixo de 768px:

- Barra de status no topo (pet + EN/PT + relógio).
- Grade 3 colunas com os mesmos apps do registro.
- Tocar um app abre **fullscreen** com animação `app-zoom-in` e um header
  com título + botão fechar. Sem janelas/drag no mobile — de propósito.

## `/old-version` — o portfólio pré-rebuild

[OldVersionPage.jsx](src/pages/OldVersion/OldVersionPage.jsx) recupera o
layout de antes do rebuild pra OS (`Background` + `Sidebar` com nav por
âncora + `AboutMe` + `MyProjects` + `Resume`, ids `#about`/`#projects`/`#resume`).
Vive isolado em `src/pages/OldVersion/components/` — nada dali é usado pelo
resto do site. Diferente do `/`, depende de **scroll normal do documento**
(por isso o `body` não tem mais `overflow: hidden` global — cada shell da OS
já se auto-contém com `fixed inset-0 overflow-hidden`, então tirar essa regra
do `body` não muda nada em `/`). Mostra um aviso fullscreen em telas
`< 975px` em vez do layout (não é responsivo, de propósito — é o legado).

## Persistência (resumo)

| Chave | Storage | O que guarda |
|---|---|---|
| `os-lang` | localStorage | idioma escolhido (en/pt) |
| `pet-score` | localStorage | cliques no bichinho |
| `os-booted` | sessionStorage | boot screen já exibido nesta sessão |

## Comandos

```bash
npm run dev      # dev server (Vite)
npm run build    # build de produção em dist/
npm run preview  # serve o build localmente
npm run lint     # eslint
```

## Créditos de assets

- **Peças de xadrez** (`src/assets/chess/*.webp`): "Pixel Art Chess" por
  Ajay Karat / Devil's Work.shop (devilswork.shop), licença
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Convertidas de
  PNG pra WebP, sem alteração de conteúdo. O tabuleiro em si (cores das
  casas) usa os tokens de tema do projeto, não o board.png do pacote.

## Pendências conhecidas

- **Xadrez**: promoção de peão sempre vira dama automaticamente (sem
  seletor de peça). Sem "desfazer lance" nem relógio.
- O "Other" extra de OS que você marcou na enquete inicial nunca foi
  especificado — em aberto.
