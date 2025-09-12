import React from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Tesrimnials from "./sections/Testimonials";

const App = () => {
  return (
    <div className="">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Tesrimnials />
    </div>
  );
};

export default App;
