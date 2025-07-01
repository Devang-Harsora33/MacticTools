"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Magnetic from "../../common/Magnetic";
import Link from "next/link";

export default function FooterContact() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image
                fill
                alt={"image"}
                src={`/Images/logo3.webp`}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2>Let&apos;s work together</h2>
          </span>
          {/* <h2></h2> */}
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Link href={"https://wa.me/917777883732"} target="_blank">
              <Rounded className={styles.button}>
                <p>Get in touch</p>
              </Rounded>
            </Link>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <Rounded>
            <Link href={"mailto:mactictools@gmail.com"}>
              <p>mactictools@gmail.com</p>
            </Link>
          </Rounded>
          <Rounded>
            <Link href={"tel:+917777883732"}>
              <p>+91 7777883732</p>
            </Link>
          </Rounded>
        </div>
        <div className={styles.info}>
          <div>
            <span>
              <h3 className=" w-fit border-b-2 border-[#fdfbf7] ">Version</h3>
              <p>©2025 Mactic Tools. All rights reserved.</p>
            </span>
          </div>
          <div className="flex  gap-2" style={{ flexDirection: "column" }}>
            <div>
              <h3 className=" w-fit border-b-2 border-[#fdfbf7] ">Socials</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <Magnetic>
                <Link href={"https://www.instagram.com/mactic.tools/"}>
                  <p>Instagram</p>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href={"https://wa.me/917900086062"}>
                  <p>Whatsapp</p>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href={"mailto:mactictools@gmail.com"}>
                  <p>Gmail</p>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
