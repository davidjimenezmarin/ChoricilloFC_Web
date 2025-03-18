import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import ProductList from '@/Components/ProductList';

type Product = {
    id: number;
    name: string;
    price: number;
    image?: string;
};

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface ProductsByCategory {
    [categoryId: string]: Product[];
}

interface ShopProps {
    productsByCategory: ProductsByCategory;
    categories: Category[];
    selectedCategory?: Category | null;
}

export default function Shop({ productsByCategory = {}, categories = [], selectedCategory }: ShopProps) {
    const isFiltered = !!selectedCategory;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {isFiltered ? selectedCategory?.name : 'Shop'}
                </h2>
            }
        >
            <Head title={isFiltered ? selectedCategory?.name : 'Shop'} />

            <div className="py-12 h-auto w-100vw">
                <div className="mx-auto w-full sm:px-0 lg:px-0">
                    <div className="overflow-hidden bg-white shadow-sm ">
                        {isFiltered ? (
                            // Mostrar solo productos de la categoría seleccionada
                            <div key={selectedCategory?.id} className="mb-8">
                                <ProductList products={productsByCategory[selectedCategory?.id || ''] || []} />
                            </div>
                        ) : (
                            // Mostrar todas las categorías y sus productos
                            Object.keys(productsByCategory).map((categoryId) => {
                                const category = categories.find((c) => c.id.toString() === categoryId);
                                return (
                                    <div key={categoryId} className="mb-8">
                                        <h3 className="text-lg font-semibold mb-4">
                                            {category ? category.name : `Categoría ${categoryId}`}
                                        </h3>
                                        <ProductList products={productsByCategory[categoryId]} />
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
