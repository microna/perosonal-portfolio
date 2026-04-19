import { useState } from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Preloader from "./components/Preloader";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
