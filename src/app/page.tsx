"use client";
import React, { useEffect, useState } from "react";
// import { FeaturedProducts } from "@/components/homepage/FeaturedProducts";
// import { AboutSection } from "@/components/homepage/AboutSection";
// import dynamic from "next/dynamic";
// import Collage from "@/components/homepage/Collage";
// import FeaturedProducts from "@/components/homepage/FeaturedProducts";
// import SlidingImages from "@/components/SlidingImages";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import Intro from "@/components/homepage/intro";
import ExploreSection from "@/components/homepage/ExploreSection";
import InnovationSection from "@/components/homepage/InnovationSection";
import MissionSection from "@/components/homepage/MissionSection";
import VisionSection from "@/components/homepage/VisionSection";
import ProductRangeSection from "@/components/homepage/ProductRangeSection";
// import { AboutSection } from "@/components/homepage/AboutSection";
import ContactSection from "@/components/homepage/ContactSection";
// import EmblaCarousel from "@/components/homepage/carouselHighlights";

// const DynamicHighlights = dynamic(
//   // () => import("../components/homepage/highlights/Highlights"),
//   () => import("../components/homepage/carouselHighlights/index"),
//   {
//     ssr: false,
//     loading: () => <p></p>,
//   }
// );

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: "#fdfbf7", overflow: "hidden" }}
    >
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Intro />
      <ExploreSection />
      <MissionSection />
      <VisionSection />
      <InnovationSection />
      {/* <AboutSection /> */}
      <ProductRangeSection />
      <ContactSection />
      {/* <FeaturedProducts /> */}
      {/* <EmblaCarousel /> */}
      {/* <DynamicHighlights /> */}
      {/* <Collage /> */}
      {/* <AboutSection /> */}
      {/* <SlidingImages /> */}
    </motion.div>
  );
}
