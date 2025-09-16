import React from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Tesrimnials from "./sections/Testimonials";
import Contact from "./sections/Contact";

const App = () => {
  return (
    <div className="">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Tesrimnials />
      <Contact />
    </div>
  );
};

export default App;
