import { useEffect, useState } from "react";
import { useLang } from "../../context/i18n.jsx";
import clockIcon from "../../assets/icons/relogio.webp";

const Clock = () => {
  const { lang } = useLang();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);

  const locale = lang === "pt" ? "pt-BR" : "en-US";
  const time = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString(locale, {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

  return (
    <div className="flex items-center gap-2 select-none">
      <img src={clockIcon} alt="" className="w-6 h-6 object-contain shrink-0" draggable={false} />
      <div className="flex flex-col items-end leading-tight font-anonymous text-ink w-44 shrink-0">
        <span className="text-sm font-bold whitespace-nowrap">{time}</span>
        <span className="text-[10px] text-ink-soft whitespace-nowrap">{date}</span>
      </div>
    </div>
  );
};

export default Clock;
