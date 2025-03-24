import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import ProductList from '@/Components/ProductList';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { Category, ProductsByCategory } from '@/types/types';

interface ShopProps {
    productsByCategory: ProductsByCategory;
    categories: Category[];
    selectedCategory?: Category | null;
}

export default function Shop({ productsByCategory = {}, categories = [], selectedCategory }: ShopProps) {
    // Equivalente a const isFiltered = selectedCategory !== null && selectedCategory !== undefined;
    const isFiltered = !!selectedCategory;

    return (
        <AuthenticatedLayout
            header={isFiltered && selectedCategory?.name && <h2 className='px-2 bg-black w-fit rounded-lg border text-white'>{selectedCategory.name}</h2>}
        >
            
            <Head title={isFiltered ? selectedCategory?.name : 'Inicio'} />

            {!isFiltered && (
                <div className="h-[70vh] w-auto bg-cover bg-[center_bottom_59%] bg-no-repeat bg-[url('/recursos/tiendaInicio.jpg')] ">

                </div>
            )}

            <div className='hidden sm:flex sm:py-6'>
                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                        <NavLink 
                            href={route('shop')}
                            active={route().current('shop') 
                                && !route().current('shop', 'camisetas') 
                                && !route().current('shop', 'pantalones') 
                                && !route().current('shop', 'accesorios')}
                        >
                            Inicio
                        </NavLink>
                    </div>

                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                        <NavLink href={route('shop', 'camisetas')} active={route().current('shop', 'camisetas')}>
                            Camisetas
                        </NavLink>
                    </div>

                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                        <NavLink href={route('shop', 'pantalones')} active={route().current('shop', 'pantalones')}>
                            Pantalones
                        </NavLink>
                    </div>

                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                        <NavLink href={route('shop','accesorios')} active={route().current('shop', 'accesorios')}>
                            Accesorios
                        </NavLink>
                    </div>
            </div>

            <div className=" h-auto w-auto">
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
