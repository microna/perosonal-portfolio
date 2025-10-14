import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import TitleHeader from "../components/TitleHeader";
import GradientSpheres from "../components/GradientSpheres";
import { bentoSocialLinks } from "../constants";

import { CyberOrb } from "../components/models/Cyber_orb.jsx";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    gsap.from("#card", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });
    //stager text animation
    gsap.from(
      ".animated-text",
      {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top center",
        },
      },
      []
    );
  });
  return (
    <section id="about" className="flex-center relative md:p-0 px-5">
      <GradientSpheres
        sphere1Class="about-gradient-sphere about-sphere-1"
        sphere2Class="about-gradient-sphere about-sphere-2"
      />

      <div className="container w-full h-full md:my-40 my-20 relative z-10">
        <TitleHeader title="About Me" number="01" text="Some info about me" />
        <div className="md:mt-20 mt-10">
          <div className="grid grid-cols-12 md:grid-rows-12 gap-5">
            <div className="md:col-span-7 col-span-12 row-span-5">
              <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                <div>
                  <img
                    src="/images/code.svg"
                    alt="flower"
                    className="md:w-32 w-16 flower"
                  />
                </div>
                <div className="mt-5">
                  <h1 className="text-blue-50 md:text-5xl text-3xl">
                    Stas Shokarev
                  </h1>
                  <p className="md:text-2xl mt-2">
                    Fullstack Developer with deep expertise in WordPress, React,
                    and Node.js. Linux enthusiast and advocate for modern CSS
                    best practices.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 col-span-12 row-span-5">
              <div className="bg-[#8f0080]  hover:cursor-grab rounded-2xl w-full md:h-full h-60">
                <div className="w-full h-full">
                  <Canvas>
                    <ambientLight intensity={0.3} />
                    <spotLight
                      position={[5, 5, 5]}
                      angle={0.3}
                      penumbra={1}
                      intensity={10}
                      castShadow
                      color="#8f0080"
                    />
                    <spotLight
                      position={[-5, 5, -5]}
                      angle={0.3}
                      penumbra={1}
                      intensity={100}
                      castShadow
                      color="#8f0080"
                    />
                    <pointLight
                      position={[0, -5, 0]}
                      intensity={0.5}
                      color="#8f0080"
                    />
                    <OrbitControls
                      enableZoom={false}
                      autoRotate={true}
                      autoRotateSpeed={1.5}
                    />
                    <CyberOrb
                      scale={2}
                      position={[-1, 1, 0]}
                      rotation={[0, -0.5, 0]}
                    />
                  </Canvas>
                </div>
              </div>
            </div>
            <div id="card" className="md:col-span-6 col-span-12 row-span-3">
              <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                <div className="flex flex-col h-full justify-center gap-2">
                  <h1 className="gradient-title md:text-3xl text-2xl font-medium animated-text">
                    Web Development
                  </h1>
                  <p className="md:text-2xl max-w-96 animated-text">
                    Full Stack Developer specializing in WordPress, React, and
                    Node.js. Expert in Linux environments, modern CSS
                    frameworks, and building scalable web solutions.
                  </p>
                </div>
              </div>
            </div>
            <div id="card" className="md:col-span-6 col-span-12 row-span-3">
              <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                <div className="flex flex-col h-full justify-center gap-2">
                  <h1 className="gradient-title md:text-3xl text-2xl font-medium animated-text">
                    Cloud Hosting & DevOps{" "}
                  </h1>
                  <p className="md:text-2xl max-w-96 animated-text">
                    Secure server setup, automated deployments, and cloud
                    infrastructure management. From DigitalOcean to
                    AWS—optimized for performance and reliability.
                  </p>
                </div>
              </div>
            </div>
            <div id="card" className="md:col-span-4 col-span-12 row-span-4">
              <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                <div className="flex flex-col justify-between h-full">
                  <h1 className="gradient-title md:text-5xl text-3xl font-bold animated-text">
                    GET IN TOUCH
                  </h1>
                  <h1 className="gradient-title md:text-5xl text-3xl font-bold animated-text">
                    AND
                  </h1>
                  <h1 className="gradient-title md:text-5xl text-3xl font-bold animated-text">
                    TELL YOUR THOUGHTS
                  </h1>
                </div>
              </div>
            </div>
            {bentoSocialLinks.map((item, index) => (
              <div key={index} className="md:col-span-4 col-span-12 row-span-2">
                <div className="bg-black-300 rounded-2xl p-7 w-full h-full group cursor-pointer">
                  <div className="flex justify-between items-center h-full">
                    <a href={item.url} className="flex justify-between w-full">
                      <div className="flex items-center md:gap-5">
                        <img src={item.icon} alt={item.icon} />
                        <h1
                          target="_blank"
                          rel="noreferrer"
                          href={item.url}
                          className="gradient-title md:text-3xl text-xl md:m-0 ms-5 font-medium"
                        >
                          {item.name}
                        </h1>
                      </div>
                      <div className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                        <img
                          src="/images/arrowupright.svg"
                          alt="arrow-up"
                          className="md:scale-100 scale-50"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
