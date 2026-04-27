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

const Card = ({ children, className = "", style = {} }) => (
  <div
    className={`rounded-2xl p-7 w-full h-full border border-white/10 transition-all duration-300 hover:border-white/20 ${className}`}
    style={{
      background: "linear-gradient(135deg, #1a1530 0%, #120e24 100%)",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)",
      ...style,
    }}
  >
    {children}
  </div>
);

const About = () => {
  useGSAP(() => {
    gsap.from("#card", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: "#about", start: "top center" },
    });
    gsap.from(".animated-text", {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: "#about", start: "top center" },
    });
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

            {/* ── Bio card ── */}
            <div className="md:col-span-7 col-span-12 row-span-5">
              <Card style={{
                background: "linear-gradient(135deg, #1e1640 0%, #130e28 100%)",
                boxShadow: "0 0 40px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}>
                <img src="/images/code.svg" alt="code" className="md:w-32 w-16" />
                <div className="mt-5">
                  <h1 className="text-blue-50 md:text-5xl text-3xl">Stas Shokarev</h1>
                  <p className="md:text-2xl mt-2 text-white/60">
                    Fullstack Developer specialising in React, Node.js, WordPress, and AI-integrated web experiences. Passionate about performance, modern CSS, and shipping products that scale.
                  </p>
                </div>
              </Card>
            </div>

            {/* ── 3D orb ── */}
            <div className="md:col-span-5 col-span-12 row-span-5">
              <div
                className="rounded-2xl w-full md:h-full h-60 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                style={{
                  background: "#0d0920",
                  boxShadow: "0 0 40px rgba(109,40,217,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <div className="w-full h-full hover:cursor-grab">
                  <Canvas>
                    <ambientLight intensity={0.3} />
                    <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={10} castShadow color="#6d28d9" />
                    <spotLight position={[-5, 5, -5]} angle={0.3} penumbra={1} intensity={100} castShadow color="#6d28d9" />
                    <pointLight position={[0, -5, 0]} intensity={0.5} color="#6d28d9" />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
                    <CyberOrb scale={2} position={[-1, 1, 0]} rotation={[0, -0.5, 0]} />
                  </Canvas>
                </div>
              </div>
            </div>

            {/* ── Web Dev card ── */}
            <div id="card" className="md:col-span-6 col-span-12 row-span-3">
              <Card>
                <div className="flex flex-col h-full justify-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex-center" style={{ background: "rgba(89,142,255,0.15)", border: "1px solid rgba(89,142,255,0.3)" }}>
                      <img src="/images/react.svg" alt="react" className="w-4 h-4" />
                    </div>
                    <h1 className="gradient-title md:text-3xl text-2xl font-medium animated-text">
                      Web Development
                    </h1>
                  </div>
                  <p className="md:text-xl max-w-96 animated-text text-white/55 leading-relaxed">
                    Full Stack Developer specialising in React, Node.js, WordPress, and modern CSS frameworks. Building fast, accessible, and scalable web products.
                  </p>
                </div>
              </Card>
            </div>

            {/* ── DevOps card ── */}
            <div id="card" className="md:col-span-3 col-span-12 row-span-3">
              <Card>
                <div className="flex flex-col h-full justify-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex-center" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>
                      <img src="/images/docker.svg" alt="docker" className="w-4 h-4" />
                    </div>
                    <h1 className="gradient-title md:text-3xl text-2xl font-medium animated-text">
                      Cloud & DevOps
                    </h1>
                  </div>
                  <p className="md:text-xl max-w-96 animated-text text-white/55 leading-relaxed">
                    CI/CD pipelines, containerised deployments with Docker, and cloud infrastructure on AWS and DigitalOcean. Built for scale, monitored for uptime.
                  </p>
                </div>
              </Card>
            </div>

            {/* ── WordPress card ── */}
            <div id="card" className="md:col-span-3 col-span-12 row-span-3">
              <Card>
                <div className="flex flex-col h-full justify-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex-center" style={{ background: "rgba(33,117,155,0.15)", border: "1px solid rgba(33,117,155,0.3)" }}>
                      <img src="/images/wordpress.svg" alt="wordpress" className="w-4 h-4" />
                    </div>
                    <h1 className="gradient-title md:text-3xl text-2xl font-medium animated-text">
                      WordPress
                    </h1>
                  </div>
                  <p className="md:text-xl max-w-96 animated-text text-white/55 leading-relaxed">
                    Custom WordPress themes, plugin development, and WooCommerce stores. Fast, SEO-friendly, and built to your spec.
                  </p>
                </div>
              </Card>
            </div>

            {/* ── Get in touch ── */}
            <div id="card" className="md:col-span-4 col-span-12 row-span-4">
              <div
                className="rounded-2xl p-7 w-full h-full border border-purple-500/20 transition-all duration-300 hover:border-purple-500/40"
                style={{
                  background: "linear-gradient(135deg, #1a1040 0%, #0f0b28 100%)",
                  boxShadow: "0 0 40px rgba(124,58,237,0.12), inset 0 1px 0 rgba(165,132,253,0.1)",
                }}
              >
                <div className="flex flex-col justify-between h-full">
                  <h1 className="gradient-title md:text-5xl text-3xl font-bold animated-text">GET IN TOUCH</h1>
                  <h1 className="gradient-title md:text-5xl text-3xl font-bold animated-text">AND</h1>
                  <h1 className="gradient-title md:text-5xl text-3xl font-bold animated-text">TELL YOUR THOUGHTS</h1>
                </div>
              </div>
            </div>

            {/* ── Social links ── */}
            {bentoSocialLinks.map((item, index) => (
              <div key={index} className="md:col-span-4 col-span-12 row-span-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl p-7 w-full h-full border border-white/10 transition-all duration-300 hover:border-white/25 group"
                  style={{
                    background: "linear-gradient(135deg, #1a1530 0%, #120e24 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex justify-between items-center h-full">
                    <div className="flex items-center md:gap-5 gap-3">
                      <img src={item.icon} alt={item.name} className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                      <h1 className="gradient-title md:text-3xl text-xl font-medium">{item.name}</h1>
                    </div>
                    <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      <img src="/images/arrowupright.svg" alt="arrow" className="md:scale-100 scale-75 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </a>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
