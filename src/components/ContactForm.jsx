import { useForm } from "react-hook-form";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const contactFormSchema = Z.object({
  name: Z.string().nonempty("Name is required"),
  email: Z.string().email("Invalid email").nonempty("Email is required"),
  subject: Z.string().nonempty("Subject is required"),
  message: Z.string().nonempty("Message is required"),
});

const initialValues = { name: "", email: "", subject: "", message: "" };

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue-50/60 focus:bg-white/8 transition-all duration-200";

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-white/50 text-xs font-medium uppercase tracking-widest">
      {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
  </div>
);

const Toast = ({ status }) => {
  if (!status) return null;

  const isSuccess = status === "success";

  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium border transition-all duration-300"
      style={
        isSuccess
          ? {
              background: "rgba(89,142,255,0.1)",
              border: "1px solid rgba(89,142,255,0.3)",
              color: "#93b4ff",
            }
          : {
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#fca5a5",
            }
      }
    >
      <span className="text-base">{isSuccess ? "✓" : "✕"}</span>
      {isSuccess
        ? "Message sent — I'll get back to you soon!"
        : "Something went wrong. Please try again."}
    </div>
  );
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues, resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setStatus(null);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          title: data.subject,
          name: data.name,
          email: data.email,
          message: data.message,
          time: new Date().toLocaleString(),
        },
        { publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY }
      );
      setStatus("success");
      reset(initialValues);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} type="text" placeholder="Your name" className={inputClass} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} type="text" placeholder="your@email.com" className={inputClass} />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject?.message}>
        <input {...register("subject")} type="text" placeholder="What's this about?" className={inputClass} />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Tell me about your project..."
          className={`${inputClass} resize-none`}
        />
      </Field>

      <Toast status={status} />

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer active:scale-[0.98] disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #1c34ff 0%, #598eff 100%)" }}
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <img src="/images/arrowupright.svg" alt="" className="size-4 brightness-0 invert" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
