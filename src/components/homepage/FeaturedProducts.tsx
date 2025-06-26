"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "L Profile",
    description:
      "Crafted with precision and attention to detail, our V-grooving profiles are designed to meet the highest standards of aesthetics and performance. Ideal for luxury interiors, architectural elements, and bespoke design projects, these profiles combine strength, style, and versatility.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FL_Profile%2F1746455934930-WPRF7844.JPG?alt=media&token=52a71b01-8145-43c7-af8e-898f7c8ec2d7",
    image2:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FL_Profile%2F1746455934929-WPRF7868_optimized-min.jpg?alt=media&token=1ea59368-2068-4550-b994-24eddc4e8049",
    link: "/products/LD5qTulsvSy3xkzo6Z0C",
  },
  {
    id: 2,
    name: "T Profile",
    description: "Sleek and minimalistic design for contemporary spaces.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FT_Profile%2F1746456347445-WPRF7970.JPG?alt=media&token=dabb1bb5-41fd-4aff-81e1-c8ec3760ab98",
    image2:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FT_Profile%2F1746456347446-WPRF7980.JPG?alt=media&token=0d1cf31e-9aa2-4e2d-b08d-f71ce61ce6f7",
    link: "/products/axivwfx5Gd3vRvvP1D99",
  },
  {
    id: 3,
    name: "Aluminum Fluted Wave Panel",
    description: "Hand-finished profiles ideal for bespoke designs.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FAluminum_Fluted_Wave_Panel%2F1746456445164-WPRF8104.JPG?alt=media&token=fcf7bdeb-9563-43d0-9743-53915ca489e8",
    image2:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FAluminum_Fluted_Wave_Panel%2F1746456445164-WPRF8114.JPG?alt=media&token=f94db820-1b21-4d0c-8030-344b759e8fdc",
    link: "/products/GjsCdkLvogvnhtci0Z1z",
  },
  {
    id: 4,
    name: "Round Flute Aluminum Panel",
    description: "Add definition and sophistication to walls and ceilings.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FRound_Flute_Aluminum_Panel%2F1746456493860-WPRF8119.JPG?alt=media&token=d53c4f80-f2e0-4d18-9d59-1fe3762cef5d",
    image2:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FRound_Flute_Aluminum_Panel%2F1746456493861-WPRF8127.JPG?alt=media&token=62db061e-3bd2-4f2b-a444-20651693767c",
    link: "/products/V54IqdiLwvrqDLyc4ymo",
  },
  {
    id: 5,
    name: "V-Fluted Panel",
    description: "A perfect blend of strength and aesthetic appeal.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FV-Fluted_Panel%2F1746456720829-WPRF8213.JPG?alt=media&token=2c3fd202-c6c7-42aa-9ae3-3ad9925457d4",
    image2:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FV-Fluted_Panel%2F1746456720829-WPRF8250.JPG?alt=media&token=9497858b-06bb-4878-9e5b-93e0bbf99061",
    link: "/products/Sj6ppxJZ7PijzOcYztt1",
  },
  {
    id: 6,
    name: "U Profile",
    description: "Standout grooves for statement feature walls.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FU_Profile%2F1746456146151-WPRF7888.JPG?alt=media&token=71e96c85-dc15-4b30-975e-9da0b24c48bd",
    image2:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FU_Profile%2F1746456146152-WPRF7901.JPG?alt=media&token=242f1a90-19a9-4c52-9e97-249c4d70e6cc",
    link: "/products/Q9JERjCsVvUh9Fn2bXp5",
  },
  {
    id: 7,
    name: "Angular Flute Aluminum Panel",
    description: "Soft metallic finish for sophisticated decor themes.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FAngular_Flute_Aluminum_Panel%2F1746456540540-WPRF8151.JPG?alt=media&token=feddf8de-80c9-44ab-a1a5-3febeb4964f0",
    image2:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FAngular_Flute_Aluminum_Panel%2F1746456540541-WPRF8139.JPG?alt=media&token=c85580df-c8c2-4434-815a-ac95985fb3c7",
    link: "/products/ccl1K3W8SNjvjp8Qmc7C",
  },
  {
    id: 8,
    name: "Collar Profile",
    description: "Rich bronze tones for premium design accents.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FCollar_Profile%2F1746456895829-WPRF8296.JPG?alt=media&token=a5a6ea30-8b7a-466f-9c8e-6599f563bb66",
    image2:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FCollar_Profile%2F1746456895830-WPRF8289.JPG?alt=media&token=30983886-e795-4812-943a-536f582b5a88",
    link: "/products/bEL13smsiPtOlZTX6sqH",
  },
  {
    id: 9,
    name: "Piano Panel",
    description: "Engineered for modern luxury and architectural highlights.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FPiano_Panel%2F1746456929526-IMG_4989%5B1%5D_compressed.jpg?alt=media&token=7eada31d-13d3-4fe1-824b-e3fde8ad69af",
    image2:
      "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FPiano_Panel%2F1746456929526-IMG_5003%5B1%5D_compressed.jpg?alt=media&token=e0e050e5-0f00-442b-b172-37da27c2deda",
    link: "/products/gyWyxpr4Qr5NE6TzO9sb",
  },
];

const FeaturedProducts: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.context(() => {
      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: `-${(Math.ceil(products.length / 3) - 1) * 100}vw`,
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "2000 top",
            scrub: 0.6,
            pin: true,
          },
        }
      );

      sectionsRef.current.forEach((section, index) => {
        gsap.fromTo(
          section,
          {
            opacity: index === 0 ? 1 : 1,
            scale: index === 0 ? 1 : 1,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: `${index * 500} top`,
              end: `${(index + 1) * 500} top`,
              scrub: true,
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => {
        pin.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, sectionRef);
  }, []);

  return (
    <section className="scroll-section-outer bg-[#73573f] overflow-hidden">
      <div ref={triggerRef} className="h-screen">
        <div
          ref={sectionRef}
          className="scroll-section-inner flex h-screen"
          style={{
            width: `${Math.ceil(products.length / 3) * 100}vw`,
            gap: "2rem",
            padding: "0 2rem",
          }}
        >
          {Array.from({ length: Math.ceil(products.length / 3) }).map(
            (_, sectionIdx) => (
              <div
                key={sectionIdx}
                className="scroll-section w-full md:w-screen flex flex-nowrap items-center justify-start gap-6 md:justify-evenly md:-pl-14 overflow-hidden md:overflow-visible snap-x snap-mandatory"
                ref={(el) => {
                  if (el) sectionsRef.current[sectionIdx] = el;
                }}
              >
                {products
                  .slice(sectionIdx * 3, sectionIdx * 3 + 3)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="group bg-[#fdfbf7] rounded-3xl shadow-lg overflow-hidden w-[90vw] min-w-[90vw] max-w-full md:w-[40%] md:min-w-[250px] md:max-w-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl snap-center"
                    >
                      <div className="relative h-[25rem] overflow-hidden">
                        <Image
                          src={
                            product.image ||
                            "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FL_Profile%2F1746206858134-L_profile%20(1).png?alt=media&token=fc65371b-781b-4880-852a-b275e1138cbd"
                          }
                          alt={product.name}
                          fill
                          className="object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0"
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 400px"
                          quality={75}
                        />

                        {/* Hover Image */}
                        {product.image2 && (
                          <Image
                            src={product.image2}
                            alt={`${product.name} - Hover`}
                            fill
                            className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 400px"
                            quality={75}
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <Link href={product.link}>
                            <button className="w-full bg-[#fdfbf7] text-[#73573f] py-3 px-6 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300">
                              Quick View
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-bold text-[#73573f] group-hover:text-[#273F4F] transition-colors duration-300">
                            {product.name}
                          </h3>
                          <span className="text-sm font-medium text-[#273F4F] bg-indigo-50 px-3 py-1 rounded-full">
                            New
                          </span>
                        </div>
                        <p className="text-[#3a3a3a] mb-6 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Link
                            href={product.link}
                            className="inline-flex items-center text-[#273F4F] hover:text-[#273F4F] font-medium group-hover:translate-x-2 transition-transform duration-300"
                          >
                            Learn more
                            <svg
                              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </Link>
                          {/* <div className="flex items-center space-x-2">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                              <svg
                                className="w-5 h-5 text-[#3a3a3a]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                              <svg
                                className="w-5 h-5 text-[#3a3a3a]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                              </svg>
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
