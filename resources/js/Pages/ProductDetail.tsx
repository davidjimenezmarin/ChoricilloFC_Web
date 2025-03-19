import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image?: string;
};

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    return (
        <AuthenticatedLayout 
            header={
                <Link href={route('shop')} className="text-black hover:underline">
                    Volver a la tienda
                </Link>
                
            }
        >
            <Head title={product.name} />
            <div className="container mx-auto py-12">
                <div className="flex gap-6">
                    <img src={`/recursos/products/${product.image}`} alt={product.name} className="w-1/3 rounded-lg shadow-lg" />
                    <div>
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-lg font-semibold mt-2">Precio: ${product.price}</p>
                        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
