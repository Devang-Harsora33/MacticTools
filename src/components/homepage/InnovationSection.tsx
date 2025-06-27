"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import TextIncreaseOutlinedIcon from "@mui/icons-material/TextIncreaseOutlined";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <HandshakeIcon sx={{ fontSize: 32, color: "#fdfbf7" }} />,
    title: "Ergonomic Design",
    desc: "Tools are shaped to fit comfortably in hand, reducing fatigue and increasing control for extended use.",
  },
  {
    icon: <TextIncreaseOutlinedIcon sx={{ fontSize: 32, color: "#fdfbf7" }} />,
    title: "Smart Features",
    desc: "Incorporating smart functionalities for improved efficiency and ease of operation, setting new industry benchmarks.",
  },
  {
    icon: <AllInclusiveOutlinedIcon sx={{ fontSize: 32, color: "#fdfbf7" }} />,
    title: "Sustainable Solutions",
    desc: "Developing eco-friendly manufacturing processes and energy-efficient tool designs for a greener future.",
  },
];

const InnovationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animation for heading
      gsap.from(".innovation-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".innovation-heading",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Fade up animation for description
      gsap.from(".innovation-description", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".innovation-description",
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
        },
      });

      // Slide in animation for image
      gsap.from(".innovation-image", {
        x: -50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".innovation-image",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Staggered animation for feature cards
      gsap.from(".innovation-feature", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".innovation-features",
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
      className="w-full bg-[#3a3a3a] py-12 px-4 sm:px-8 lg:px-20 flex flex-col items-center"
    >
      <div className=" w-full">
        <div className="max-w-screen-xl">
          <h2 className="innovation-heading w-full text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] mb-6 text-center lg:text-left">
            Innovation at Our Core: Redefining Tool Technology
          </h2>
          <p className="innovation-description text-base sm:text-lg text-[#fdfbf7] mb-10 text-center lg:text-left ">
            MACTIC is not just a tool manufacturer; we are innovators. Our
            dedicated research and development team constantly explores new
            technologies and materials to create tools that offer superior
            performance, enhanced safety, and improved user experience.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Image on the left */}
          <div className="innovation-image w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fhomepage2.webp?alt=media&token=0bb223f9-4959-4edd-88a7-2c3d4557b7ea" // Placeholder image
                alt="Innovative Tool"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          {/* Features on the right */}
          <div className=" w-full lg:w-1/2 flex flex-col gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="innovation-features flex items-start gap-2 shadow-md hover:shadow-2xl hover:shadow-[#f1ece4] bg-[#f1ece4] rounded-lg p-5 hover:scale-105 transition-all duration-300 ease-in-out border-4 border-[#ccc4b8]"
              >
                <div className="bg-[#3a3a3a] border border-[#bdbdbd] rounded-md p-2 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#73573f] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#3a3a3a] text-base">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
