import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductList from '@/Components/ProductList';

type Product = {
    id: number;
    name: string;
    price: number;
    image_path?: string;
};

interface ShopProps {
    products: Product[];
}

export default function Shop({products}: ShopProps) {
    
    console.log("Productos dentro de ProductList:", products);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Shop
                </h2>
            }
        >
            <Head title="Shop" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ProductList products={products} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
