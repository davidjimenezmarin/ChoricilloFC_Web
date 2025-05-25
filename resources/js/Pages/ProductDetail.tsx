// Vista detallada de un producto, accesible para usuarios autenticados. Permite visualizar
// la información del producto y añadirlo al carrito seleccionando una talla (si aplica).

import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Layout base con autenticación
import { Head, router } from '@inertiajs/react'; // Head para el título del documento y router para recarga parcial
import { Link } from '@inertiajs/react'; // Navegación
import NavCategorias from '@/Components/NavCategorias'; // Navegación lateral por categorías
import { Button } from "@/shadcn/ui/button"; // Componente de botón
import { Product } from '@/types/index'; // Tipado del producto
import { useForm } from '@inertiajs/react'; // Hook para formularios
import Cart from '@/Components/Cart'; // Componente de carrito flotante

// Tipado explícito de las props
interface ProductDetailProps {
    product: Product;
}

// Componente principal
export default function ProductDetail({ product }: ProductDetailProps) {
    // Hook de formulario de Inertia.js
    const { data, setData, post, processing } = useForm({
        productId: product.id,
        size: product.size || "", // Si el producto no tiene talla, queda vacío
    });

    // Estado para controlar la talla seleccionada
    const [selectedSize, setSelectedSize] = useState<string | null>(
        product.size && ['S', 'M', 'L', 'XL'].includes(product.size) ? product.size : null
    );

    // Manejador del envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedSize) {
            alert("Por favor, selecciona una talla antes de agregar al carrito.");
            return;
        }

        // Envío del formulario con recarga parcial del carrito
        post(route('details.add'), {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                alert("Producto agregado al carrito con éxito!");
                router.reload({ only: ['cart'] }); // Recarga solo el componente del carrito
            },
            onError: () => alert("Error al agregar el producto al carrito."),
            onFinish: () => setSelectedSize(null), // Reinicia la selección de talla
        });
    };

    return (
        <AuthenticatedLayout 
            header={
                <div className='flex py-2 '>
                    {/* Enlace para volver a la tienda en versión móvil */}
                    <div className="flex sm:hidden hover:underline">
                        <Link href={route('shop')}>
                            Volver
                        </Link>
                    </div>    
                    {/* Navegación por categorías (solo visible en escritorio) */}
                    <NavCategorias />
                </div>
            }
            cartComponent={<Cart />} // Inserta el componente del carrito en la parte superior
        >
            {/* Establece el título de la página según el nombre del producto */}
            <Head title={product.name} />

            {/* Contenido principal con imagen y detalles del producto */}
            <div className="mx-auto py-12 bg-slate-100">
                <div className="grid gap-10 col-1 pl-3 sm:grid-cols-2 sm:gap-20">
                    
                    {/* Imagen del producto */}
                    <div className="flex justify-center items-center">
                        <img 
                            src={`/recursos/products/${product.image_detail}`} 
                            alt={product.name} 
                            className="w-3/4 sm:w-80% shadow-lg" 
                        />
                    </div>

                    {/* Información textual del producto */}
                    <div>
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-lg font-semibold mt-2">Precio: {product.price}€</p>

                        {/* Estado de stock visualizado con un círculo de color */}
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`w-3 h-3 rounded-full ${product.stock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <p className={`${product.stock ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                                {product.stock ? 'En stock' : 'Agotado'}
                            </p>
                        </div>

                        {/* Formulario para selección de talla y agregar al carrito */}
                        <form onSubmit={handleSubmit} className="mt-4">

                            {/* Selector de tallas, solo si están disponibles */}
                            {['S', 'M', 'L', 'XL'].length > 0 && (
                                <div className="mb-4">
                                    <p className="font-semibold mb-2">Talla</p>
                                    <div className="flex gap-2">
                                        {['S', 'M', 'L', 'XL'].map((size) => (
                                            <button
                                                type="button"
                                                key={size}
                                                onClick={() => {
                                                    setSelectedSize(size);
                                                    setData('size', size);
                                                }}
                                                className={`border px-4 py-1 rounded transition ${
                                                    selectedSize === size 
                                                        ? 'bg-gray-900 text-white border-gray-900' 
                                                        : 'border-gray-300 hover:bg-gray-100'
                                                } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={processing}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Botón para agregar el producto al carrito */}
                            <Button 
                                type="submit" 
                                disabled={!product.stock || processing || (product.size && !data.size)}
                                className={`mt-4 px-6 py-2 transition ${
                                    !product.stock 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : processing 
                                            ? 'bg-gray-400 cursor-wait'
                                            : 'bg-gray-700 hover:bg-gray-900'
                                } text-white `}
                            >
                                {processing ? (
                                    'Añadiendo...'
                                ) : !product.stock ? (
                                    'No disponible'
                                ) : product.size && !data.size ? (
                                    'Selecciona talla'
                                ) : (
                                    'Agregar al carrito'
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
