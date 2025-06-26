"use client";
// import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState, useCallback } from "react";

// import { hightlightsSlides } from "../../constants";
import Image from "next/image";
import { hightlightsSlides } from "../../constants";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);
const VideoCarousel = () => {
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);

  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState<HTMLVideoElement[]>([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });

    // video animation to play the video when it is in the view
    // gsap.to(".video-slide", {
    //   scrollTrigger: {
    //     trigger: ".video-slide",
    //     toggleActions: "restart none none none",
    //   },
    //   onComplete: () => {
    //     setVideo((pre) => ({
    //       ...pre,
    //       startPlay: true,
    //       isPlaying: true,
    //     }));
    //   },
    // });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      // animation to move the indicator
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        const currentVideoElement = videoRef.current[videoId];
        if (currentVideoElement) {
          anim.progress(
            currentVideoElement.currentTime /
              hightlightsSlides[videoId].videoDuration
          );
        }
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay, isPlaying]);

  useEffect(() => {
    const currentVideo = videoRef.current[videoId];
    if (!currentVideo) return;

    if (!isPlaying) {
      currentVideo.pause();
    } else if (startPlay) {
      currentVideo.play();
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // vd id is the id for every video until id becomes number 3
  const handleProcess = useCallback((type: string, i: number) => {
    switch (type) {
      case "video-end":
        if (i < hightlightsSlides.length - 1) {
          setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        } else {
          setVideo((pre) => ({ ...pre, isEnd: true, videoId: 0 }));
        }
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;
      default:
        break;
    }
  }, []);

  // Add new useEffect for image slides
  useEffect(() => {
    const currentSlide = hightlightsSlides[videoId];
    if (
      currentSlide.video.toLowerCase().endsWith(".jpg") ||
      currentSlide.video.toLowerCase().endsWith(".jpeg") ||
      currentSlide.video.toLowerCase().endsWith(".png")
    ) {
      const timer = setTimeout(() => {
        if (videoId !== hightlightsSlides.length - 1) {
          handleProcess("video-end", videoId);
        } else {
          handleProcess("video-last", videoId);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [videoId, handleProcess]);

  const handleDotClick = (index: number) => {
    setVideo((prevVideo) => ({
      ...prevVideo,
      videoId: index,
      isLastVideo: index === hightlightsSlides.length - 1,
    }));
  };

  const handleLoadedMetaData = (
    i: number,
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const videoElement = e.currentTarget as HTMLVideoElement;
    setLoadedData((pre) => [...pre, videoElement]);
  };

  return (
    <>
      <div className="flex items-center font-sf-pro">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-20">
            <div className="video-carousel_container ml-[8%] md:ml-[20%]">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                {list.video.toLowerCase().endsWith(".mp4") ? (
                  <video
                    id="video"
                    playsInline={true}
                    className={`${
                      list.id === 2 && "translate-x-44"
                    } pointer-events-none`}
                    preload="auto"
                    muted
                    ref={(el) => {
                      if (el) videoRef.current[i] = el;
                    }}
                    onEnded={() =>
                      i !== hightlightsSlides.length - 1
                        ? handleProcess("video-end", i)
                        : handleProcess("video-last", i)
                    }
                    onPlay={() =>
                      setVideo((pre) => ({ ...pre, isPlaying: true }))
                    }
                    onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                  >
                    <source src={list.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={list.video}
                    alt={`Slide ${list.id}`}
                    fill
                    className="object-cover rounded-3xl"
                  />
                )}
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p
                    key={i}
                    className=" hidden md:flex md:text-2xl text-xl font-medium text-[#ba7c52]"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-center  mt-10 ">
        <button className="control-btn mr-3">
          <Image
            width={24}
            height={24}
            src={
              isLastVideo
                ? "/assets/images/replay.png"
                : !isPlaying
                ? "/assets/images/pause.png"
                : "/assets/images/pause.png"
            }
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset", 0)
                : !isPlaying
                ? () => handleProcess("play", videoId)
                : () => handleProcess("play", videoId)
            }
          />
        </button>
        <div className="flex-center py-6 px-5 bg-gray-300 backdrop-blur rounded-full gap-x-3">
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-gray-200 rounded-full relative cursor-pointer overflow-hidden"
              ref={(el) => {
                if (el) videoDivRef.current[i] = el;
              }}
              onClick={() => handleDotClick(i)}
            >
              <span
                className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300 ease-linear"
                ref={(el) => {
                  if (el) videoSpanRef.current[i] = el;
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoCarousel;
