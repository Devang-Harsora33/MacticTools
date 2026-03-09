import React from "react";
import { Product } from "@/types/product";
import ProductsClient from "@/components/ProductsClient";
import { unstable_cache } from "next/cache";
import { fetchProductsFromFirestore } from "@/lib/products-data";

export const getProducts = unstable_cache(
  async () => {
    return fetchProductsFromFirestore();
  },
  ["products-list"],
  { tags: ["products"] }
);

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsClient initialProducts={products} />;
}
