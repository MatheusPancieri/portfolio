import { useLang } from "../../context/i18n.jsx";
import { useLaunch } from "../../context/LaunchContext.jsx";
import { APPS } from "./apps.jsx";

const HomeApp = () => {
  const { c } = useLang();
  const launchApp = useLaunch();

  const shortcuts = [
    { id: "about", Icon: APPS.find((a) => a.id === "about").Icon, text: c.home.shortcuts.about },
    { id: "works", Icon: APPS.find((a) => a.id === "works").Icon, text: c.home.shortcuts.works },
    { id: "contact", Icon: APPS.find((a) => a.id === "contact").Icon, text: c.home.shortcuts.contact },
  ];

  const launch = (id, e) => {
    const app = APPS.find((a) => a.id === id);
    launchApp(app, e.currentTarget.getBoundingClientRect());
  };

  return (
    <div className="p-6 font-anonymous">
      <p className="text-ink-soft text-xs mb-4">---</p>
      <h1 className="text-2xl font-bold text-ink">{c.home.greeting}</h1>
      <p className="text-accent-deep font-semibold mt-1">{c.home.role}</p>
      <p className="text-ink-soft text-xs mt-4 mb-6">---</p>

      <p className="text-ink leading-relaxed font-inter text-[15px]">
        {c.home.intro}
      </p>

      <h2 className="mt-8 mb-3 text-sm font-bold text-ink uppercase tracking-widest">
        ## {c.home.shortcutsTitle}
      </h2>
      <div className="flex flex-col gap-2">
        {shortcuts.map(({ id, Icon, text }) => (
          <button
            key={id}
            onClick={(e) => launch(id, e)}
            className="flex items-center gap-3 px-4 py-3 bg-panel-soft border-2 border-line rounded-md shadow-[2px_2px_0_0_rgba(59,51,37,0.85)] hover:bg-accent-soft hover:-translate-y-0.5 transition-all cursor-pointer text-left"
          >
            <Icon className="w-4 h-4 text-accent-deep shrink-0" />
            <span className="text-sm text-ink font-inter">{text}</span>
          </button>
        ))}
      </div>

      <p className="mt-8 text-xs text-ink-soft italic font-inter">
        {c.home.footer}
      </p>
    </div>
  );
};

export default HomeApp;
