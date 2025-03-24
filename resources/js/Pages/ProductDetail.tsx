import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { Button } from "@/shadcn/ui/button";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image?: string;
    size?: string; // Puede ser "S", "M", "L" o "XL"
    stock: boolean; // Nuevo campo como booleano
};

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(product.size || null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSize) {
            alert("Por favor, selecciona una talla antes de agregar al carrito.");
            return;
        }
        
        if (!product.stock) {
            alert("Este producto está agotado.");
            return;
        }

        // Aquí enviaríamos los datos al backend
        console.log("Producto agregado al carrito:", {
            productId: product.id,
            size: selectedSize,
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
                    <div className="hidden sm:flex">
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
            }
        >
            <Head title={product.name} />
            <div className="container mx-auto py-12 bg-slate-100">
                <div className="grid gap-10 col-1 pl-3  sm:grid-cols-2 sm:gap-20">
                    <div className="flex justify-center items-center">
                        <img 
                            src={`/recursos/products/${product.image}`} 
                            alt={product.name} 
                            className="w-3/4 sm:w-full shadow-lg" 
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
                            {['S', 'M', 'L', 'XL'].some(size => size === product.size) ? (
                                <div>
                                    <p className="font-semibold">Talla</p>
                                    <div className="flex gap-4">
                                        {['S', 'M', 'L', 'XL'].map((size) => (
                                            <button 
                                                type="button"
                                                key={size} 
                                                onClick={() => setSelectedSize(size)}
                                                className={`border px-4 py-1 rounded transition
                                                    ${selectedSize === size ? 'bg-gray-900 text-white' : 'hover:bg-gray-200'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">Talla única</p>
                            )}

                            {/* Botón de agregar al carrito */}
                            <Button 
                                type="submit" 
                                disabled={!product.stock}
                                className={`mt-4 px-6 py-2 transition 
                                    ${product.stock ? '' : 'bg-gray-400 cursor-not-allowed'}`}
                            >
                                {product.stock ? 'Agregar al carrito' : 'No disponible'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
