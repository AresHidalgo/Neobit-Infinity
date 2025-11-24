import { Review } from '@/types/review.type';
import { mockProducts } from './products.mock';
import { mockUsers } from './users.mock';

const reviewComments = [
    'Great product! Exceeded my expectations.',
    'Very satisfied with the purchase. Highly recommend!',
    'Good quality but could be better.',
    'Amazing value for money. Will buy again!',
    'Not as described but still good.',
    'Perfect for my needs. Fast shipping too!',
    'Excellent product quality and customer service.',
    'Could use some improvements but overall satisfied.',
    'Best purchase I made this year!',
    'Quality is top notch. Worth every penny.',
];

export const mockReviews: Review[] = [];

// Generate reviews for products
mockProducts.forEach((product) => {
    const reviewCount = product.reviewCount || Math.floor(Math.random() * 50) + 5;
    for (let i = 0; i < reviewCount && i < 30; i++) {
        const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const rating = i < 5 ? 5 : Math.floor(Math.random() * 3) + 3; // First 5 are 5 stars, rest 3-5
        const review: Review = {
            id: `review-${product.id}-${i}`,
            userId: user.id,
            userName: `${user.firstName} ${user.lastName}`,
            productId: product.id,
            rating,
            comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
            tags: rating >= 4 ? ['verified'] : [],
            isVerified: Math.random() > 0.5,
            createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
        };
        mockReviews.push(review);
    }
});

export const getReviewsByProductId = (productId: string): Review[] => {
    return mockReviews.filter((r) => r.productId === productId);
};

export const getReviewById = (id: string): Review | undefined => {
    return mockReviews.find((r) => r.id === id);
};

