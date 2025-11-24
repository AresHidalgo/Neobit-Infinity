import { Product } from '@/types/product.type';
import { categories } from './categories.mock';

const generateProduct = (
    id: string,
    name: string,
    price: number,
    originalPrice: number | undefined,
    category: string,
    tags: string[],
    stock: number,
    rating: number,
    reviewCount: number,
    description: string,
    sellerId: string,
    specifications?: Record<string, any>,
): Product => {
    return {
        id,
        name,
        description,
        price,
        originalPrice,
        discountPercent: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined,
        category,
        tags,
        images: [
            `https://picsum.photos/seed/${id}-1/800/600`,
            `https://picsum.photos/seed/${id}-2/800/600`,
            `https://picsum.photos/seed/${id}-3/800/600`,
        ],
        variants: {
            color: ['Black', 'White', 'Silver', 'Blue'],
            size: ['S', 'M', 'L', 'XL'],
        },
        stock,
        soldCount: Math.floor(Math.random() * 1000),
        rating,
        reviewCount,
        sellerId,
        isActive: true,
        specifications: specifications || {
            brand: 'TechBrand',
            weight: '250g',
            dimensions: '15 x 10 x 2 cm',
            material: 'Plastic',
            warranty: '1 year',
        },
        model3dUrl: undefined,
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
    };
};

export const mockProducts: Product[] = [
    // Electronics - Phones
    generateProduct(
        'prod-001',
        'SmartPhone Pro Max 256GB',
        999.99,
        1199.99,
        'phones',
        ['wireless', 'fast-charging', 'high-resolution', 'premium'],
        50,
        4.8,
        1250,
        'The ultimate smartphone experience with cutting-edge technology, stunning display, and powerful performance.',
        'seller-001',
        { storage: '256GB', ram: '8GB', display: '6.7" Super Retina', camera: '48MP Triple' },
    ),
    generateProduct(
        'prod-002',
        'BudgetPhone X 128GB',
        299.99,
        undefined,
        'phones',
        ['budget', 'portable'],
        120,
        4.2,
        890,
        'Affordable smartphone with great features for everyday use.',
        'seller-002',
        { storage: '128GB', ram: '4GB', display: '6.1" HD' },
    ),
    generateProduct(
        'prod-003',
        'GamingPhone Elite',
        1299.99,
        1499.99,
        'phones',
        ['gaming', 'fast-charging', 'high-resolution', 'premium'],
        30,
        4.9,
        567,
        'Built for gamers with high refresh rate display and powerful processor.',
        'seller-001',
        { storage: '512GB', ram: '12GB', display: '6.8" 144Hz', gpu: 'Advanced' },
    ),

    // Electronics - Computers
    generateProduct(
        'prod-004',
        'Laptop Pro 16" M2',
        1999.99,
        2299.99,
        'computers',
        ['premium', 'professional', 'portable'],
        45,
        4.7,
        1234,
        'Professional laptop with latest chip technology and stunning display.',
        'seller-001',
        { processor: 'M2 Pro', ram: '16GB', storage: '512GB SSD', display: '16" Retina' },
    ),
    generateProduct(
        'prod-005',
        'Gaming Laptop Ultra',
        1599.99,
        1799.99,
        'computers',
        ['gaming', 'premium', 'durable'],
        35,
        4.6,
        892,
        'High-performance gaming laptop with RTX graphics card.',
        'seller-002',
        { processor: 'Intel i9', ram: '32GB', storage: '1TB SSD', gpu: 'RTX 4070' },
    ),
    generateProduct(
        'prod-006',
        'Budget Laptop Essential',
        499.99,
        undefined,
        'computers',
        ['budget', 'portable'],
        80,
        4.1,
        456,
        'Affordable laptop for students and everyday computing.',
        'seller-002',
        { processor: 'Intel i5', ram: '8GB', storage: '256GB SSD' },
    ),

    // Electronics - Tablets
    generateProduct(
        'prod-007',
        'Tablet Pro 12.9"',
        1099.99,
        1299.99,
        'tablets',
        ['premium', 'portable', 'high-resolution'],
        40,
        4.8,
        678,
        'Professional tablet with large display perfect for creative work.',
        'seller-001',
        { display: '12.9" Retina', storage: '256GB', processor: 'M2' },
    ),
    generateProduct(
        'prod-008',
        'Tablet Mini 8.3"',
        499.99,
        599.99,
        'tablets',
        ['portable', 'budget'],
        65,
        4.3,
        445,
        'Compact tablet perfect for reading and entertainment on the go.',
        'seller-002',
        { display: '8.3" HD', storage: '64GB' },
    ),

    // Electronics - Accessories
    generateProduct(
        'prod-009',
        'Wireless Earbuds Pro',
        249.99,
        299.99,
        'accessories',
        ['wireless', 'bluetooth', 'premium'],
        100,
        4.7,
        2345,
        'Premium wireless earbuds with active noise cancellation.',
        'seller-003',
        { battery: '30h', anc: 'Yes', waterResistance: 'IPX5' },
    ),
    generateProduct(
        'prod-010',
        'Wireless Charging Pad',
        39.99,
        undefined,
        'accessories',
        ['wireless', 'fast-charging'],
        150,
        4.4,
        892,
        'Fast wireless charging pad compatible with all devices.',
        'seller-003',
        { power: '15W', compatibility: 'Universal' },
    ),
    generateProduct(
        'prod-011',
        'Bluetooth Speaker Portable',
        79.99,
        99.99,
        'audio',
        ['wireless', 'bluetooth', 'portable', 'waterproof'],
        90,
        4.5,
        1234,
        'Waterproof portable speaker with 360° sound.',
        'seller-003',
        { battery: '20h', waterResistance: 'IPX7', sound: '360°' },
    ),

    // Gaming
    generateProduct(
        'prod-012',
        'Gaming Mouse Pro',
        79.99,
        99.99,
        'gaming',
        ['gaming', 'wireless', 'premium'],
        75,
        4.6,
        678,
        'Precision gaming mouse with customizable RGB lighting.',
        'seller-004',
        { dpi: '16000', buttons: '8', wireless: 'Yes' },
    ),
    generateProduct(
        'prod-013',
        'Mechanical Keyboard RGB',
        129.99,
        159.99,
        'gaming',
        ['gaming', 'premium'],
        60,
        4.7,
        890,
        'RGB mechanical keyboard with customizable switches.',
        'seller-004',
        { switches: 'Mechanical', rgb: 'Yes', layout: 'Full' },
    ),

    // Smart Home
    generateProduct(
        'prod-014',
        'Smart Home Hub',
        149.99,
        199.99,
        'smart-home',
        ['innovative', 'wireless'],
        45,
        4.5,
        567,
        'Central hub for all your smart home devices.',
        'seller-005',
        { compatibility: 'Universal', voiceControl: 'Yes' },
    ),
    generateProduct(
        'prod-015',
        'Smart LED Bulbs Pack 4',
        49.99,
        69.99,
        'smart-home',
        ['innovative', 'wireless', 'budget'],
        120,
        4.3,
        1234,
        'Color-changing smart LED bulbs with app control.',
        'seller-005',
        { packSize: '4', color: 'RGB', appControl: 'Yes' },
    ),

    // More products
    ...Array.from({ length: 35 }, (_, i) => {
        const idx = i + 16;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const price = Math.random() * 2000 + 10;
        const hasDiscount = Math.random() > 0.6;
        return generateProduct(
            `prod-${String(idx).padStart(3, '0')}`,
            `Product ${idx} - ${category.name}`,
            Math.round(price * 100) / 100,
            hasDiscount ? Math.round((price * 1.3) * 100) / 100 : undefined,
            category.id,
            ['featured', Math.random() > 0.5 ? 'bestseller' : 'new'],
            Math.floor(Math.random() * 200),
            Math.random() * 1.5 + 3.5,
            Math.floor(Math.random() * 2000),
            `Description for product ${idx} in category ${category.name}.`,
            `seller-${Math.floor(Math.random() * 5) + 1}`,
        );
    }),
];

export const getProductById = (id: string): Product | undefined => {
    return mockProducts.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
    return mockProducts.filter((p) => p.category === category);
};

export const getFeaturedProducts = (limit: number = 10): Product[] => {
    return mockProducts
        .filter((p) => p.tags?.includes('bestseller') || p.rating >= 4.5)
        .slice(0, limit);
};

export const getLatestProducts = (limit: number = 10): Product[] => {
    return [...mockProducts]
        .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        })
        .slice(0, limit);
};

