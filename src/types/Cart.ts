// Shared types for cart and product

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category?: string;
  color?: string;
}

export interface CartItem extends Product {
  quantity: number;
} 