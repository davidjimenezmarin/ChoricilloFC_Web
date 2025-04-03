export type ProductSize = 'S' | 'M' | 'L' | 'XL' | undefined;

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

export type OrderDetail = {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    product: Product; // Relación con el producto
};

export type Order = {
    id: number;
    user_id: number;
    status?: 'pending' | 'completed' | 'cancelled'; // Estado de la orden
    total: number;
    shipping_cost?: number;
    details: OrderDetail[]; // Array de items del carrito
    order_date?: string; // Fecha de la orden
   
};

export interface Category {
    id: number;
    name: string;
    slug: string;
}

// Definimos las interfaces de los productos por categoría 
export interface ProductsByCategory {
    [categoryId: string]: Product[];
}


