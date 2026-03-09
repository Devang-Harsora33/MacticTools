import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "@/types/product";

export const fetchProductsFromFirestore = async (): Promise<Product[]> => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  
  const uniqueProductsMap = new Map();
  
  productsSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    const productName = data.name?.trim();
    
    if (productName && !uniqueProductsMap.has(productName)) {
      const product = {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt,
      };
      uniqueProductsMap.set(productName, product as Product);
    }
  });
  
  return Array.from(uniqueProductsMap.values());
};
