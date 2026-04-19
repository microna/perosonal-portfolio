import { useEffect, useRef } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const containerRef = useRef();
  const barRef = useRef();
  const countRef = useRef();
  const nameRef = useRef();
  const subtitleRef = useRef();

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({ onComplete });

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.1
      )
      .to(
        barRef.current,
        { width: "100%", duration: 1.6, ease: "power2.inOut" },
        0.4
      )
      .to(
        counter,
        {
          val: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate() {
            if (countRef.current)
              countRef.current.textContent = Math.round(counter.val);
          },
        },
        0.4
      )
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power3.inOut",
        delay: 0.2,
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0b0620" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(109,40,217,0.15), transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />

      {/* Text */}
      <div className="relative text-center mb-14">
        <p
          ref={subtitleRef}
          className="text-white/30 text-xs tracking-[0.5em] uppercase mb-4"
        >
          Portfolio
        </p>
        <h1
          ref={nameRef}
          className="text-white font-bold md:text-8xl text-5xl tracking-tight leading-none"
        >
          Stas Shokarev
        </h1>
      </div>

      {/* Progress */}
      <div className="relative w-56 md:w-72 flex flex-col gap-2.5">
        <div className="w-full h-px bg-white/10 overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-0"
            style={{ background: "linear-gradient(90deg, #1c34ff, #598eff)" }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/20 text-xs tracking-widest uppercase">Loading</span>
          <span className="text-white/40 text-xs tabular-nums">
            <span ref={countRef}>0</span>%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
