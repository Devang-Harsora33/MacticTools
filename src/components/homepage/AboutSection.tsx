"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animation for heading
      gsap.from(".about-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Fade up animation for main paragraph
      gsap.from(".about-main-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-main-text",
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
        },
      });

      // Slide in animation for image
      gsap.from(".about-image", {
        x: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Fade up animation for bottom paragraph
      gsap.from(".about-bottom-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-bottom-text",
          start: "top 90%",
          end: "top 10%",
          toggleActions: "play none none reverse",
        },
      });

      // Scale animation for service cards on hover
      const serviceCards = document.querySelectorAll(".service-card");
      serviceCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#3a3a3a] py-12 px-4 sm:px-8 lg:px-20 flex flex-col items-center"
    >
      <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left: Heading and paragraph */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h2 className="about-heading text-5xl font-bold text-[#fdfbf7] mb-6 text-left">
            About MACTIC: Built for Excellence
          </h2>
          <p className="about-main-text text-xl text-[#fdfbf7] text-left max-w-2xl">
            At MACTIC, our foundation is built on an unwavering commitment to
            quality. We specialise in crafting and delivering high-performance
            hand tools and robust power tools, meticulously designed to cater to
            the rigorous demands of professionals and the discerning needs of
            DIY enthusiasts. Every tool we create embodies the core principles
            of durability, precision, and relentless innovation, ensuring they
            stand up to the toughest challenges.
          </p>
        </div>
        {/* Right: Product image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="about-image relative w-full aspect-[3/3] max-w-xl rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fhomepage5.webp?alt=media&token=27021385-56e4-45f4-ba75-32c41749be6a"
              alt="Tools on table"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
      {/* Bottom caption/paragraph */}
      <div className="w-full max-w-screen-xl mx-auto mt-12">
        <p className="about-bottom-text text-xl text-[#fdfbf7] text-left">
          Our goal is straightforward: to provide tools that not only meet but
          exceed expectations, enhancing productivity and guaranteeing
          reliability in every single task. We believe that the right tool can
          transform a job, and we are dedicated to supplying those
          transformative instruments to our valued customers.
        </p>
      </div>
    </section>
  );
};
