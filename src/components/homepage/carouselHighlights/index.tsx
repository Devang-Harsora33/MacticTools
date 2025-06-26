"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";

import EmblaCarouselMain from "./EmblaCarousel";
import "@/styles/emblaCarousel.css";

export default function EmblaCarousel() {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 6;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <section
      id="highlights"
      className="relative overflow-hidden h-full bg-[#73573f] pb-[5rem] w-full"
    >
      <div className="mb-8 w-full md:flex items-end justify-between ">
        <h1 className=" text-[#fdfbf7] text-[2.5rem] md:text-[4rem] mb-[2rem] ml-[1rem] md:ml-[4rem]">
          Get the highlights.
        </h1>
      </div>

      <EmblaCarouselMain slides={SLIDES} options={OPTIONS} />
    </section>
  );
}
