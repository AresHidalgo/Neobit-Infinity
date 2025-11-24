export interface WishlistItem {
  productId: string;
  productName: string;
  price: number;
  image?: string;
  inStock: boolean;
  addedAt: Date;
}

export interface WishlistResponse {
  items: WishlistItem[];
  itemCount: number;
}

