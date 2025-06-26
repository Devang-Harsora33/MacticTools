import React from "react";
import Link from "next/link";
import Image from "next/image";

const ExploreSection = () => {
  return (
    <section className="w-full bg-[#fdfbf7] flex flex-col lg:flex-row items-center justify-center min-h-[70vh] px-8 py-10">
      <div className="flex-1 flex flex-col justify-center px-4 py-10 sm:px-0 lg:py-0 lg:pl-24 text-center lg:text-left items-center lg:items-start">
        <h1 className="text-5xl font-bold text-[#73573f] mb-6 sm:mb-8 leading-tight">
          MACTIC: Precision. Durability. Innovation.
        </h1>
        <p className="text-xl md:text-base text-[#3a3a3a] mb-8 sm:mb-10 max-w-xl">
          Empowering professionals and DIY enthusiasts with cutting-edge tools
          for every task.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
          <Link
            href="/products"
            className="bg-[#3a3a3a] text-[#fdfbf7] text-base sm:text-lg font-semibold rounded-full px-6 sm:px-8 py-3 shadow hover:bg-gray-800 transition text-center"
          >
            Explore Our Tools
          </Link>
          <Link
            href="/about"
            className="bg-[white] text-[#3a3a3a] text-base sm:text-lg font-semibold rounded-full px-6 sm:px-8 py-3 border border-gray-400 hover:bg-gray-100 transition text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center w-full min-h-[220px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] relative">
        <div className="w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] max-w-xs sm:max-w-2xl md:max-w-2xl relative">
          <Image
            src="/images/homepage.webp"
            alt="Workshop"
            fill
            className="object-cover rounded-lg shadow-lg"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
