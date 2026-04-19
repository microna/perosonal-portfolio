import { useState } from "react";
import { slides } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const total = slides.length - 1;

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const go = (index) => setCurrent((index + total) % total);

  useGSAP(() => {
    gsap.to(".slider-item", {
      x: `-${current * 63}vw`,
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, [current]);

  return (
    <div className="relative">
      <div className="w-full relative lg:h-[60vh] md:h-[40vh] h-[60vh]">
        <div className="carousel-gradient-left-box md:w-52 w-10 h-full absolute bottom-0 left-0 z-20 pointer-events-none" />
        <div className="carousel-gradient-right-box md:w-52 w-10 h-full absolute bottom-0 right-0 z-20 pointer-events-none" />

        <div className="absolute w-full -left-[43vw] top-0">
          <div className="flex w-full lg:h-[60vh] md:h-[40vh] h-[60vh] items-center gap-[3vw]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="slider-item w-[60vw] h-full flex-none relative rounded-2xl overflow-hidden"
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 w-full px-5 py-4 backdrop-blur-md bg-black/50 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-sm tabular-nums leading-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white font-medium md:text-xl text-sm leading-none">
                        {slide.title}
                      </span>
                    </div>
                    <a
                      href={slide.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                    >
                      <span className="hidden md:inline text-sm">Visit Site</span>
                      <img
                        src="/images/arrowupright.svg"
                        alt="arrow"
                        className="md:size-5 size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex justify-end items-center gap-4 md:pr-0 pr-5">
        <span className="text-white/30 text-sm tabular-nums hidden md:block">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          onClick={() => go(current - 1)}
          className="w-11 h-11 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 active:scale-90 transition-all flex-center"
        >
          <img src="/images/CaretLeft.svg" alt="prev" className="w-4 h-4" />
        </button>
        <button
          onClick={() => go(current + 1)}
          className="w-11 h-11 rounded-full bg-blue-50 hover:bg-blue-300 active:scale-90 transition-all flex-center"
        >
          <img src="/images/CaretRight.svg" alt="next" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
