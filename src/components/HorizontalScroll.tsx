"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

const ScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );

    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: index === 0 ? 1 : 0.3,
          scale: index === 0 ? 1 : 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: `${index * 500} top`,
            end: `${(index + 1) * 500} top`,
            scrub: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="scroll-section-outer">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="scroll-section-inner">
          {[1, 2, 3, 4].map((num, idx) => (
            <div
              key={idx}
              className="scroll-section relative"
              ref={(el) => {
                if (el) sectionsRef.current[idx] = el;
              }}
            >
              <Image
                src={`/${num}.jpg`}
                alt={`Section ${num}`}
                fill
                className="object-cover rounded-[2rem]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollSection;
