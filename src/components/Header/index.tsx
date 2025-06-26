"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const header = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const pathname = usePathname();
  const button = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        gsap.to(button.current, {
          scale: 1,
          duration: 0.25,
          ease: "power1.out",
        });
      } else {
        gsap.to(button.current, {
          scale: 0,
          duration: 0.25,
          ease: "power1.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateTextColor = () => {
      const headerEl = header.current;
      if (!headerEl) return;

      const bgColor = window.getComputedStyle(document.body).backgroundColor;

      const isLight = isLightColor(bgColor);

      if (isLight) {
        headerEl.classList.add(styles.darkText);
        headerEl.classList.remove(styles.lightText);
      } else {
        headerEl.classList.add(styles.lightText);
        headerEl.classList.remove(styles.darkText);
      }
    };

    const isLightColor = (rgb: string) => {
      const [r, g, b] = rgb
        .replace(/[^\d,]/g, "")
        .split(",")
        .map(Number);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 180;
    };

    updateTextColor();
    window.addEventListener("scroll", updateTextColor);
    window.addEventListener("resize", updateTextColor);

    return () => {
      window.removeEventListener("scroll", updateTextColor);
      window.removeEventListener("resize", updateTextColor);
    };
  }, []);

  return (
    <>
      <div ref={header} className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              className="opacity-100 mt-3 ml-3 transition-all duration-300 ease-in-out hover:scale-110 w-20 h-20 md:w-32 md:h-32"
              src="/Images/logo_1.webp"
              alt="Mactic Tools Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className={styles.nav}>
          <Magnetic>
            <div className={styles.el}>
              <Link href="/about">
                <p>About Us</p>
                <div className={styles.indicator}></div>
              </Link>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <Link href="/contact">
                <p>Contact</p>
                <div className={styles.indicator}></div>
              </Link>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <Link href="/products">
                <p>Products</p>
                <div className={styles.indicator}></div>
              </Link>
            </div>
          </Magnetic>
          {/* <Magnetic>
            <div className={styles.el}>
              <Link href="/admin/add-product">
                <p>Add Product</p>
                <div className={styles.indicator}></div>
              </Link>
            </div>
          </Magnetic> */}
        </div>
      </div>
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => setIsActive(!isActive)}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
};

export default Header;
