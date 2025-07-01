"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <SendOutlinedIcon sx={{ fontSize: 36, color: "#a08c6b" }} />,
    title: "Vision",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    icon: <MailOutlineOutlinedIcon sx={{ fontSize: 36, color: "#a08c6b" }} />,
    title: "Mission",
    desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim",
  },
  {
    icon: <CallOutlinedIcon sx={{ fontSize: 36, color: "#a08c6b" }} />,
    title: "Goal",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit volupta tem accusa ntium eius modi tempora",
  },
  {
    icon: <InstagramIcon sx={{ fontSize: 36, color: "#a08c6b" }} />,
    title: "Strategy",
    desc: "Foste natus error sit volupta tem accusa ntium eius modi tempora",
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered animation for feature cards
      gsap.from(".contact-feature", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-features",
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
        },
      });

      // Fade up animation for heading
      gsap.from(".contact-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Slide in animation for image
      gsap.from(".contact-image", {
        x: -50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-image",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Staggered animation for paragraphs
      gsap.from(".contact-paragraph", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-content",
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
        },
      });

      // Button animations
      gsap.from(".contact-button", {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-button",
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
      className="w-full bg-[#fdfbf7] py-12 px-4 sm:px-8 lg:px-20 flex flex-col items-center mb-[10rem]"
    >
      <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-10">
        {/* Top features row */}
        <div className="contact-features grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="contact-feature flex flex-col items-center text-center gap-2"
            >
              <div className="mb-2">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-[#73573f] mb-1">
                {feature.title}
              </h3>
              <p className="text-[#3a3a3a] text-xl">{feature.desc}</p>
            </div>
          ))}
        </div>
        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-10 items-center w-full">
          {/* Image on the left */}
          <div className="contact-image w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full aspect-[3/3] max-w-lg rounded-xl overflow-hidden shadow-lg bg-[#f7ecd9] hover:scale-105 transition-transform duration-300">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fhomepage6.webp?alt=media&token=5fddae6e-c475-479f-8a3c-e874fdc1b1cf" // Placeholder image
                alt="Contact Mactic"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          {/* Text and buttons on the right */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 justify-center">
            <h2 className="contact-heading text-3xl sm:text-5xl font-bold text-[#73573f] mb-2 text-left">
              Connect with MACTIC: Your Partner in Progress
            </h2>
            <div className="contact-content flex flex-col gap-4 text-lg sm:text-xl text-[#3a3a3a]">
              <p className="contact-paragraph">
                We believe in fostering strong relationships with our customers.
                At MACTIC, your satisfaction is our priority, and we are always
                here to support your projects and answer your queries.
              </p>
              <p className="contact-paragraph">
                Reach out to our expert team for product advice, technical
                support, or any assistance you may need. Join the MACTIC
                community and experience the difference that dedication and
                quality make.
              </p>
            </div>
            <div className=" flex gap-4 mt-2">
              <button className=" bg-[#3a3a3a] text-[#fdfbf7] text-lg font-semibold rounded-full px-8 py-3 shadow hover:bg-gray-800 transition hover:scale-105">
                Contact Us
              </button>
              <button className=" bg-white text-[#73573f] text-lg font-semibold rounded-full px-8 py-3 border border-gray-400 hover:bg-gray-100 transition hover:scale-105">
                Support Centre
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
