// Componente principal de la tienda, renderiza los productos organizados por categorías,
// permitiendo navegación entre ellas y filtrado si se ha seleccionado alguna categoría específica.

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Layout principal con navegación autenticada
import { Head } from '@inertiajs/react'; // Componente de Inertia para gestionar el título de la página
import ProductList from '@/Components/ProductList'; // Lista de productos agrupados visualmente
import { Category, ProductsByCategory } from '@/types/index'; // Tipado para categorías y productos
import NavCategorias from '@/Components/NavCategorias'; // Componente de navegación lateral con las categorías
import Cart from '@/Components/Cart'; // Componente del carrito de compras
import { useTranslation } from 'react-i18next'; // Hook para traducciones internacionales

// Props esperadas por la vista de Shop
interface ShopProps {
    productsByCategory: ProductsByCategory; // Diccionario de productos organizados por ID de categoría
    categories: Category[]; // Lista de todas las categorías disponibles
    selectedCategory?: Category | null; // Categoría seleccionada si se está filtrando
}

// Componente funcional principal que representa la página de la tienda
export default function Shop({ productsByCategory = {}, categories = [], selectedCategory }: ShopProps) {
    const { t } = useTranslation(); // Hook de traducción
    const isFiltered = !!selectedCategory; // Booleano que indica si hay un filtro de categoría activo

    return (
        <AuthenticatedLayout 
            // Si hay una categoría seleccionada, se muestra su nombre como encabezado destacado
            header={
                isFiltered && selectedCategory?.name && (
                    <h2 className='px-2 bg-black w-fit rounded-lg border text-white'>
                        {selectedCategory.name}
                    </h2>
                )
            }
            // Se incluye el componente del carrito en la barra superior
            cartComponent={<Cart />}
        >
            {/* Título dinámico en función del filtro o valor por defecto */}
            <Head title={isFiltered ? selectedCategory?.name : t('shop.home')} />

            {/* Imagen de portada cuando no hay una categoría seleccionada */}
            {!isFiltered && (
                <div className="h-[70vh] w-auto bg-cover bg-[center_bottom_59%] bg-no-repeat bg-[url('/recursos/tiendaInicio.jpg')] " />
            )}

            {/* Navegación lateral de categorías, oculta en móviles */}
            <div className='hidden bg-white sm:flex sm:py-6 sm:pl-6'>
                <NavCategorias />
            </div>

            {/* Contenido principal de productos filtrado o agrupado por categorías */}
            <div className="mx-auto w-full pt-2 sm:pt-0">
                <div className="overflow-hidden bg-white shadow-sm">
                    {isFiltered ? (
                        // Si hay categoría seleccionada, se muestra solo esa lista de productos
                        <div key={selectedCategory?.id} className="mb-8">
                            <ProductList products={productsByCategory[selectedCategory?.id || ''] || []} />
                        </div>
                    ) : (
                        // Si no hay filtro, se renderiza cada grupo de productos por categoría
                        Object.keys(productsByCategory).map((categoryId) => {
                            const category = categories.find((c) => c.id.toString() === categoryId); // Se asocia el nombre
                            return (
                                <div key={categoryId} className="mb-8 flex flex-col">
                                    {/* Título de categoría */}
                                    <h3 className="self-center text-lg font-semibold mb-4 bg-black text-white w-fit rounded-lg border px-2">
                                        {category ? category.name : `${t('shop.unknown_category')} (${categoryId})`}
                                    </h3>
                                    {/* Lista de productos de esa categoría */}
                                    <ProductList products={productsByCategory[categoryId]} />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
