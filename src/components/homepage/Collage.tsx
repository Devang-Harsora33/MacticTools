import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";

// Define the structure of a single card item
interface Card {
  img: string;
  text: string;
  StrongText: string;
  text2: string;
}

// Define structure for each item in the Items array
interface Item {
  cardHeading1: string;
  cardHeading2: string;
  card1: Card;
  card2: Card;
  card3: Card;
}

const Collage: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const isVideo = (url: string) => {
    return (
      url.toLowerCase().includes(".mp4") || url.toLowerCase().includes("video")
    );
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Initialize all images and videos with initial state
    const elements = [...imageRefs.current, ...videoRefs.current].filter(
      Boolean
    );
    if (elements.length > 0) {
      gsap.set(elements, {
        opacity: 0,
        scale: 0.8,
      });

      // Create ScrollTrigger for each image and video
      elements.forEach((element) => {
        if (element) {
          gsap.to(element, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }
  }, [selected]);

  const Items: Item[] = [
    {
      cardHeading1: "Hydraulic Shearing Machine",
      cardHeading2:
        "This machine is used to cut metal sheets into smaller pieces.",
      card1: {
        img: "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fmachines%2Fshearing%2Fshearing_portrait.mp4?alt=media&token=836819b7-0be1-4bb1-97ae-af71c9ab5a44",
        text: "It works using a",
        StrongText: "Hydraulic Blade",
        text2:
          " that moves vertically to slice through metal.Perfect for straight-line cuts on SS sheets, mild steel, and aluminum",
      },
      card2: {
        img: "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FU_Profile%2F1746456146151-WPRF7888.JPG?alt=media&token=71e96c85-dc15-4b30-975e-9da0b24c48bd",
        // img: "/productcollage1.jpg",
        text: "Sheet metal",
        StrongText: "Fabrication Shops",
        text2:
          " ,Pre-processing of PVD-coated sheets, Panel Sharp Edge cutting for cladding, elevators, and furniture industries with high precision.",
      },
      card3: {
        img: "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fmachines%2Fshearing%2FShearing.png?alt=media&token=099cb8a7-d0ca-4629-8897-d2cd91e2eb3f",
        // img: "/machines/shearing.png",
        text: "A Industrial Solutions",
        StrongText: "(CNC Shearing Machine)",
        text2:
          "uses a straight-blade cutting action to precisely slice sheet metal into desired dimensions.",
      },
    },
    {
      cardHeading1: "CNC V-Grooving Machine",
      cardHeading2:
        "This machine is used to create precise V-shaped grooves on metal sheets — usually stainless steel, aluminum, or brass.",
      card1: {
        img: "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fmachines%2FVgrooving%2FVgrooving_portrait.mp4?alt=media&token=d830019e-aa24-4ccc-a11b-508dbac5d5eb",
        text: "It allows for clean, sharp bends without deforming the surface, which is essential for",
        StrongText: "Architectural And Decorative Applications.",
        text2:
          " Especially useful when you want to fold thicker sheets cleanly without leaving a visible bend radius",
      },
      card2: {
        img: "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fmachines%2FVgrooving%2FVgrooving.jpg?alt=media&token=67960a87-7984-40a4-be93-d8c12f622ea3",
        // img: "/productcollage2.jpg",
        text: "Interior design elements (e.g., wall panels, lift panels)",
        StrongText: "Modular furniture",
        text2: "  Signage and luxury metal fabrication.",
      },
      card3: {
        img: "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fmachines%2FVgrooving%2FVGrooving.png?alt=media&token=974c2ab3-8c45-4dd2-b585-8328fb5b73c4",
        // img: "/machines/vgrooving.png",
        text: "A Industrial Solutions",
        StrongText: "CNC V-Grooving Machine",
        text2:
          " creates narrow, controlled grooves in sheet metal to enable sharp bends or folds.",
      },
    },
    {
      cardHeading1: "CNC Press Brake",
      cardHeading2:
        "A bending machine that shapes metal sheets by pressing them into dies.",
      card1: {
        img: "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fmachines%2FBending%2Fbending_portrait%20(2).mp4?alt=media&token=02da9701-430b-49e1-94b8-93a621cec2b1",
        text: "Can create angles like",
        StrongText: "L, U, V, and custom bends.",
        text2: "Controlled via CNC for precise, repeatable bends",
      },
      card2: {
        img: "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FL_Profile%2F1746455934929-WPRF7868_optimized-min.jpg?alt=media&token=1ea59368-2068-4550-b994-24eddc4e8049",
        // img: "/productcollage3.jpg",
        text: "Manufacturing of ",
        StrongText: "T Pati, U Channel, Angles",
        text2:
          " from SS sheets Architectural metalwork, signage, electrical enclosures, etc.",
      },
      card3: {
        img: "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2Fmachines%2FBending%2FBending.png?alt=media&token=73627e0c-13d8-40cb-83a0-f0f0426d9db4",
        // img: "/machines/bending.png",
        text: "A Industrial Solutions",
        StrongText: "CNC Bending Machine",
        text2:
          " accurately forms sheet metal into angles or curves using programmable press brakes.",
      },
    },
  ];

  return (
    // <section className="w-full flex flex-col justify-center text-center items-center lg:px-32 bg-gradient-to-t from-[#1c1b1b] via-[#222121] to-[#00000055] pb-8">
    <section className="w-full flex flex-col justify-center text-center items-center   lg:px-32 bg-[#fdfbf7] pb-8 pt-6">
      <div className="hidden min-[1075px]:flex justify-center w-[80%] xl:w-3/5">
        <ul className="text-lg flex gap-6 text-[#86868b] h-9 w-full font-semibold">
          {[
            "Hydraulic Shearing Machine",
            "CNC V-Grooving Machine",
            "CNC Press Brake",
          ].map((title, index) => (
            <li
              key={index}
              className={`border-b-1 border-[#424245] w-full hover:text-[#73573f] transition-all duration-300 ease-in-out cursor-pointer flex justify-center ${
                selected === index && "text-[#73573f] border-b-[#73573f]"
              }`}
              onClick={() => setSelected(index)}
            >
              <div>{title}</div>
            </li>
          ))}
        </ul>
      </div>

      {Items.map((item, i) => (
        <div
          key={i}
          className={`w-[87%] h-[80%] pt-10 items-center text-[14px] duration-500 transition-opacity ease-in-out delay-0 ${
            i !== selected && "min-[1075px]:hidden"
          }`}
        >
          <div className="flex items-center flex-col font-sf-pro font-semibold">
            <div className="min-[1075px]:hidden text-3xl sm:text-2xl text-[#73573f] pt-5 mb-2 font-bold">
              {item.cardHeading1}
            </div>
            <p className="text-center text-[#73573f] w-full max-w-[36rem] px-4 text-base sm:text-xl mb-10 animate-fade break-words">
              {item.cardHeading2}
            </p>
          </div>

          <div className="flex flex-col min-[1075px]:flex-row gap-7 text-sm text-gray-200">
            {/* Card 1 */}
            <div className="flex flex-col justify-around items-center min-[1075px]:w-1/2 md:px-14 pt-7 py-5 bg-black rounded-3xl">
              <div className=" w-[80vw] h-[40vh] lg:w-[30vw] lg:h-[80vh] aspect-square animate-fade flex justify-center items-center overflow-hidden">
                {isVideo(item.card1.img) ? (
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[i * 3] = el;
                    }}
                    src={item.card1.img}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    className="w-full h-full object-cover"
                    onLoadedData={(e) => {
                      const video = e.target as HTMLVideoElement;
                      video.play().catch(() => {
                        console.log("Autoplay failed");
                      });
                    }}
                  />
                ) : (
                  <Image
                    ref={(el) => {
                      if (el) imageRefs.current[i * 3] = el;
                    }}
                    src={item.card1.img}
                    alt=""
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="text-center w-[90%] animate-fade mt-4">
                {item.card1.text}{" "}
                <span className="text-[#fdfbf7] font-bold">
                  {item.card1.StrongText}
                </span>{" "}
                {item.card1.text2}.
              </div>
            </div>

            {/* Card 2 + 3 */}
            <div className="min-[1075px]:w-1/2 flex flex-col gap-7">
              <div className="leading-5 bg-black flex flex-col gap-8 rounded-xl text-gray-200">
                <div className="text-center pt-6 px-4 sm:px-12 md:px-28 min-[1075px]:px-24 animate-fade">
                  {item.card2.text}{" "}
                  <strong className="text-[#fdfbf7] font-bold">
                    {item.card2.StrongText}
                  </strong>{" "}
                  {item.card2.text2}
                </div>
                <div className="w-full aspect-video overflow-hidden flex justify-center items-center animate-fade">
                  {isVideo(item.card2.img) ? (
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[i * 3 + 1] = el;
                      }}
                      src={item.card2.img}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls={false}
                      className="w-full h-full object-cover rounded-xl"
                      onLoadedData={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play().catch(() => {
                          console.log("Autoplay failed");
                        });
                      }}
                    />
                  ) : (
                    <Image
                      ref={(el) => {
                        if (el) imageRefs.current[i * 3 + 1] = el;
                      }}
                      src={item.card2.img}
                      alt=""
                      width={320}
                      height={320}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}
                </div>
              </div>

              <div className="bg-black w-full rounded-xl overflow-hidden">
                <p className="text-center px-4 sm:px-[10%] md:px-[22%] pt-8 pb-4 animate-fade">
                  {item.card3.text}{" "}
                  <strong className="text-[#fdfbf7]">
                    {item.card3.StrongText}
                  </strong>{" "}
                  {item.card3.text2}
                </p>
                <div className="w-full aspect-video overflow-hidden flex justify-center items-center animate-fade">
                  {isVideo(item.card3.img) ? (
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[i * 3 + 2] = el;
                      }}
                      src={item.card3.img}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls={false}
                      className="w-full h-full object-cover"
                      onLoadedData={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play().catch(() => {
                          console.log("Autoplay failed");
                        });
                      }}
                    />
                  ) : (
                    <Image
                      ref={(el) => {
                        if (el) imageRefs.current[i * 3 + 2] = el;
                      }}
                      src={item.card3.img}
                      alt=""
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Collage;
