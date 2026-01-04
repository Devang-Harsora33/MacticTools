import React from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "@/types/product";
import ProductsClient from "@/components/ProductsClient";
import { cache } from "react";

export const getProducts = cache(async () => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  const products = productsSnapshot.docs.map((doc) => {
    const data = doc.data();
    const product = {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString(),
      updatedAt: data.updatedAt?.toDate().toISOString(),
    };
    return product as Product;
  });
  return products;
});

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsClient initialProducts={products} />;
}
