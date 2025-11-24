import { PriceHistory } from '@/types/price-history.type';
import { mockProducts } from './products.mock';

export const mockPriceHistory: Record<string, PriceHistory[]> = {};

// Generate price history for each product
mockProducts.forEach((product) => {
    const history: PriceHistory[] = [];
    const days = 30;
    const originalPrice = product.originalPrice || product.price * 1.2;
    let currentPrice = originalPrice;

    for (let i = days; i >= 0; i--) {
        // Simulate price fluctuations
        const change = (Math.random() - 0.5) * 0.05; // ±5% change
        currentPrice = Math.max(product.price * 0.7, Math.min(originalPrice, currentPrice * (1 + change)));

        history.push({
            id: `ph-${product.id}-${i}`,
            productId: product.id,
            price: Math.round(currentPrice * 100) / 100,
            originalPrice: i === days ? originalPrice : undefined,
            discountPercent:
                originalPrice && currentPrice < originalPrice
                    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
                    : undefined,
            currency: 'USD',
            source: 'neobit',
            createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        });
    }

    // Add current price
    history.push({
        id: `ph-${product.id}-current`,
        productId: product.id,
        price: product.price,
        originalPrice: product.originalPrice,
        discountPercent: product.discountPercent,
        currency: 'USD',
        source: 'neobit',
        createdAt: new Date(),
    });

    mockPriceHistory[product.id] = history.reverse(); // Oldest to newest
});

export const getPriceHistoryByProductId = (productId: string): PriceHistory[] => {
    return mockPriceHistory[productId] || [];
};

export const getPriceHistoryChartData = (productId: string, days?: number) => {
    const history = getPriceHistoryByProductId(productId);
    if (!history.length) {
        return {
            history: [],
            currentPrice: 0,
            highestPrice: 0,
            lowestPrice: 0,
            priceChangePercent: 0,
        };
    }

    let filteredHistory = history;
    if (days) {
        const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        filteredHistory = history.filter((h) => new Date(h.createdAt) >= cutoffDate);
    }

    const prices = filteredHistory.map((h) => h.price);
    const highestPrice = Math.max(...prices);
    const lowestPrice = Math.min(...prices);
    const currentPrice = history[history.length - 1].price;
    const oldestPrice = filteredHistory[0]?.price || currentPrice;
    const priceChangePercent = oldestPrice ? ((currentPrice - oldestPrice) / oldestPrice) * 100 : 0;

    return {
        history: filteredHistory,
        currentPrice,
        highestPrice,
        lowestPrice,
        priceChangePercent: Math.round(priceChangePercent * 100) / 100,
    };
};

