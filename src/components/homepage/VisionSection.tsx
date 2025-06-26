import React from "react";
import Image from "next/image";

const VisionSection = () => {
  return (
    <section className="w-full bg-[#fdfbf7] py-12 px-4 sm:px-8 lg:px-20 flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto gap-10">
        {/* Map Image on the left */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full md:block hidden aspect-[1/1] max-w-2xl rounded-xl overflow-hidden shadow-lg bg-[#f7ecd9]">
            <Image
              src="/images/homepage4.jpg" // Placeholder image
              alt="World map with tools"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        {/* Content on the right */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <h2 className="text-5xl font-bold text-[#73573f] mb-2 text-center lg:text-left">
            Our Vision: A Global Leader in Tools
          </h2>
          <div className="relative w-full md:hidden block aspect-[1/1] max-w-2xl rounded-xl overflow-hidden shadow-lg bg-[#f7ecd9]">
            <Image
              src="/images/homepage4.webp"
              alt="World map with tools"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col gap-6 text-xl md:text-base text-[#3a3a3a] text-center lg:text-left">
            <p>
              Our vision is to ascend as the unequivocal global leader in the
              tools industry. We aspire to be the benchmark against which all
              others are measured, recognised universally for our unwavering
              commitment to exceptional quality, the seamless integration of
              advanced technology, and, most importantly, unparalleled customer
              satisfaction.
            </p>
            <p>
              We envision a future where MACTIC is synonymous with reliability
              and innovation, a brand that professionals and enthusiasts
              worldwide instinctively trust for their most critical tasks. This
              commitment drives us to continuously push the boundaries of tool
              design and manufacturing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
