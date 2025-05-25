// Componente del carrito de compras accesible desde cualquier parte de la aplicación.
// Permite al usuario ver los productos agregados, modificar cantidades, eliminar artículos y proceder al checkout.

import { router, usePage } from '@inertiajs/react'; // Hook para obtener datos de la página e interactuar con el backend
import { Link } from '@inertiajs/react'; // Enlaces cliente-servidor
import { Trash2, Minus, Plus } from "lucide-react"; // Iconos utilizados para acciones dentro del carrito
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/shadcn/ui/sheet"; // Componente deslizante lateral (off-canvas)
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Hook para i18n

export default function Cart() {
    const { t } = useTranslation();
    const { cart } = usePage().props; // Se obtiene el carrito desde los props compartidos por Inertia

    // Estado local para manejar la cantidad de cada producto (sin modificar el original hasta confirmar)
    const [quantities, setQuantities] = useState<{ [key: number]: number }>(
        Object.fromEntries(cart?.details?.map(item => [item.id, item.quantity]) || [])
    );

    // Estado para clonar el carrito localmente y poder revertir cambios si ocurre un error
    const [localCart, setLocalCart] = useState(cart);

    // Maneja la eliminación de un ítem del carrito
    const handleRemoveItem = (id: number) => {
        const updatedItems = localCart.details.filter(d => d.id !== id); // Elimina del estado local
        setLocalCart({ ...localCart, details: updatedItems });

        // Realiza la eliminación real vía router
        router.delete(`/cart/remove/${id}`, {
            preserveState: true,
            onError: () => setLocalCart(cart), // Revertir si falla
        });
    };

    // Maneja la actualización de la cantidad de un ítem
    const handleUpdateQuantity = (id: number, quantity: number) => {
        try {
            setQuantities(prev => ({ ...prev, [id]: quantity }));

            router.post(`/cart/update/${id}`, { quantity }, {
                preserveState: true,
                onSuccess: (page) => {
                    setQuantities(prev => ({
                        ...prev,
                        [id]: page.props.cart.details.find(d => d.id === id)?.quantity || quantity
                    }));
                }
            });
        } catch {
            // Si hay un error, se vuelve a la cantidad anterior
            setQuantities(prev => ({ ...prev, [id]: prev[id] }));
        }
    };

    // Calcula la cantidad total de ítems en el carrito
    const totalItems = cart?.details?.reduce((sum, item) => {
        const qty = quantities[item.id] ?? item.quantity ?? 0;
        return sum + qty;
    }, 0) || 0;

    return (
        <Sheet>
            {/* Botón que activa la apertura del carrito */}
            <SheetTrigger className="text-black hover:text-gray-600 flex items-center gap-1">
                <span>{t('shop.cart.label')}</span>
                {(cart?.details?.length ?? 0) > 0 && (
                    <span className="bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </SheetTrigger>

            {/* Contenido del carrito deslizable desde la derecha */}
            <SheetContent className="w-[90vw]" side="right">
                <SheetHeader>
                    <SheetTitle className="font-normal">
                        <header className="flex justify-between items-center border-b pb-3">
                            <h2 className="text-xl font-bold">
                                {t('shop.cart.title')} | {t('shop.cart.item_count', { count: cart?.details.length ?? 0 })}
                            </h2>
                        </header>
                    </SheetTitle>
                </SheetHeader>

                {/* Si el carrito está vacío, muestra mensaje y botón para ir a la tienda */}
                {!cart || !cart.details || cart.details.length === 0 ? (
                    <section className="p-4 text-center">
                        <p className="text-gray-600">{t('shop.cart.empty')}</p>
                        <Link
                            href="/shop"
                            className="text-gray-800 hover:underline mt-2 inline-block"
                        >
                            {t('shop.cart.view_products')}
                        </Link>
                    </section>
                ) : (
                    <section className="w-auto max-w-lg bg-white rounded-lg shadow-lg p-6 h-auto flex flex-col">
                        {/* Lista de productos en el carrito con scroll limitado */}
                        <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2 sm:max-h-[65vh]">
                            {cart.details.map((item) => (
                                <div key={item.id} className="grid grid-rows-1 grid-cols-2 gap-1 p-3 border rounded-md">
                                    {/* Imagen del producto */}
                                    <img
                                        src={`/recursos/products/${item.product.image}`}
                                        alt={item.product.name}
                                        className="w-auto h-auto object-cover rounded-md justify-self-center"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <h3 className="font-semibold">{item.product.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            {t('shop.cart.size')}: {item.size}
                                        </p>
                                        <p className="font-semibold mt-2">€{item.unit_price}</p>
                                    </div>

                                    {/* Controles para modificar cantidad y eliminar ítem */}
                                    <div className="flex flex-row items-center col-span-2 justify-between">
                                        <div className="flex items-center gap-2">
                                            {/* Botón para reducir cantidad o eliminar si es 1 */}
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
                                            <span className="text-lg font-semibold">
                                                {quantities[item.id] ?? item.quantity}
                                            </span>
                                            <button
                                                className="p-1 border rounded hover:bg-gray-200"
                                                onClick={() =>
                                                    handleUpdateQuantity(item.id, (quantities[item.id] ?? item.quantity) + 1)
                                                }
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

                        {/* Totales y acciones */}
                        <div className="mt-4 space-y-4">
                            <div className="flex justify-between font-bold text-lg">
                                <span>{t('shop.cart.total')}</span>
                                <span>
                                    €{cart.details.reduce((sum, item) => {
                                        const qty = quantities[item.id] ?? item.quantity;
                                        return sum + qty * item.unit_price;
                                    }, 0).toFixed(2)}
                                </span>
                            </div>

                            {/* Botones de navegación */}
                            <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row">
                                <Link href="/shop" className="flex-1 text-center border py-2 rounded text-black hover:bg-slate-100">
                                    {t('shop.cart.continue_shopping')}
                                </Link>
                                <Link href="/order/checkout" className="flex-1 text-center bg-gray-700 text-white py-2 rounded hover:bg-gray-900">
                                    {t('shop.cart.checkout')}
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </SheetContent>
        </Sheet>
    );
}
