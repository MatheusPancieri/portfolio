import { useState } from "react";
import { useLang } from "../i18n.jsx";
import { LINKS } from "../content.js";

const ContactApp = () => {
  const { c } = useLang();
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: wire a real form service (EmailJS / Formspree) later
    setTimeout(() => setStatus("sent"), 1100);
  };

  if (status === "sent") {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <svg viewBox="0 0 48 48" className="w-16 h-16">
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="var(--color-accent)"
            stroke="var(--color-line)"
            strokeWidth="2.5"
          />
          <path
            d="M14 24.5 L21 31.5 L34 17.5"
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check-draw"
          />
        </svg>
        <h2 className="mt-4 text-xl font-anonymous font-bold text-ink">
          {c.contact.success}
        </h2>
        <p className="mt-1 text-sm text-ink-soft font-inter">
          {c.contact.successNote}
        </p>
      </div>
    );
  }

  const field =
    "w-full bg-panel border-2 border-line rounded-md px-3 py-2 font-inter text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:shadow-[2px_2px_0_0_rgba(59,51,37,0.85)] focus:border-accent-deep transition-all";

  return (
    <div className="p-6">
      <h1 className="text-xl font-anonymous font-bold text-ink">
        {c.contact.heading}
      </h1>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-anonymous font-bold uppercase tracking-widest text-ink-soft">
            {c.contact.name}
          </span>
          <input required name="name" type="text" className={field} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-anonymous font-bold uppercase tracking-widest text-ink-soft">
            {c.contact.email}
          </span>
          <input required name="email" type="email" className={field} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-anonymous font-bold uppercase tracking-widest text-ink-soft">
            {c.contact.message}
          </span>
          <textarea required name="message" rows={5} className={`${field} resize-none`} />
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="self-start px-6 py-2.5 bg-accent text-ink font-anonymous font-bold border-2 border-line rounded-md shadow-[3px_3px_0_0_rgba(59,51,37,0.85)] hover:bg-accent-deep hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(59,51,37,0.85)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
          {status === "sending" ? c.contact.sending : c.contact.send}
        </button>
      </form>

      <p className="mt-6 text-xs text-ink-soft font-inter">
        {c.contact.directly}{" "}
        <a
          href={`mailto:${LINKS.email}`}
          className="text-accent-deep font-semibold hover:underline"
        >
          {LINKS.email}
        </a>
      </p>
    </div>
  );
};

export default ContactApp;
