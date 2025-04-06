import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { Trash2, Minus, Plus } from "lucide-react"; // Iconos
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/shadcn/ui/sheet"; // Componente de hoja
import { useState } from 'react'; // Hook de estado

export default function Cart() {

    const { cart } = usePage().props;

    const [quantities, setQuantities] = useState<{ [key: number]: number }>(
        Object.fromEntries(cart?.details?.map(item => [item.id, item.quantity]) || [])
    );

    const [localCart, setLocalCart] = useState(cart);   

    const handleRemoveItem = (id:number) => {
        const updatedItems = localCart.details.filter(d => d.id !== id);

        setLocalCart({ ...localCart, details: updatedItems });
    
        router.delete(`/cart/remove/${id}`, {
            preserveState: true,
            onError: () => setLocalCart(cart), // Revierte si hay error
        });
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        try {
            setQuantities(prev => ({ ...prev, [id]: quantity }));
            
            router.post(`/cart/update/${id}`, { 
                quantity: quantity 
            }, {
                preserveState: true, // Evitamos la recarga de la página
                onSuccess: (page) => {
                    // Sincroniza con la respuesta del servidor
                    setQuantities(prev => ({
                        ...prev,
                        [id]: page.props.cart.details.find(d => d.id === id)?.quantity || quantity
                    }));
                }
            });
        } catch (error) {
            // Revertir en caso de error
            setQuantities(prev => ({ ...prev, [id]: prev[id] }));
        }
    };
    
    const totalItems = cart?.details?.reduce((sum, item) => {
        const itemQty = quantities[item.id] ?? item.quantity ?? 0;
        return sum + itemQty;
    }, 0) || 0;
    
    return (
        <Sheet>
                <SheetTrigger className="text-black hover:text-gray-600 flex items-center gap-1">
                <span>Carrito</span> 
                {(cart?.details?.length ?? 0) > 0 && (
                    <span className="bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
                </SheetTrigger>
                <SheetContent className="w-[90vw] " side="right">
                    <SheetHeader>
                        <SheetTitle className="font-normal">
                            <header className="flex justify-between items-center border-b pb-3">
                                <h2 className="text-xl font-bold">Tu cesta | {cart?.details.length ?? 0} Artículo(s)</h2>
                            </header>
                        </SheetTitle>
                    </SheetHeader>
                    {!cart.details || cart.details.length === 0 ?(
                        <section className="p-4 text-center">
                            <p className="text-gray-600">Tu carrito está vacío</p>
                            <Link 
                                href="/shop" 
                                className="text-gray-800 hover:underline mt-2 inline-block"
                            >
                                Ver productos
                            </Link>
                        </section>
                    ):(
                        <section className="w-auto max-w-lg bg-white rounded-lg shadow-lg p-6 h-auto flex flex-col">
                            {/* Scroll solo en productos */}
                            <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2 sm:max-h-[65vh]">
                                {cart.details.map((item) => (
                                <div key={item.id} className="grid grid-rows-1 grid-cols-2 gap-1 p-3 border rounded-md">
                                    {/* Imagen del producto */}
                                    <img
                                    src={`/recursos/products/${item.product.image}`}
                                    alt={item.product?.name}
                                    className="w-auto h-auto object-cover rounded-md justify-self-center"
                                    />
                                    {/* Info producto */}
                                    <div className="flex flex-col justify-center">
                                    <h3 className="font-semibold">{item.product.name}</h3>
                                    <p className="text-sm text-gray-600">Talla: {item.size}</p>
                                    <p className="font-semibold mt-2">€{item.unit_price}</p>
                                    </div>
                        
                                    {/* Controles cantidad */}
                                    <div className="flex flex-row items-center col-span-2 justify-between">
                                    <div className="flex items-center gap-2">
                                            <button
                                                className="p-1 border rounded hover:bg-gray-200"
                                                onClick={() => {
                                                    const currentQty = quantities[item.id] ?? item.quantity;
                                                    if (currentQty > 1) {
                                                        handleUpdateQuantity(item.id, currentQty - 1);
                                                    } else {
                                                        handleRemoveItem(item.id);
                                                    }
                                                }}
                                            >
                                        <Minus size={16} />
                                        </button>
                                        <span className="text-lg font-semibold">{quantities[item.id] ?? item.quantity}</span>
                                        <button
                                                className="p-1 border rounded hover:bg-gray-200"
                                                onClick={() => handleUpdateQuantity(item.id, (quantities[item.id] ?? item.quantity) + 1)}
                                            >
                                        <Plus size={16} />
                                        </button>
                                    </div>
                                    <button 
                                        className="mt-2 text-red-500 hover:text-red-700"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        
                            {/* Total + acciones */}
                            <div className="mt-4 space-y-4">
                                <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>
                                    €{cart.details.reduce((sum, item) => {
                                        const cantidad = quantities[item.id] ?? item.quantity;
                                        return sum + cantidad * item.unit_price;
                                    }, 0).toFixed(2)}
                                </span>
                                </div>
                        
                                <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row">
                                <Link href="/shop" className="flex-1 text-center border py-2 rounded text-blue-600 hover:bg-blue-100">
                                    Seguir Comprando
                                </Link>
                                <Link href="/checkout" className="flex-1 text-center bg-gray-700 text-white py-2 rounded hover:bg-gray-900">
                                    Completar Pedido
                                </Link>
                                </div>
                            </div>
                        </section>
                    )}
                </SheetContent>
            </Sheet>
      );
      
}
