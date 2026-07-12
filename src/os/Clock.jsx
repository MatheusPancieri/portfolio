import { useEffect, useState } from "react";
import { useLang } from "./i18n.jsx";

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
    <div className="flex flex-col items-end leading-tight font-anonymous text-ink select-none">
      <span className="text-sm font-bold">{time}</span>
      <span className="text-[10px] text-ink-soft">{date}</span>
    </div>
  );
};

export default Clock;
