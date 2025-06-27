"use client";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { opacity, slideUp } from "./anim";
import Image from "next/image";

const words: string[] = [
  "नमस्ते",
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Hallo",
];

export default function Introduction() {
  const [index, setIndex] = useState<number>(0);
  const [dimension, setDimension] = useState<{ width: number; height: number }>(
    {
      width: 0,
      height: 0,
    }
  );
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (!imageLoaded || index === words.length - 1) return;
    const timeout = setTimeout(
      () => {
        setIndex(index + 1);
      },
      index === 0 ? 1000 : 150
    );
    return () => clearTimeout(timeout);
  }, [index, imageLoaded]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  } L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          <div className={styles.logoContainer}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/mactictools-28453.firebasestorage.app/o/assets%2Flogo.webp?alt=media&token=93a62701-61cf-4090-bc08-ae84a461661d"
              alt="Mactic Tools Logo"
              width={350}
              height={350}
              className={styles.logo}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          {imageLoaded && (
            <motion.p variants={opacity} initial="initial" animate="enter">
              <span></span>
              {words[index]}🙏🏼
            </motion.p>
          )}
          <svg>
            <motion.path variants={curve} initial="initial" exit="exit" />
          </svg>
        </>
      )}
    </motion.div>
  );
}
