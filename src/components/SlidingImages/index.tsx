"use client";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";

interface SliderItem {
  color: string;
  src: string;
}

const slider1: SliderItem[] = [
  { color: "#e3e5e7", src: "/products/selected/1.JPG" },
  { color: "#d6d7dc", src: "/products/selected/2.JPG" },
  { color: "#e3e3e3", src: "/products/selected/3.JPG" },
  { color: "#21242b", src: "/products/selected/4.JPG" },
];

const slider2: SliderItem[] = [
  { color: "#d4e3ec", src: "/products/selected/5.JPG" },
  { color: "#e5e0e1", src: "/products/selected/6.JPG" },
  { color: "#d7d4cf", src: "/products/selected/5.JPG" },
  { color: "#e1dad6", src: "/products/selected/6.JPG" },
];

export default function SlidingImages() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider} initial={{}}>
        {slider1.map((project, index) => (
          <div
            key={index}
            className={styles.project}
            style={{ backgroundColor: project.color }}
          >
            <div
              className={styles.imageContainer}
              style={{ position: "relative" }}
            >
              <Image
                className="hover:scale-150 md:hover:scale-110 rounded-3xl lg:rounded-none md:scale-100 scale-125 transform-all duration-300 ease-in-out cursor-pointer hover:border-2 border-[#273F4F]"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt="slider image"
                src={`${project.src}`}
                quality={70}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className={styles.slider} initial={{}}>
        {slider2.map((project, index) => (
          <div
            key={index}
            className={styles.project}
            style={{ backgroundColor: project.color }}
          >
            <div
              className={styles.imageContainer}
              style={{ position: "relative" }}
            >
              <Image
                className="hover:scale-150 md:hover:scale-110 rounded-3xl lg:rounded-none md:scale-100 scale-125 transform-all duration-300 ease-in-out cursor-pointer hover:border-2 border-[#273F4F]"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt="slider image"
                src={`${project.src}`}
                quality={70}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        style={{ height }}
        className={styles.circleContainer}
        initial={{}}
      >
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
}
