export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  variant?: Record<string, any>;
  image?: string;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface CartResponse extends Cart { }

