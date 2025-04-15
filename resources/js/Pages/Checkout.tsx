import { usePage } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { useState } from "react";
import { Head, router} from '@inertiajs/react';

export default function Checkout() {
    const { cart,addresses } = usePage().props;
    
    const user = usePage().props.auth.user;

    const [selectedAddress, setSelectedAddress] = useState(addresses?.[0]?.id || '');

    return (
        <section className="grid grid-cols-1 p-4 justify-items-center bg-slate-100 gap-12 h-screen sm:grid-cols-2 sm:gap-0 sm:p-0 sm:items-center">
            <Head title="Checkout"/>
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4">
                <div className="max-w-auto border-r-solid gap-2 border-gray-300 pr-4 flex flex-col items-start sm:border-r-2">
                    <h1 className="text-2xl font-bold mb-4">Datos personales</h1>
                    <div className="flex flex-col gap-2 border rounded-md bg-white p-4 ">
                        <p>Nombre: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <div className="flex flex-col gap-2 border rounded-md bg-white p-4 ">
                        <label htmlFor="address" className="font-medium">Dirección de envío:</label>
                        {addresses && addresses.length > 0 ? (
                            <select
                                id="address"
                                value={selectedAddress}
                                onChange={(e) => setSelectedAddress(e.target.value)}
                                className="border rounded-md p-2 bg-white"
                            >
                                {addresses.map((address) => (
                                    <option key={address.id} value={address.id} className="bg-white">
                                        {address.street}, {address.city}, {address.zip_code}
                                    </option>
                                ))}
                            </select>
                            ) : (
                                <div>
                                    <p className="text-sm text-gray-500 italic">No tienes direcciones guardadas</p>
                                    <Button>Añadir</Button>
                                </div> 
                            )}
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-2 sm:pl-4 sm:mt-0">
                    <div className=" border rounded-md bg-white p-4">
                        <label htmlFor="methods" className="font-medium">Métodos de pago:</label>
                    </div>
                    <Button variant="default" className="w-auto" onClick={() => window.history.back()}>
                        Volver
                    </Button>
                </div>
            </div>
            
            <div className="w-auto max-w-lg bg-white rounded-lg shadow-lg p-6 h-screen flex flex-col gap-4">
                <div className="max-w-auto border-r-solid flex flex-col items-start justify-center">
                    <p className="text-2xl font-bold mb-2">Resumen de la compra</p>
                    <p className="text-sm text-gray-600 mb-4">Por favor, revisa los productos en tu carrito antes de proceder al pago.</p>
                </div>
                {/* Scroll solo en productos */}
                <div className="space-y-4 overflow-y-auto h-full ">
                    {cart.details.map((item) => (
                    <div key={item.id} className="grid grid-rows-1 grid-cols-2 gap-6 p-2 border rounded-md">
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
                            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                            <p className=" text-md self-end ">Subtotal: €{item.unit_price * item.quantity}</p>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="mt-4 space-y-4 flex flex-col justify-end">
                    <p className="self-end text-lg"><strong>Total : {cart.total_amount} €</strong> </p>
                    <Button variant="default" className="w-auto" onClick={() => window.history.back()}>
                        Pagar
                    </Button>
                </div>
                
            </div>
        </section>
    );
}

