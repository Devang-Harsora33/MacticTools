"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VisionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animation for heading
      gsap.from(".vision-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vision-heading",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Slide in animation for image
      gsap.from(".vision-image", {
        x: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vision-image",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Staggered animation for paragraphs
      gsap.from(".vision-paragraph", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".vision-content",
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#fdfbf7] py-12 px-4 sm:px-8 lg:px-20 flex flex-col items-center"
    >
      <div className="w-full flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto gap-10">
        {/* Map Image on the left */}
        <div className="vision-image w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full md:block hidden aspect-[1/1] max-w-2xl rounded-xl overflow-hidden shadow-lg bg-[#f7ecd9] hover:scale-105 transition-transform duration-300">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fhomepage4.webp?alt=media&token=945b411e-2cb8-4d30-8857-7d3192807591" // Placeholder image
              alt="World map with tools"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        {/* Content on the right */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <h2 className="vision-heading text-5xl font-bold text-[#73573f] mb-2 text-center lg:text-left">
            Our Vision: A Global Leader in Tools
          </h2>
          <div className="relative w-full md:hidden block aspect-[1/1] max-w-2xl rounded-xl overflow-hidden shadow-lg bg-[#f7ecd9] hover:scale-105 transition-transform duration-300">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fhomepage4.webp?alt=media&token=945b411e-2cb8-4d30-8857-7d3192807591" // Placeholder image
              alt="World map with tools"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="vision-content flex flex-col gap-6 text-xl md:text-base text-[#3a3a3a] text-center lg:text-left">
            <p className="vision-paragraph">
              Our vision is to ascend as the unequivocal global leader in the
              tools industry. We aspire to be the benchmark against which all
              others are measured, recognised universally for our unwavering
              commitment to exceptional quality, the seamless integration of
              advanced technology, and, most importantly, unparalleled customer
              satisfaction.
            </p>
            <p className="vision-paragraph">
              We envision a future where MACTIC is synonymous with reliability
              and innovation, a brand that professionals and enthusiasts
              worldwide instinctively trust for their most critical tasks. This
              commitment drives us to continuously push the boundaries of tool
              design and manufacturing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
