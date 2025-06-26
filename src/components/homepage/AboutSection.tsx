"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade up animation for all elements
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Parallax effect for the image
      gsap.to(".about-image", {
        y: 20,
        scrollTrigger: {
          trigger: ".about-image",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
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
    <section className="w-full bg-[#3a3a3a] py-12 px-4 sm:px-8 lg:px-20 flex flex-col items-center">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left: Heading and paragraph */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-[#fdfbf7] mb-6 text-left">
            About MACTIC: Built for Excellence
          </h2>
          <p className="text-xl text-[#fdfbf7] text-left max-w-2xl">
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
          <div className="relative w-full aspect-[3/3] max-w-xl rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/homepage5.webp"
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
        <p className="text-xl text-[#fdfbf7] text-left">
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
