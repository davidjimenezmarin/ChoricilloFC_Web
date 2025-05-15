import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router} from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import NavCategorias from '@/Components/NavCategorias';
import { Button } from "@/shadcn/ui/button";
import { Product } from '@/types/index';
import { useForm } from '@inertiajs/react';
import Cart from '@/Components/Cart';

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const { data, setData, post, processing} = useForm({
        productId: product.id,
        size: product.size || "", // Si no tiene talla, queda vacío
    });

    const [selectedSize, setSelectedSize] = useState<string | null>(
        product.size && ['S', 'M', 'L', 'XL'].includes(product.size) ? product.size : null
    );


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedSize) {
            alert("Por favor, selecciona una talla antes de agregar al carrito.");
            return;
        }
    
        post(route('details.add'), {
            preserveScroll: true, 
            preserveState: false,
            onSuccess: () => {
                alert("Producto agregado al carrito con éxito!");
                router.reload({ 
                    only: ['cart'], 
                }); 
            },
            onError: () => alert("Error al agregar el producto al carrito."),
            onFinish: () => setSelectedSize(null), // Reinicia la selección de talla después de agregar al carrito
        });
    };
    

    return (
        <AuthenticatedLayout 
            header={
                <div className='flex py-2 '>
                    <div className="flex sm:hidden hover:underline">
                        <Link href={route('shop')}>
                            Volver
                        </Link>
                    </div>    
                    <NavCategorias/>
                </div>
            }
            cartComponent={<Cart />}
        >
            <Head title={product.name} />
            <div className=" mx-auto py-12 bg-slate-100">
                <div className="grid gap-10 col-1 pl-3  sm:grid-cols-2 sm:gap-20">
                    <div className="flex justify-center items-center">
                        <img 
                            src={`/recursos/products/${product.image_detail}`} 
                            alt={product.name} 
                            className="w-3/4 sm:w-80% shadow-lg" 
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-lg font-semibold mt-2">Precio: {product.price}€</p>

                       {/* Información de stock con círculo */}
                        <div className="flex items-center gap-2 mt-2">
                            <span className={`w-3 h-3 rounded-full ${product.stock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <p className={`${product.stock ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                                {product.stock ? 'En stock' : 'Agotado'}
                            </p>
                        </div>


                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="mt-4">
                            {/* Selección de tallas */}
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
                                                    setData('size', size); // Actualizamos ambos estados
                                                }}
                                                className={`
                                                    border px-4 py-1 rounded transition
                                                    ${selectedSize === size 
                                                        ? 'bg-gray-900 text-white border-gray-900' 
                                                        : 'border-gray-300 hover:bg-gray-100'
                                                    }
                                                    ${processing ? 'opacity-50 cursor-not-allowed' : ''}
                                                `}
                                                disabled={processing}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Botón de agregar al carrito */}
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
