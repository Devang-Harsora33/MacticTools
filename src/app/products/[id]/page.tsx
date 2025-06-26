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

  // Convert Firestore timestamps to Date objects or undefined
  const product: Product = {
    id: productSnap.id,
    name: data.name,
    description: data.description,
    price: data.price,
    imageUrl: data.imageUrl,
    images: data.images,
    category: data.category,
    brand: data.brand,
    rating: data.rating,
    stock: data.stock,
    createdAt: data.createdAt
      ? new Date(data.createdAt.seconds * 1000)
      : undefined,
    updatedAt: data.updatedAt
      ? new Date(data.updatedAt.seconds * 1000)
      : undefined,
  };

  return product;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProduct(params.id);
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function Page(props: PageProps) {
  const product = await getProduct(props.params.id);

  return (
    <div className="container mx-auto">
      <ProductDetails product={product} />
    </div>
  );
}
