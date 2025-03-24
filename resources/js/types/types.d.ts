// Definimos las interfaz de los productos y categorías
export type Product = {
    id: number;
    name: string;
    slug?: string;
    price: number;
    image?: string;
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

