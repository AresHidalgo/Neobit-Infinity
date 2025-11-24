export interface Review {
  id: string;
  userId: string;
  userName?: string;
  productId: string;
  rating: number;
  comment: string;
  tags?: string[];
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateReviewData {
  productId: string;
  rating: number;
  comment: string;
  tags?: string[];
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
  tags?: string[];
}

