import { cache } from 'react';
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProductDetails from "@/components/ProductDetails";
import type { Product } from "@/types/product";
import { Metadata } from "next";
import { PageProps } from "@/types/page";

const getProduct = cache(async (id: string): Promise<Product> => {
  const productRef = doc(db, "products", id);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    throw new Error("Product not found");
  }

  const data = productSnap.data();

  const product = {
    id: productSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate().toISOString(),
    updatedAt: data.updatedAt?.toDate().toISOString(),
  } as unknown as Product;

  return product;
});

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
