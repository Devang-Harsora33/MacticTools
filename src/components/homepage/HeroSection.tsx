import React from "react";
import Link from "next/link";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src="/Images/logo_1.png"
          alt="mactic Brothers Hero Background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Welcome to mactic Brothers
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Discover our premium selection of products designed to meet your needs
          with quality and excellence.
        </p>
        <div className="mt-10">
          <Link
            href="/products"
            className="inline-block bg-indigo-600 py-3 px-8 border border-transparent rounded-md text-base font-medium text-white hover:bg-indigo-700"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
};
