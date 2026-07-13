import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { useLang } from "../../context/i18n.jsx";
import { LINKS } from "../../utils/content.js";
import checkBadgeIcon from "../../assets/icons/check-badge.webp";

const ContactApp = () => {
  const { c } = useLang();
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);

  const schema = useMemo(() => {
    const e = c.contact.errors;
    return z.object({
      name: z.string().min(1, e.nameRequired).min(2, e.nameMin),
      email: z.string().min(1, e.emailRequired).email(e.emailInvalid),
      message: z.string().min(1, e.messageRequired).min(10, e.messageMin),
    });
  }, [c]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setSendError(false);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          title: data.name,
          name: data.name,
          email: data.email,
          message: data.message,
          time: new Date().toLocaleString(),
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      reset();
      setSent(true);
    } catch {
      setSendError(true);
    }
  };

  if (sent) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <img
          src={checkBadgeIcon}
          alt=""
          className="w-16 h-16 object-contain check-pop"
          draggable={false}
        />
        <h2 className="mt-4 text-xl font-anonymous font-bold text-ink">
          {c.contact.success}
        </h2>
        <p className="mt-1 text-sm text-ink-soft font-inter">
          {c.contact.successNote}
        </p>
      </div>
    );
  }

  const field = (hasError) =>
    `w-full bg-panel border-2 ${
      hasError ? "border-[#e25d33]" : "border-line"
    } rounded-md px-3 py-2 font-inter text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:shadow-[2px_2px_0_0_rgba(59,51,37,0.85)] focus:border-accent-deep transition-all`;

  const errorText = "mt-0.5 text-xs font-inter text-[#e25d33]";

  return (
    <div className="p-6">
      <h1 className="text-xl font-anonymous font-bold text-ink">
        {c.contact.heading}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-anonymous font-bold uppercase tracking-widest text-ink-soft">
            {c.contact.name}
          </span>
          <input type="text" className={field(!!errors.name)} {...register("name")} />
          {errors.name && <span className={errorText}>{errors.name.message}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-anonymous font-bold uppercase tracking-widest text-ink-soft">
            {c.contact.email}
          </span>
          <input type="email" className={field(!!errors.email)} {...register("email")} />
          {errors.email && <span className={errorText}>{errors.email.message}</span>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-anonymous font-bold uppercase tracking-widest text-ink-soft">
            {c.contact.message}
          </span>
          <textarea
            rows={5}
            className={`${field(!!errors.message)} resize-none`}
            {...register("message")}
          />
          {errors.message && <span className={errorText}>{errors.message.message}</span>}
        </label>

        {sendError && <span className={errorText}>{c.contact.errors.sendFailed}</span>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start px-6 py-2.5 bg-accent text-ink font-anonymous font-bold border-2 border-line rounded-md shadow-[3px_3px_0_0_rgba(59,51,37,0.85)] hover:bg-accent-deep hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(59,51,37,0.85)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
          {isSubmitting ? c.contact.sending : c.contact.send}
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
