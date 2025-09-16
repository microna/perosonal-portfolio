import React from "react";

const ContactForm = () => {
  return (
    <div className="flex-center">
      <form action="" className="w-full text-[#a7a7a7] flex flex-col gap-7">
        <div className="">
          <label
            htmlFor="name"
            className="block text-white md:text-2xl font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Tommy"
            className="bg-black-300 w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fefefe50] rounded-md"
          />
        </div>
        <div className="">
          <label
            htmlFor="email"
            className="block text-white md:text-2xl font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="test@test.com"
            className="bg-black-300 w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fefefe50] rounded-md"
          />
        </div>{" "}
        <div className="">
          <label
            htmlFor="subject"
            className="block text-white md:text-2xl font-semibold mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Your Subject"
            className="bg-black-300 w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fefefe50] rounded-md"
          />
        </div>{" "}
        <div className="">
          <label
            htmlFor="message"
            className="block text-white md:text-2xl font-semibold mb-2"
          >
            Message
          </label>
          <textarea
            type="text"
            rows={5}
            id="message"
            placeholder="Tommy"
            className="bg-black-300 w-full px-4 py-4 font-light md:text-base text-sm placeholder:text-[#fefefe50] rounded-md"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full py-4 bg-blue-50 text-white-50 font-semibold rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          {" "}
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
