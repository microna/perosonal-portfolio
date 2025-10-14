import React from "react";
import { useForm } from "react-hook-form";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const contactFormSchema = Z.object({
    name: Z.string().nonempty("Name is required"),
    email: Z.string().email("Invalid email").nonempty("Email is required"),
    subject: Z.string().nonempty("Subject is required"),
    message: Z.string().nonempty("Message is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(contactFormSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        title: data.subject,
        name: data.name,
        email: data.email,
        message: data.message,
        time: new Date().toLocaleString(),
      };
      const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
      const userID = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

      await emailjs.send(serviceID, templateID, payload, {
        publicKey: userID,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
      reset(initialValues);
      alert("Message sent successfully!");
    }
  };

  return (
    <div className="flex-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-full text-[#a7a7a7] flex flex-col gap-7"
      >
        <div className="">
          <label
            htmlFor="name"
            className="block text-white md:text-2xl font-semibold mb-2"
          >
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Type your name"
            className="bg-black-300 w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fefefe50] rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="">
          <label
            htmlFor="email"
            className="block text-white md:text-2xl font-semibold mb-2"
          >
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            id="email"
            placeholder="Your email"
            className="bg-black-300 w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fefefe50] rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>{" "}
        <div className="">
          <label
            htmlFor="subject"
            className="block text-white md:text-2xl font-semibold mb-2"
          >
            Subject
          </label>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            placeholder="Your Subject"
            className="bg-black-300 w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fefefe50] rounded-md"
          />
          {errors.subject && (
            <p className="text-red-500 mt-1">{errors.subject.message}</p>
          )}
        </div>{" "}
        <div className="">
          <label
            htmlFor="message"
            className="block text-white md:text-2xl font-semibold mb-2"
          >
            Message
          </label>
          <textarea
            {...register("message")}
            type="text"
            rows={5}
            id="message"
            placeholder="Your Message"
            className="bg-black-300 w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fefefe50] rounded-md"
          />
          {errors.message && (
            <p className="text-red-500 mt-1">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full py-4 bg-blue-50 text-white-50 font-semibold rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
