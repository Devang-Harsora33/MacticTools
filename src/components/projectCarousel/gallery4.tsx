"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
// 1. Import Link from next/link for client-side navigation
import Link from "next/link"; 
import { Button } from "@/components/projectCarousel/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/projectCarousel/carousel";
import { fetchProductsFromFirestore } from "@/lib/products-data";
import Image from "next/image";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[]; 
}

const Gallery4 = ({
  title = "Our Products",
  description = "Discover our premium selection of products, crafted to deliver superior performance, reliability, and value across every application.",
  items: initialItems = [], 
}: Gallery4Props) => {
  const [items, setItems] = useState<Gallery4Item[]>(initialItems);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (initialItems.length > 0) return;

    const fetchSpecificProducts = async () => {
      try {
        const allProducts = await fetchProductsFromFirestore();
        
        const desiredNames = [
          "16PCS WOOD HOLESAW SET",
          "ZERO CHIPPING",
          "5PCS CROSS CUT MULTI BITS SET",
          "ELECTRODE HOLDER",
          "10mm (22V) CORDLESS DRILL",
          "RIM",
        ];

        const filteredProducts = allProducts.filter((product: any) =>
          desiredNames.includes(product.name)
        );

        const formattedData: Gallery4Item[] = filteredProducts.map((product: any) => ({
          id: product.id,
          title: product.name,
          description: product.description,
          // 2. This constructs the URL: /products/6BGyQdZBdGf5B41A09Gs
          href: `/products/${product.id}`, 
          image: product.images?.[0] ?? product.imageUrl ?? "",
        }));

        setItems(formattedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchSpecificProducts();
  }, [initialItems]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    // 1. Run immediately to set initial state
    updateSelection();

    // 2. Listen for 'select' (user moves slide) AND 'reInit' (data loaded/slides changed)
    carouselApi.on("select", updateSelection);
    carouselApi.on("reInit", updateSelection);
    carouselApi.on("scroll", updateSelection); // Optional: creates snappier updates

    return () => {
      carouselApi.off("select", updateSelection);
      carouselApi.off("reInit", updateSelection);
      carouselApi.off("scroll", updateSelection);
    };
    // 3. Add 'items' to dependency array so this re-runs when data loads
  }, [carouselApi, items]);

  return (
    <section className="pt-20 pb-10">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="explore-text flex-1 flex flex-col justify-center px-0 py-10 sm:px-0 lg:py-0 lg:pl-24 text-center lg:text-left items-center lg:items-start">
            <h2 className="sm:text-5xl text-3xl font-bold text-[#73573f] mb-6 sm:mb-8 leading-tight">
              {title}
            </h2>
            <p className="text-xl md:text-base text-[#3a3a3a] mb-8 mx-12 sm:mx-0 sm:mb-10 max-w-xl">
              {description}
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                {/* 3. Use Link instead of 'a' tag for smoother navigation */}
                <Link href={item.href} className="group rounded-xl block">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
                    
                    {/* Optional: If you want the text overlay back, uncomment this: */}
                    {/* <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                        {item.title}
                      </div>
                    </div> 
                    */}
                    
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-[#6c5843]" : "bg-[#6c5843]/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };