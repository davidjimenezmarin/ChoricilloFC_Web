export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type Order = {
    id: number;
    user_id: number;
    status?: 'pending' | 'completed' | 'cancelled'; // Estado de la orden
    total_amount: number;
    shipping_cost?: number;
    details: OrderDetail[]; // Array de items del carrito
    order_date?: string; // Fecha de la orden
   
};

export type OrderDetail = {
    size: string;
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    product: Product; // Relación con el producto
};

export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    slug?: string;
    image?: string;
    size?: ProductSize; // Puede ser "S", "M", "L" o "XL"
    stock: boolean; // Nuevo campo como booleano
};

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | undefined;

export interface Category {
    id: number;
    name: string;
    slug: string;
}

// Definimos las interfaces de los productos por categoría 
export interface ProductsByCategory {
    [categoryId: string]: Product[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    cart: Order;
    
    
};
