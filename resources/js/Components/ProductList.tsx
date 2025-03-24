import React from 'react';
import { Link } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    slug?: string;
    price: number;
    image?: string;
};

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products = [] }) => {
    return (
        <div className="p-6">
            {products.length === 0 ? (
                <p>No hay productos disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Link key={product.id} href={route('product.show', product.slug)} className="border rounded-lg p-4 shadow hover:shadow-lg transition block">
                            {product.image && (
                                <img
                                    src={`/recursos/products/${product.image}`}
                                    alt={product.name}
                                    className="mt-2 mx-auto h-[200px] w-1/2 object-cover"
                                />
                            )}
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p>Precio: {(Number(product.price)).toFixed(2)}€</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
