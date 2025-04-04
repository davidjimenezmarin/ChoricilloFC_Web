import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import { Inertia } from '@inertiajs/inertia';
import { Trash2, Minus, Plus } from "lucide-react"; // Iconos



export default function Cart() {

    const handleRemoveItem = (id: number) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este producto del carrito?")) return;
    
        Inertia.delete(route("details.remove", { id }), {
            onSuccess: () => console.log("Producto eliminado con éxito"),
            onError: () => alert("Hubo un error al eliminar el producto"),
        });
    };

    const handleUpdateQuantity = (itemId: number, quantity: number) => {
        Inertia.post(route('details.update'), { itemId, quantity }, {
            only: ['cart'], 
            preserveScroll: true,
        });
      };

    const { cart } = usePage<PageProps>().props;

    if (!cart || !cart.details || cart.details.length === 0){
         return (
            <div className="p-4 text-center">
                <p className="text-gray-600">Tu carrito está vacío</p>
                <Link 
                    href="/shop" 
                    className="text-gray-800 hover:underline mt-2 inline-block"
                >
                    Ver productos
                </Link>
            </div>
        );
    }
    return (
        <div className="w-auto max-w-lg bg-white rounded-lg shadow-lg p-6">
            {/* Contenido del carrito */}
            {!cart || !cart.details || cart.details.length === 0 ? (
                <p className="text-gray-500 text-center">Tu carrito está vacío</p>
            ) : (
                <div className="space-y-4">
                    {cart.details.map((item) => (
                        <div key={item.id} className="grid grid-rows-1 grid-cols-2 gap-1 p-3 border rounded-md ">
                            {/* Imagen del producto */}
                            <img
                                src={`/recursos/products/${item.product.image}`}
                                alt={item.product?.name}
                                className="w-auto h-auto object-cover rounded-md justify-self-center"
                            />
                            {/* Información del producto */}
                            <div className="flex flex-col justify-center">
                                <h3 className="font-semibold">{item.product.name}</h3>
                                <p className="text-sm text-gray-600">Talla: {item.size}</p>
                                <p className="font-semibold mt-2">€{item.unit_price}</p>
                            </div>
                            {/* Controles de cantidad */}
                            <div className="flex flex-row items-center col-span-2 justify-between">
                                <div className="flex items-center gap-2">
                                    <button 
                                        className="p-1 border rounded hover:bg-gray-200"
                                        onClick={() => {
                                            if (item.quantity > 1) {
                                              handleUpdateQuantity(item.id, item.quantity - 1);
                                            } else {
                                              handleRemoveItem(item.id);
                                            }
                                          }}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <button
                                        className="p-1 border rounded hover:bg-gray-200"
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
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

                    {/* Total */}
                    <div className="flex justify-between font-bold text-lg mt-4">
                        <span>Total:</span>
                        <span>€{cart.total_amount}</span>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col gap-2 mt-4 sm:gap-4 sm:flex-row ">
                        <Link href="/shop" className="flex-1 text-center border py-2 rounded text-blue-600 hover:bg-blue-100">
                            Seguir Comprando
                        </Link>
                        <Link href="/checkout" className="flex-1 text-center bg-gray-700 text-white py-2 rounded hover:bg-gray-900">
                            Completar Pedido
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
