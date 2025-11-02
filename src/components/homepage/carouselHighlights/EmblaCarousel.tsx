import React, { useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { hightlightsSlides } from "@/components/constants";
import Image from "next/image";

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarouselMain: React.FC<PropType> = ({ options }) => {
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { ...options, align: "start" },
    [Autoplay({ playOnInit: true, delay: 4000 })]
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ml-[1.25rem] md:ml-[9rem] lg:ml-[15rem]">
          {hightlightsSlides.map((slide) => (
            <div
              className="embla__slide  overflow-hidden rounded-xl"
              key={slide.id}
            >
              <Image
                src={slide.image}
                alt={`Slide ${slide.id}`}
                fill
                className="object-cover"
              />
              <div className="embla__slide__text">
                {slide.textLists.map((line, idx) => (
                  <p className=" font-sf-pro" key={idx}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <button
          onClick={toggleAutoplay}
          type="button"
          className="border-2 border-[#fdfbf7] rounded-full p-2 transition-all duration-300 ease-in-out shadow-md shadow-[#fdfbf7]"
        >
          <Image
            src={
              // autoplayIsPlaying ? "/pause.png" : "/play.png"
              autoplayIsPlaying
                ? "https://firebasestorage.googleapis.com/v0/b/macticbrothers-4527f.firebasestorage.app/o/products%2Fassets%2Fpause.png?alt=media&token=0c31835a-3e95-4214-a13a-fa5b1297a0df"
                : "https://firebasestorage.googleapis.com/v0/b/macticbrothers-4527f.firebasestorage.app/o/products%2Fassets%2Fplay.png?alt=media&token=cd2e1c5f-9d34-45c5-8acf-61c265044011"
            }
            alt={autoplayIsPlaying ? "Pause" : "Play"}
            width={30}
            height={30}
            className={`transition-all duration-300 ease-in-out ${
              autoplayIsPlaying ? "ml-0" : "ml-[1px]"
            }`}
          />
        </button>

        <div
          className={`embla__progress${
            showAutoplayProgress ? "" : " embla__progress--hidden"
          }`}
        >
          <div className="embla__progress__bar" ref={progressNode} />
        </div>

        {/* <button className="embla__play" onClick={toggleAutoplay} type="button">
          {autoplayIsPlaying ? "Stop" : "Start"}
        </button> */}
        <div className="embla__buttons ">
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarouselMain;
