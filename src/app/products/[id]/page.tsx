import React from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProductDetails from "@/components/ProductDetails";
import type { Product } from "@/types/product";
import { Metadata } from "next";
import { PageProps } from "@/types/page";

async function getProduct(id: string): Promise<Product> {
  const productRef = doc(db, "products", id);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    throw new Error("Product not found");
  }

  const data = productSnap.data();

  // Handle images array - Firestore stores arrays differently
  let imagesArray: string[] = [];
  if (data.images) {
    if (Array.isArray(data.images)) {
      // If it's already an array, use it directly
      imagesArray = data.images.filter((img: unknown): img is string => 
        typeof img === 'string' && img.trim().length > 0
      );
    } else if (typeof data.images === 'object' && data.images !== null) {
      // If it's an object (Firestore array representation), convert to array
      imagesArray = Object.values(data.images).filter((img: unknown): img is string => 
        typeof img === 'string' && img.trim().length > 0
      );
    }
  }

  // Convert Firestore timestamps to Date objects or undefined
  const product: Product = {
    id: productSnap.id,
    name: data.name || "",
    description: data.description || "",
    price: data.price || 0,
    imageUrl: data.imageUrl,
    images: imagesArray.length > 0 ? imagesArray : (data.imageUrl ? [data.imageUrl] : []),
    category: data.category,
    brand: data.brand,
    rating: data.rating,
    stock: data.stock,
    sizesAndQuantities: data.sizesAndQuantities || [],
    createdAt: data.createdAt
      ? data.createdAt.toDate
        ? data.createdAt.toDate()
        : new Date(data.createdAt.seconds * 1000)
      : undefined,
    updatedAt: data.updatedAt
      ? data.updatedAt.toDate
        ? data.updatedAt.toDate()
        : new Date(data.updatedAt.seconds * 1000)
      : undefined,
  };

  return product;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function Page(props: PageProps) {
  const { id } = await props.params;
  const product = await getProduct(id);

  return (
    <div className="container mx-auto">
      <ProductDetails product={product} />
    </div>
  );
}
