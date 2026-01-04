export interface SizeQuantity {
  size: string;
  quantity: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  images?: string[];
  category?: string;
  brand?: string;
  rating?: number;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
  materialOptions?: string[];
  thickness?: string;
  sizesAndQuantities?: SizeQuantity[];
} 