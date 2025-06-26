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
  createdAt?: Date;
  updatedAt?: Date;
  materialOptions?: string[];
  thickness?: string;
} 