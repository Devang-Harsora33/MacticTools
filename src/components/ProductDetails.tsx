"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Link2, Share2 } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import useEmblaCarousel from "embla-carousel-react";
import "@/styles/embla.css";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedThickness, setSelectedThickness] = useState<string | null>(
    null
  );
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [thumbEmblaRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.imageUrl];

  // Sync main carousel with thumbnail selection
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Scroll main carousel when thumbnail is clicked
  const scrollTo = useCallback(
    (idx: number) => {
      if (emblaApi) emblaApi.scrollTo(idx);
    },
    [emblaApi]
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Determine if the product name contains "aluminium" or "Aluminum"
  const isAluminiumProduct = /aluminium|aluminum/i.test(product.name);
  console.log("Is Aluminium Product:", isAluminiumProduct);

  // Set material options and thickness options based on the product name
  const materialOptions = isAluminiumProduct
    ? ["Aluminum"]
    : ["Stainless Steel 304", "Aluminum", "Copper", "Brass", "Mild Steel (MS)"];

  const thicknessOptions = isAluminiumProduct
    ? ["4mm"]
    : ["0.8mm", "1mm", "1.2mm", "1.5mm", "2mm", "3mm", "4mm"];

  const availableColors = [
    { name: "Gold", backgroundImage: "/Images/available_colors/gold.jpg" },
    {
      name: "Rose Gold",
      backgroundImage: "/Images/available_colors/rose_gold.jpg",
    },
    { name: "Black", backgroundImage: "/Images/available_colors/black.jpg" },
    {
      name: "Antique Bronze",
      backgroundImage: "/Images/available_colors/bronze.jpeg",
    },
    {
      name: "Champagne",
      backgroundImage:
        "https://firebasestorage.googleapis.com/v0/b/dodiabrothers-4527f.firebasestorage.app/o/products%2FavailableColors%2FChampagne.jpg?alt=media&token=4d37fe96-3690-4331-8a85-2a0dcfa9b363",
    },
    { name: "Silver", backgroundImage: "/Images/available_colors/silver.jpg" },
    // { name: "Copper", gradient: "linear-gradient(145deg, #B87333, #7B3F00)" },
  ];

  console.log("Product Name:", product.name);

  if (isLoading) {
    return (
      <div className="animate-pulse bg-[#fdfbf7] py-[6rem] mb-[3rem]">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 items-start">
            {/* Image & Thumbnails Skeleton */}
            <div className="lg:max-w-lg w-full">
              {/* Main Image Skeleton */}
              <div className="relative h-[320px] sm:h-[400px] md:h-[480px] rounded-xl bg-gray-300 overflow-hidden shadow-2xl" />
              {/* Thumbnails Skeleton */}
              <div className="flex gap-2 mt-4">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-300"
                  />
                ))}
              </div>
              {/* Finishes Skeleton */}
              <div className="mt-6">
                <div className="h-6 w-40 bg-gray-300 rounded mb-4" />
                <div className="flex flex-wrap gap-4 mt-2">
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-full bg-gray-300"
                    />
                  ))}
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded mt-2" />
              </div>
            </div>

            {/* Info Section Skeleton */}
            <div className="mt-10 sm:mt-16 lg:mt-0 space-y-6 w-full">
              {/* Title */}
              <div className="h-10 bg-gray-300 rounded w-2/3" />
              {/* Description */}
              <div className="space-y-2 mt-4">
                <div className="h-5 bg-gray-300 rounded w-full" />
                <div className="h-5 bg-gray-300 rounded w-5/6" />
                <div className="h-5 bg-gray-300 rounded w-2/3" />
              </div>
              {/* Material Options */}
              <div className="mt-8">
                <div className="h-6 w-40 bg-gray-300 rounded mb-3" />
                <div className="flex flex-wrap gap-2 mt-2">
                  {[...Array(5)].map((_, idx) => (
                    <div
                      key={idx}
                      className="h-8 w-24 bg-gray-200 rounded-full"
                    />
                  ))}
                </div>
              </div>
              {/* Specifications */}
              <div className="mt-8 space-y-2">
                <div className="h-6 w-32 bg-gray-300 rounded mb-2" />
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-5 w-24 bg-gray-200 rounded" />
                  <div className="h-10 w-32 bg-gray-200 rounded" />
                </div>
                <div className="h-5 w-48 bg-gray-200 rounded mb-1" />
                <div className="h-5 w-40 bg-gray-200 rounded" />
              </div>
              {/* Use Cases */}
              <div className="mt-10">
                <div className="h-6 w-32 bg-gray-300 rounded mb-3" />
                <div className="space-y-2 pl-5">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="h-4 w-3/4 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
              {/* Actions */}
              <div className="mt-10 flex items-center gap-4">
                <div className="h-12 w-40 bg-gray-300 rounded-full" />
                <div className="h-12 w-12 bg-gray-300 rounded-full" />
                <div className="h-12 w-12 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta property="og:title" content={product.name} />
        <meta
          property="og:description"
          content={product.description || "Explore our premium products."}
        />
        <meta
          property="og:image"
          content={product.images?.[0] || product.imageUrl}
        />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta property="og:type" content="product" />
      </Head>

      <div className="bg-[#fdfbf7] py-[6rem] mb-[3rem]">
        {/* Breadcrumb */}
        <nav
          className="absolute top-[7rem] md:top-[11rem] left-[1rem] md:left-[4rem] font-sf-pro rounded-md px-4 py-2 z-50"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-2 text-md text-[#73573f]">
            <li>
              <Link href="/" className="hover:underline font-medium">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:underline font-medium">
                Products
              </Link>
            </li>
            <li>/</li>
            <li className="font-sf-pro-semibold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 mt-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 items-start">
            {/* Image Section */}
            <div className="lg:max-w-lg w-full">
              <div className="relative h-fit sm:h-[400px] md:h-[480px] rounded-xl overflow-hidden shadow-2xl">
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container">
                    {images.map((image, index) => (
                      <div className="embla__slide" key={index}>
                        <Image
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 480px"
                          priority={index === 0}
                          quality={85}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                      onClick={scrollPrev}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                      onClick={scrollNext}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )} */}
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="embla-thumbs mt-4" ref={thumbEmblaRef}>
                  <div className="embla-thumbs__container">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`embla-thumbs__slide ${
                          selectedIndex === idx ? "is-selected" : ""
                        }`}
                        type="button"
                        onClick={() => scrollTo(idx)}
                        aria-label={`Go to image ${idx + 1}`}
                      >
                        <div
                          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200"
                          style={{
                            borderColor:
                              selectedIndex === idx ? "#73573f" : "#e5e7eb",
                          }}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                            quality={60}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Finishes Section */}
              <div className="mt-6">
                <div className="flex items-center gap-4 text-[#73573f]">
                  <h3 className="text-lg font-semibold text-[#73573f]">
                    Available Finishes
                  </h3>
                  (Select Any)
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  {availableColors.map((color) => (
                    <div key={color.name} className="relative group">
                      <button
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-12 h-12 rounded-full border-2 transition-transform duration-200 ease-in-out relative overflow-hidden ${
                          selectedColor === color.name
                            ? "border-[#73573f] scale-110"
                            : "border-gray-300"
                        }`}
                        style={{
                          backgroundImage: `url(${color.backgroundImage})`,
                          boxShadow:
                            "0 4px 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
                        }}
                      >
                        <span className="absolute top-0 left-0 w-full h-full rounded-full bg-white opacity-10 pointer-events-none" />
                      </button>

                      {/* Enhanced Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 flex flex-col items-center opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 z-20 pointer-events-none">
                        <div className="px-2 py-1 bg-[#3a3a3a] text-white text-sm rounded-md shadow-lg whitespace-nowrap">
                          {color.name}
                        </div>
                        {/* Arrow */}
                        <div className="w-2 h-2 bg-[#3a3a3a] rotate-45 mt-[-4px]" />
                      </div>
                    </div>
                  ))}
                </div>

                {selectedColor && (
                  <p className="mt-2 text-md font-sf-pro text-[#73573f]">
                    Selected: {selectedColor}
                  </p>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-10 sm:mt-16 lg:mt-0">
              <h1 className="text-4xl font-bold tracking-tight text-[#73573f]">
                {product.name}
              </h1>
              <p className="mt-6 text-lg text-[#3a3a3a] leading-relaxed">
                Crafted with precision and attention to detail, our V-grooving
                profiles are designed to meet the highest standards of
                aesthetics and performance. Ideal for luxury interiors,
                architectural elements, and bespoke design projects, these
                profiles combine strength, style, and versatility.
              </p>

              {/* Material Options */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#73573f]">
                  Material Options
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {materialOptions.map((mat) => (
                    <span
                      key={mat}
                      className="inline-flex items-center px-4 py-1 rounded-full text-md font-medium bg-gray-100 text-[#73573f]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-[#73573f]">
                  Specifications
                </h3>
                <div className="text-[#3a3a3a] space-y-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <strong>Thickness:</strong>{" "}
                    <div className="flex items-center gap-2">
                      0.8mm to 4mm
                      <select
                        value={selectedThickness ?? ""}
                        onChange={(e) => setSelectedThickness(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                      >
                        <option value="">Select Thickness</option>
                        {thicknessOptions.map((thickness) => (
                          <option key={thickness} value={thickness}>
                            {thickness}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <strong className=" mr-2">Width Options:</strong> Minimum:
                    10mm, Maximum: Custom sizes as per project specifications
                  </div>
                  <div>
                    <strong className=" mr-2">Length:</strong> Standard 10 feet
                    (3000mm), Custom lengths available
                  </div>
                </div>
              </div>

              {/* Use Cases */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-[#73573f]">
                  Ideal For
                </h3>
                <ul className="mt-4 list-disc pl-5 space-y-2 text-[#3a3a3a]">
                  <li>Wall panels and ceiling designs</li>
                  <li>Furniture inlays and decorative trims</li>
                  <li>Luxury retail and hospitality interiors</li>
                  <li>Feature walls and architectural highlights</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="mt-10 flex items-center gap-4">
                <button
                  onClick={() => {
                    const baseUrl = "https://wa.me/+917900086062";
                    let message = `Hello, I'm interested in the product: ${product.name}.`;

                    if (selectedColor) {
                      message += ` Preferred color: ${selectedColor}.`;
                    }
                    if (selectedThickness) {
                      message += ` Preferred thickness: ${selectedThickness}.`;
                    }

                    const productLink = `${window.location.origin}/products/${product.id}`;
                    message += `\nProduct link: ${productLink}`;
                    const encodedMessage = encodeURIComponent(message);

                    window.open(`${baseUrl}?text=${encodedMessage}`, "_blank");
                  }}
                  className="inline-block px-12 py-3 text-lg font-medium text-[#fdfbf7] bg-[#73573f] rounded-full shadow-md hover:bg-[#3a3a3a] transition-all duration-300"
                >
                  Enquire Us
                </button>

                <button
                  onClick={handleShare}
                  className="p-3 text-[#73573f] bg-[#fdfbf7] rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
                  title="Share"
                >
                  <Share2 size={24} />
                </button>

                <button
                  onClick={handleCopyLink}
                  className="p-3 text-[#73573f] bg-[#fdfbf7] rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 relative"
                  title="Copy Link"
                >
                  <Link2 size={24} />
                  {isCopied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#3a3a3a] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
