import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { hightlightsSlides } from "../constants";
import "@/styles/embla.css";

const AUTOPLAY_INTERVAL = 4000;

const MainHighlights: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  // Autoplay logic
  useEffect(() => {
    if (!emblaApi) return;
    if (isHovered) return;
    autoplayTimer.current && clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, AUTOPLAY_INTERVAL);
    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
    };
  }, [emblaApi, isHovered]);

  // Update selected index
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Parallax effect
  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const scrollProgress = emblaApi.scrollProgress();
    emblaApi.slideNodes().forEach((_, i) => {
      const parallax = parallaxRefs.current[i];
      if (parallax) {
        // Move text at a different speed for parallax
        const diffToTarget = emblaApi.scrollSnapList()[i] - scrollProgress;
        parallax.style.transform = `translateY(${diffToTarget * 40}px)`;
      }
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("scroll", onScroll);
    onScroll();
    return () => {
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onScroll]);

  return (
    <div
      className="embla relative w-full h-[350px] md:h-[500px] bg-black"
      ref={emblaRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="embla__container h-full">
        {hightlightsSlides.map((slide, idx) => (
          <div
            className="embla__slide relative flex items-center justify-center"
            key={slide.id}
          >
            <Image
              src={slide.video}
              alt={`Highlight ${slide.id}`}
              fill
              className="object-cover rounded-2xl"
              priority={idx === 0}
            />
            <div
              ref={(el) => {
                parallaxRefs.current[idx] = el;
              }}
              className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center z-10 pointer-events-none"
              style={{ transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}
            >
              {slide.textLists.map((text, i) => (
                <p
                  key={i}
                  className="text-white text-xl md:text-3xl font-bold drop-shadow-lg text-center"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {hightlightsSlides.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full border border-white transition bg-white/60 ${
              selectedIndex === i ? "bg-white" : "bg-white/30"
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainHighlights;
