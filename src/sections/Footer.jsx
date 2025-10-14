import React from "react";
import { footerIconsList } from "../constants";

const Footer = () => {
  return (
    <div className="w-ful flex-center flex-col md:gap-10 gap-7 bg-black-300 p-10">
      <img src="/images/logo.png" alt="logo" className="w-7 h-7 object-cover" />
      <div className="flex items-center md:gap-16 gap-8">
        {footerIconsList.map((icon, index) => (
          <div
            key={index}
            className="cursor-pointer hover:-translate-y-5 transition-all duration-300"
          >
            <a href={icon.url} target="_blank" rel="noreferrer">
              <img
                src={icon.icon}
                alt={icon.name}
                className="md:size-10 size-8 "
              />
            </a>
          </div>
        ))}
      </div>
      <p className="font-regular md:text-lg text-sm">
        {new Date().getFullYear()} © All rights reserved
      </p>
      <p className="font-regular md:text-lg test-sm">
        Check my{" "}
        <a
          className="text-blue-600 hover:text-blue-400 transition-all duration-200 cursor-pointer"
          href="https://github.com/microna/"
        >
          GitHub
        </a>
      </p>
    </div>
  );
};

export default Footer;
