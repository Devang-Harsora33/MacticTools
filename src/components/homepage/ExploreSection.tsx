"use client";
import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExploreSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animation for text content
      gsap.from(".explore-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".explore-text",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Slide in animation for image
      gsap.from(".explore-image", {
        x: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".explore-image",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Button animations
      gsap.from(".explore-button", {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".explore-button",
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
      className="w-full bg-[#fdfbf7] flex flex-col lg:flex-row items-center justify-center min-h-[70vh] px-8 py-10"
    >
      <div className="explore-text flex-1 flex flex-col justify-center px-0 py-10 sm:px-0 lg:py-0 lg:pl-24 text-center lg:text-left items-center lg:items-start">
        <h1 className="sm:text-5xl text-3xl font-bold text-[#73573f] mb-6 sm:mb-8 leading-tight">
          MACTIC: Precision. Durability. Innovation.
        </h1>
        <p className="text-xl md:text-base text-[#3a3a3a] mb-8 sm:mb-10 max-w-xl">
          Empowering professionals and DIY enthusiasts with cutting-edge tools
          for every task.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
          <div className="explore-button">
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/products"
                className="bg-[#3a3a3a] text-[#fdfbf7] text-base sm:text-lg font-semibold rounded-full px-6 sm:px-8 py-3 shadow hover:bg-gray-800 transition text-center block"
              >
                Explore Our Tools
              </Link>
            </motion.div>
          </div>
          <div className="explore-button">
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/about"
                className="bg-[white] text-[#3a3a3a] text-base sm:text-lg font-semibold rounded-full px-6 sm:px-8 py-3 border border-gray-400 hover:bg-gray-100 transition text-center block"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="explore-image flex-1 flex items-center justify-center w-full  relative">
        <div className="w-full aspect-[16/13] sm:aspect-[16/10] max-w-xs sm:max-w-2xl md:max-w-2xl relative hover:scale-105 transition-transform duration-300">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fhomepage.webp?alt=media&token=3730ccda-6872-4768-bb26-5991af29efd8"
            alt="Workshop"
            fill
            className="object-cover rounded-lg shadow-lg"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
