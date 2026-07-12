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

Não há router, state manager externo nem backend — tudo é estado React em
memória, com `localStorage`/`sessionStorage` para persistir pequenas coisas.

## Mapa de pastas

```
src/
├── index.css                  # tema (@theme), grain, animações CSS globais
├── main.jsx                   # bootstrap React
├── pages/HomePage/HomePage.jsx  # shell raiz: boot, mobile vs desktop
├── assets/
│   ├── imgs/                  # fotos de projetos, logos, assinatura SVG
│   └── pet/                   # spritesheets do bichinho (4 PNGs)
├── os/                        # todo o "sistema operacional"
│   ├── content.js             # TODO o texto do site em EN e PT + dados
│   ├── i18n.jsx               # LangProvider / useLang (troca EN↔PT)
│   ├── WindowManager.jsx      # estado das janelas (reducer + context)
│   ├── LaunchContext.jsx      # abstração "abrir app" (desktop e mobile)
│   ├── apps.jsx               # registro dos apps (ícone, tamanho, componente)
│   ├── Desktop.jsx            # shell desktop: grain, logo, ícones, janelas
│   ├── DesktopIcon.jsx        # ícone clicável da área de trabalho
│   ├── Window.jsx             # janela: chrome, animações de zoom, drag
│   ├── Taskbar.jsx            # barra inferior: pet, janelas abertas, EN/PT, relógio
│   ├── TaskbarPet.jsx         # bichinho de spritesheet clicável
│   ├── Clock.jsx              # relógio/data (locale segue o idioma)
│   ├── BootScreen.jsx         # tela de boot com barra de progresso
│   ├── MobileLauncher.jsx     # modo celular: grade de apps + app fullscreen
│   └── apps/                  # conteúdo de cada janela
│       ├── HomeApp.jsx        # home.mdx — intro estilo README + atalhos
│       ├── AboutApp.jsx       # about.me — abas Bio/Experiência/Formação
│       ├── WorksApp.jsx       # works — lista de projetos + detalhe
│       ├── ContactApp.jsx     # contact — formulário (envio fake por enquanto)
│       └── ChessApp.jsx       # chess.com — placeholder "em breve"
└── components/                # LEGADO do layout antigo — nada importa daqui;
                               # pode ser apagado quando quiser
```

## Fluxo de inicialização

1. `main.jsx` renderiza `HomePage`.
2. `HomePage` monta dois providers globais:
   - `LangProvider` (idioma) e `WindowsProvider` (janelas).
3. Decide o shell pela largura da tela (`< 768px` = mobile, com listener de
   resize): `<MobileLauncher />` ou `<Desktop />`.
4. Se `sessionStorage["os-booted"]` não existe, mostra o `BootScreen` por
   ~2s (barra de progresso animada em CSS, `boot-fill`), grava a flag e
   some com fade. Por sessão de navegador, o boot só aparece uma vez.

## Tema e grain

Tudo é definido em [src/index.css](src/index.css):

- **Tokens de cor** no bloco `@theme` do Tailwind 4 — isso gera classes como
  `bg-desk`, `bg-panel`, `text-ink`, `bg-accent`, `border-line`:
  - `desk` `#e8e1cf` (bege do fundo) · `panel` `#fbf7ea` (creme das janelas)
  - `ink` `#2a2418` (texto/contornos) · `accent` `#f5a302` (amarelo-laranja)
  - `accent-deep` `#d98a00` · `accent-soft` `#fcd882` · `line` `#3b3325`
- **Sombras "hard"** (deslocadas, sem blur, estilo retrô) usadas em botões,
  cards e janelas.
- **Grain**: a classe `.grain-layer` é um `<div>` absoluto com um SVG inline
  (data URI) de `feTurbulence` com o alpha "thresholdado" — isso gera
  pontinhos distintos (speckle) em vez de chiado uniforme. **A ordem das
  camadas importa**: o grain é o *primeiro filho* do Desktop, então assinatura,
  ícones, janelas e taskbar pintam por cima dele. Knobs: `opacity` (força),
  `baseFrequency` (tamanho dos pontos), o último valor da matriz (densidade).

## Idioma (i18n)

- [content.js](src/os/content.js) tem **todo** o texto do site duplicado em
  dois objetos: `en` e `pt` (labels, bio, projetos, experiências, formação).
  Para editar qualquer texto do site, é **só mexer nesse arquivo**.
- [i18n.jsx](src/os/i18n.jsx) expõe `useLang()` → `{ lang, toggleLang, c }`,
  onde `c` é o objeto de conteúdo do idioma atual. Os componentes leem tudo
  de `c` (ex.: `c.about.tabs.bio`).
- O botão EN/PT fica na taskbar; a escolha persiste em `localStorage["os-lang"]`.
  O relógio também muda de locale junto.

## Gerenciador de janelas

[WindowManager.jsx](src/os/WindowManager.jsx) é um `useReducer` dentro de um
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

## A janela ([Window.jsx](src/os/Window.jsx))

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

[apps.jsx](src/os/apps.jsx) é a única lista de apps. Cada entrada:

```js
{ id, label: (c) => ..., Icon, Component, w, h }   // app com janela
{ id, label, Icon, external: "https://..." }        // link externo (github)
```

**Para adicionar um app novo**: criar o componente em `src/os/apps/`,
adicionar textos no `content.js` (en + pt) e uma entrada aqui. Desktop,
taskbar e mobile passam a conhecê-lo automaticamente.

[LaunchContext.jsx](src/os/LaunchContext.jsx) existe para o `HomeApp` (e
qualquer app) poder abrir outros apps sem saber em qual shell está: no
desktop o launch abre janela, no mobile abre fullscreen. Links externos
abrem em nova aba nos dois casos.

## Taskbar

[Taskbar.jsx](src/os/Taskbar.jsx) (56px, `TASKBAR_H`):

- **Pet** (esquerda) → ver seção abaixo.
- **Botões de janelas abertas**: um por janela, com `id="taskbtn-<id>"`
  (âncora das animações de minimizar). Clique: minimizada→restaura,
  focada→minimiza, atrás→foca. O botão ativo fica amarelo.
- **EN/PT** e **relógio** (direita). O relógio atualiza a cada 15s.

## O bichinho (TaskbarPet)

[TaskbarPet.jsx](src/os/TaskbarPet.jsx) + spritesheets em `src/assets/pet/`:

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

[MobileLauncher.jsx](src/os/MobileLauncher.jsx), ativo abaixo de 768px:

- Barra de status no topo (pet + EN/PT + relógio).
- Grade 3 colunas com os mesmos apps do registro.
- Tocar um app abre **fullscreen** com animação `app-zoom-in` e um header
  com título + botão fechar. Sem janelas/drag no mobile — de propósito.

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

## Pendências conhecidas

- **Formulário de contato é fake**: mostra sucesso mas não envia nada
  (`ContactApp.jsx` tem um `TODO`). Plano: EmailJS ou Formspree.
- **Ícones dos apps** são placeholders do react-icons — a ideia é desenhar
  um ícone próprio por app.
- **chess.com** é só o placeholder "em breve" — o jogo de xadrez virá depois.
- **`src/components/` é o layout antigo**, morto (nada importa de lá).
  Mantido só porque tinha alterações não commitadas; pode apagar.
- O "Other" extra de OS que você marcou na enquete inicial nunca foi
  especificado — em aberto.
