"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import React from "react";

function Links() {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });
    // gsap.to(".link", {
    //   opacity: 1,
    //   y: 0,
    //   duration: 1,
    //   stagger: 0.5,
    // });
  }, []);
  return (
    <>
      {/* <p className="link">
        Watch the film
        <Image
          src="/assets/images/watch.svg"
          alt="watch"
          className="ml-2"
          width={20}
          height={20}
        />
      </p> */}
      {/* <p className="link">Watch the event
                <Image src="/assets/images/right.svg" alt="right" className="ml-2" width={10} height={10} />
            </p> */}
    </>
  );
}

export default Links;
