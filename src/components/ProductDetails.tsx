"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Product, SizeQuantity } from "@/types/product";
import { Link2, Share2 } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import useEmblaCarousel from "embla-carousel-react";
import "@/styles/embla.css";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");
  const [enquiryQuantity, setEnquiryQuantity] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [thumbEmblaRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Process images array - ensure all URLs are valid strings
  const processImages = () => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images
        .filter((img): img is string => img !== undefined && img !== null && typeof img === 'string')
        .map((img) => img.trim())
        .filter((img) => img.length > 0);
    }
    if (product.imageUrl && typeof product.imageUrl === 'string') {
      return [product.imageUrl.trim()];
    }
    return [];
  };

  const images = processImages();

  // Debug: Log images for troubleshooting (remove in production)
  useEffect(() => {
    if (images.length > 0) {
      console.log('Product images loaded:', images.length, images);
    } else {
      console.warn('No images found for product:', product.name, 'images:', product.images, 'imageUrl:', product.imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

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

  if (isLoading) {
    return (
      <div className="animate-pulse bg-[#fdfbf7] py-[6rem] mb-[3rem]">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 items-start">
            {/* Image & Thumbnails Skeleton */}
            <div className="lg:max-w-lg w-full">
              {/* Main Image Skeleton */}
               <div className="relative h-[320px] sm:h-[500px] md:h-[600px] lg:h-[650px] rounded-xl bg-gray-300 overflow-hidden shadow-2xl" />
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
           
              {/* Specifications */}
              <div className="mt-8 space-y-4">
                <div className="h-6 w-32 bg-gray-300 rounded mb-3" />
                <div className="space-y-4">
                  {/* Size Dropdown Skeleton */}
                
                  {/* Quantity Dropdown Skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                    <div className="h-10 w-full bg-gray-200 rounded" />
                  </div>
                  {/* Available Options Skeleton */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                        <div className="h-4 w-28 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Enquiry Quantity */}
              <div className="mt-8 space-y-4">
                <div className="h-6 w-32 bg-gray-300 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-200 rounded" />
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

        <div className="bg-[#fdfbf7] w-full min-h-screen py-[6rem] mb-[3rem]">
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

        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 mt-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 items-start">
            {/* Image Section */}
            <div className="lg:max-w-lg w-full">
               <div className="relative h-fit sm:h-[500px] md:h-[600px] lg:h-[650px] rounded-xl overflow-hidden shadow-2xl">
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container">
                    {images.map((image, index) => (
                      <div className="embla__slide" key={index} style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px' }}>
                        {imageErrors.has(index) ? (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center min-h-[500px]">
                            <span className="text-gray-400 text-sm">Image not available</span>
                          </div>
                        ) : (
                          <Image
                            src={image}
                            alt={`${product.name} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 480px"
                            priority={index === 0}
                            quality={85}
                            onError={() => {
                              console.error(`Image ${index} failed to load:`, image);
                              setImageErrors((prev) => new Set(prev).add(index));
                            }}
                            onLoad={() => {
                              console.log(`Image ${index} loaded successfully:`, image);
                            }}
                          />
                        )}
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
                           {imageErrors.has(idx) ? (
                             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                               <span className="text-gray-400 text-xs">N/A</span>
                             </div>
                           ) : (
                             <Image
                               src={img}
                               alt={`Thumbnail ${idx + 1}`}
                               fill
                               className="object-cover"
                               sizes="64px"
                               quality={60}
                               onError={() => {
                                 setImageErrors((prev) => new Set(prev).add(idx));
                               }}
                               onLoad={() => {
                                 console.log(`Thumbnail ${idx} loaded successfully:`, img);
                               }}
                             />
                           )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Finishes Section */}
              
            </div>

            {/* Info Section */}
            <div className="mt-10 sm:mt-16 lg:mt-0">
              <h1 className="text-4xl font-bold tracking-tight text-[#73573f]">
                {product.name}
              </h1>
              <p className="mt-6 text-lg text-[#3a3a3a] leading-relaxed">
               {product.description}
       </p>

              {/* Specifications */}
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-[#73573f]">
                  Specifications
                </h3>
                <div className="text-[#3a3a3a] space-y-3">
                  {product.sizesAndQuantities && product.sizesAndQuantities.length > 0 ? (
                    <>
                      {/* Size Dropdown */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#73573f]">
                          Size:
                        </label>
                        <select
                          value={selectedSize}
                          onChange={(e) => {
                            setSelectedSize(e.target.value);
                            // Auto-select the quantity for the selected size
                            const selectedItem = product.sizesAndQuantities?.find(
                              (item) => item.size === e.target.value
                            );
                            setSelectedQuantity(selectedItem?.quantity || "");
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73573f] focus:border-[#73573f] outline-none bg-white text-[#3a3a3a]"
                        >
                          <option value="">Select Size</option>
                          {product.sizesAndQuantities.map((item: SizeQuantity, index: number) => (
                            <option key={index} value={item.size}>
                              {item.size}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quantity Dropdown */}
                      {selectedSize && (
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-[#73573f]">
                            Quantity:
                          </label>
                          <select
                            value={selectedQuantity}
                            onChange={(e) => setSelectedQuantity(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73573f] focus:border-[#73573f] outline-none bg-white text-[#3a3a3a]"
                          >
                            <option value="">Select Quantity</option>
                            {product.sizesAndQuantities
                              ?.filter((item) => item.size === selectedSize)
                              .map((item: SizeQuantity, index: number) => (
                                <option key={index} value={item.quantity}>
                                  {item.quantity}
                                </option>
                              ))}
                          </select>
                        </div>
                      )}

                      {/* Show all specifications if only viewing */}
                      {product.sizesAndQuantities.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm font-semibold text-[#73573f] mb-2">Available Options:</p>
                          <div className="space-y-2">
                            {product.sizesAndQuantities.map((item: SizeQuantity, index: number) => (
                              <div key={index} className="flex items-start gap-3 text-sm">
                                <span className="font-semibold text-[#73573f] min-w-[80px]">
                                  {item.size}:
                                </span>
                                <span className="text-[#3a3a3a]">{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500 italic">No specifications available</p>
                  )}
                </div>
              </div>

              {/* Enquiry Quantity */}
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-[#73573f]">
                  Enquiry Quantity
                </h3>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#73573f]">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    value={enquiryQuantity}
                    onChange={(e) => setEnquiryQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73573f] focus:border-[#73573f] outline-none bg-white text-[#3a3a3a]"
                  />
                </div>
              </div>
          

              {/* Actions */}
              <div className="mt-10 flex items-center gap-4">
                <button
                  onClick={() => {
                    const baseUrl = "https://wa.me/+917777883732";
                    let message = `Hello, I'm interested in the product: ${product.name}.`;

                    if (selectedSize) {
                      message += `\nSize: ${selectedSize}`;
                    }
                    if (selectedQuantity) {
                      message += ` : ${selectedQuantity}`;
                    }
                    if (enquiryQuantity) {
                      message += `\nEnquiry Quantity: ${enquiryQuantity}`;
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
