"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const productImages = [
  "https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fproduct1.webp?alt=media&token=ef0f2216-40fc-40c9-b563-f584e3c4d7bd",
  "https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fproduct2.webp?alt=media&token=ca296c9c-ea87-4503-8dc8-01fd89976137",
  "https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fproduct3.webp?alt=media&token=9a759b7e-a695-4a9c-a7ce-721ea5b6733e",
  "https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fproduct4.webp?alt=media&token=f8910cb6-15c9-466c-8919-551e4cc7e8fe",
];

const ProductRangeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animation for heading
      gsap.from(".product-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".product-heading",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Fade up animation for description
      gsap.from(".product-description", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".product-description",
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
        },
      });

      // Staggered animation for product images
      gsap.from(".product-image", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".product-images",
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
        },
      });

      // Fade up animation for bottom paragraph
      gsap.from(".product-bottom-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".product-bottom-text",
          start: "top 90%",
          end: "top 10%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#3a3a3a] py-12 px-4 sm:px-8 lg:px-20 flex flex-col items-center"
    >
      <div className="w-full max-w-screen-xl mx-auto flex flex-col items-center">
        <h2 className="product-heading text-5xl font-bold text-[#fdfbf7] mb-6 text-center">
          Our Product Range: Tools for Every Trade
        </h2>
        <p className="product-description text-xl text-[#fdfbf7] mb-8 text-center max-w-4xl">
          Whether you&apos;re a seasoned professional or a dedicated DIYer,
          MACTIC offers a comprehensive range of tools tailored to meet diverse
          needs. Our catalogue includes everything from robust power tools for
          heavy-duty applications to precision hand tools for intricate tasks.
        </p>
        <div className="product-images w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {productImages.map((src, idx) => (
            <div
              key={idx}
              className="product-image relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-[#3a3a3a] hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={src}
                alt={`Product ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
        <p className="product-bottom-text text-lg text-[#fdfbf7] text-center max-w-4xl">
          Each product line is designed with the user in mind, ensuring optimal
          performance, comfort, and safety across all applications. Explore our
          extensive collection and find the perfect MACTIC tool to elevate your
          craftsmanship.
        </p>
      </div>
    </section>
  );
};

export default ProductRangeSection;
