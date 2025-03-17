import React from 'react';

type Product = {
    id: number;
    name: string;
    price: number;
    image?: string;
};

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products = [] }) => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Productos Disponibles</h1>

            {products.length === 0 ? (
                <p>No hay productos disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                           {product.image && (
                                <img
                                    src={`/recursos/products/${product.image}`}
                                    alt={product.name}
                                    className="mt-2 rounded w-full h-40 object-cover"
                                />
                            )}
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p>Precio: ${(Number(product.price)).toFixed(2)}</p>

                            <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                                Ver Detalles
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
