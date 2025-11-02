"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScroll } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Curve = () => {
  const container = useRef<HTMLDivElement>(null);
  const paths = useRef<SVGTextPathElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: container as React.RefObject<HTMLElement>,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    scrollYProgress.on("change", (e) => {
      paths.current.forEach((path, i) => {
        path.setAttribute("startOffset", -40 + i * 40 + e * 40 + "%");
      });
    });
  }, [scrollYProgress]);

  return (
    <div ref={container}>
      <svg className="w-full" viewBox="0 0 300 70">
        <path fill="none" id="curve" d="M0,70 C75,10 225,10 300,70" />
        <text
          className="text-[0.65rem] uppercase font-sf-pro"
          style={{ fill: "#73573f" }}
        >
          {[...Array(3)].map((_, i) => {
            return (
              <textPath
                key={i}
                ref={(ref) => {
                  if (ref) paths.current[i] = ref;
                }}
                startOffset={i * 40 + "%"}
                href="#curve"
              >
                MODERN + POWER{" "}
              </textPath>
            );
          })}
        </text>
      </svg>
    </div>
  );
};

export default function AboutPage() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 85%",
              toggleActions: "play none reverse none",
              markers: false,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-[#fdfbf7] overflow-hidden font-sf-pro">
      {/* Breadcrumbs */}
      <nav
        className="absolute top-[7rem] md:top-[11rem] left-[1rem] md:left-[4rem] font-sf-pro rounded-md px-4 py-2 z-50"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2 text-md text-[#fdfbf7]">
          <li>
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="font-sf-pro-semibold" aria-current="page">
            About
          </li>
        </ol>
      </nav>

      {/* Parallax Banner */}
      <div
        className="relative h-[100vh] bg-center bg-cover md:bg-fixed md:block hidden"
        style={{
          backgroundImage:
            "url(https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fbg_cover4.webp?alt=media&token=30a78fb1-2da6-4f79-86f5-02ad5a34c912)",
        }}
      >
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#fdfbf7] text-center px-4 fade-up">
            Tools That Work as Hard as You Do.{" "}
          </h1>
        </div>
      </div>
      <div
        className="relative h-[100vh] bg-center bg-cover md:bg-fixed md:hidden block"
        style={{
          backgroundImage:
            "url(https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Fhomepage8.webp?alt=media&token=f1441df3-316c-44ac-9287-cac1b699ef77)",
        }}
      >
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#fdfbf7] text-center px-4 fade-up">
            Tools That Work as Hard as You Do.{" "}
          </h1>
        </div>
      </div>

      {/* Intro Section */}
      <div className="relative  mx-auto py-8 md:py-16 px-4 md:px-6 fade-up">
        <div className="text-center max-w-3xl md:max-w-7xl mx-auto mt-10">
          <h2 className="text-5xl font-extrabold text-[#73573f]">
            About Mactic Tools{" "}
          </h2>
          <p className="mt-4 text-xl text-[#3a3a3a]">
            At MACTIC, we are dedicated to delivering high quality hand tools
            and power tools that meet the needs of professionals and DIY
            enthusiasts alike. We are built on the principles of durability,
            precision, and innovation. We aim to provide tools that enhance
            productivity and reliability in every task.
          </p>
        </div>
      </div>

      {/* History + Mission */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center fade-up">
        <div className="relative w-full aspect-[2/1.5] md:aspect-[3/3.5] rounded-xl overflow-hidden shadow-lg">
          <Image
            // src="https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Flogo.webp?alt=media&token=ae09fef1-71d2-40df-a527-1a39f95e2948"
            src="https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Faboutus.webp?alt=media&token=a88e2f22-9f09-416e-af3d-6394436d626d"
            alt="Mactic Tools History"
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </div>
        <div>
          <h3 className="text-5xl w-full flex md:justify-start justify-center items-center font-bold text-[#73573f]">
            Our Vision And Mission
          </h3>
          <p className="mt-4 text-xl text-[#3a3a3a]">
            To empower craftsmen, technicians, and builders with cutting-edge,
            high-performance tools that stand the test of time.
          </p>
          <p className="mt-4 text-xl text-[#3a3a3a]">
            To be a leading global brand in the tools industry, known for
            exceptional quality, advanced technology, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto py-12 md:py-24 px-4 md:px-6 fade-up">
        <h1 className="text-4xl font-bold text-[#73573f] text-center mb-8 md:mb-10">
          The MACTIC Advantage: Uncompromising Quality
        </h1>
        <h2 className="text-xl text-[#3a3a3a] text-center mb-8 md:mb-10">
          Every MACTIC tool undergoes stringent quality control measures,
          ensuring they meet the highest standards of performance and
          durability. From raw materials to the finished product, we
          meticulously inspect every component.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Superior Materials",
              desc: " We source only the finest-grade materials, engineered for maximum strength and resilience under challenging conditions.",
            },
            {
              title: "Precision Engineering",
              desc: "Our tools are crafted with meticulous attention to detail, ensuring optimal balance, ergonomics, and cutting-edge functionality.",
            },
            {
              title: "Rigorous Testing",
              desc: "Each product endures exhaustive testing protocols, far exceeding industry standards, to guarantee peak performance and reliability.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="bg-[#f1ece4] p-4 md:p-6 rounded-lg shadow-md hover:shadow-2xl hover:shadow-[#73573f] hover:scale-105 transition-all duration-300 ease-in-out border-2 border-[#ccc4b8]"
            >
              <h3 className="text-2xl font-semibold text-[#3a3a3a]">
                {service.title}
              </h3>
              <p className="mt-2 text-lg text-[#3a3a3a]">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Curve />
      {/* Image Collage */}
      {/* <div className="max-w-7xl  mx-auto px-4 md:px-6 mb-[2rem] pb-[6rem] md:pb-24 fade-up">
        <h2 className="text-3xl md:text-3xl font-bold text-[#73573f] text-center mb-8 md:mb-[5rem]">
          Our Craft in Action
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "https://firebasestorage.googleapis.com/v0/b/macticbrothers-4527f.firebasestorage.app/o/products%2Fselected%2F1.JPG?alt=media&token=5626b739-dc79-469f-a605-f1207d6b3f26",
            "https://firebasestorage.googleapis.com/v0/b/macticbrothers-4527f.firebasestorage.app/o/products%2Fselected%2F2.JPG?alt=media&token=9fec9e82-70a6-4d9e-8d0b-02a5cbfb349d",
            "https://firebasestorage.googleapis.com/v0/b/macticbrothers-4527f.firebasestorage.app/o/products%2Fselected%2F3.JPG?alt=media&token=68875887-b58f-4c3a-9836-177d96fc0ac3",
            "https://firebasestorage.googleapis.com/v0/b/macticbrothers-4527f.firebasestorage.app/o/products%2Fselected%2F4.JPG?alt=media&token=21bd19f7-9eba-40e6-aae3-8b3a950e8d5e",
            "https://firebasestorage.googleapis.com/v0/b/macticbrothers-4527f.firebasestorage.app/o/products%2Fselected%2F5.JPG?alt=media&token=0ad1bd31-a2f1-4b95-a741-5045d8a10e7c",
            "https://firebasestorage.googleapis.com/v0/b/macticbrothers-4527f.firebasestorage.app/o/products%2Fselected%2F6.JPG?alt=media&token=023f2924-4966-4609-8e4e-be0c0b0d45f4",
          ].map((img, i) => (
            <div
              key={i}
              className="relative h-48 sm:h-64 rounded-lg overflow-hidden"
            >
              <Image
                src={`${img}`}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center pb-[10rem] ">
        <div className="relative w-[100%] h-[70vh] px-2 md:w-[40%] md:h-[100vh] rounded-lg overflow-hidden mb-4">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/macticbrothers-4527f.firebasestorage.app/o/products%2Fdocuments%2FAADHAR%20UDYAM%20FORM%20%20mactic_page-0001.jpg?alt=media&token=22482ad3-164b-481d-8084-209be6154d4e"
            alt="Certificate"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 33vw"
          />
        </div>
        <p className="text-lg md:text-xl font-semibold text-[#1b1601] font-sf-pro">
          UDYAM Certificate
        </p>
      </div> */}
    </div>
  );
}
