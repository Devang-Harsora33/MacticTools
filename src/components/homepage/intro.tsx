"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
// import Background from "/images/logo_1.png";

import { useScroll, useTransform, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const container = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-30vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".intro-image", {
        scale: 1,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      }).from(
        ".product-showcase img",
        {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      );

      gsap.to(".product-showcase img", {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });

      ScrollTrigger.refresh();
    }, container); // scoped context ensures cleanup

    return () => ctx.revert(); // clean up animations on unmount
  }, []);

  return (
    <div
      className="h-screen overflow-hidden bg-[#282828] relative -mb-[2rem]"
      ref={container}
    >
      <motion.div style={{ y, opacity }} className="relative h-full">
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fbg_cover4.webp?alt=media&token=30a78fb1-2da6-4f79-86f5-02ad5a34c912"
          }
          fill
          alt="Mactic Tools"
          className="intro-image"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </motion.div>
      {/* <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Freelance Developer -</p>
          <p ref={secondText}>Freelance Developer -</p>
        </div>
      </div> */}
      <motion.div
        className="absolute bottom-[10rem] md:bottom-[18rem] left-[7rem] md:left-[5rem] text-[#fdfbf7] text-2xl sm:text-[3rem] md:text-[4rem] font-sf-pro-semibold opacity-70 tracking-wide z-10"
        style={{ y }}
      >
        MODERN
      </motion.div>
      <motion.div
        className="absolute bottom-[10rem] md:bottom-[18rem] right-[7rem] md:right-[5rem] text-[#fdfbf7] text-2xl sm:text-[3rem] md:text-[4rem] font-sf-pro-semibold opacity-70 tracking-wide z-10"
        style={{ y }}
      >
        POWER
      </motion.div>
      {/* Product Showcase */}
      {/* <motion.div
        ref={productRef}
        className="product-showcase absolute bottom-20 left-0 right-0 flex justify-center gap-x-4 sm:gap-x-8 md:gap-x-[4rem] z-20 opacity-90 px-4"
        style={{ y }}
      >
        {[
          "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fselected%2F1.JPG?alt=media&token=5626b739-dc79-469f-a605-f1207d6b3f26",
          "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fselected%2F2.JPG?alt=media&token=9fec9e82-70a6-4d9e-8d0b-02a5cbfb349d",
          "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fselected%2F3.JPG?alt=media&token=68875887-b58f-4c3a-9836-177d96fc0ac3",
          "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fselected%2F4.JPG?alt=media&token=21bd19f7-9eba-40e6-aae3-8b3a950e8d5e",
        ].map((url, index) => (
          <motion.div
            key={index}
            className={`w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 relative z-10 ${
              index === 3 ? "hidden sm:block" : ""
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={url}
              alt={`Product ${index + 1}`}
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        ))}
      </motion.div> */}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{ y }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-white rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
