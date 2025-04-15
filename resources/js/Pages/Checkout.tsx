import { usePage } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { useState } from "react";
import { Head, router} from '@inertiajs/react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Checkout() {
    const { setData, put, processing } = useForm();

    const { cart,addresses,methods } = usePage().props;
    
    const user = usePage().props.auth.user;

    const [selectedAddress, setSelectedAddress] = useState(addresses?.[0]?.id || '');

    const [selectedMethod, setSelectedMethod] = useState(methods[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setData({
            address_id: selectedAddress,  
            payment_method_id: selectedMethod.id, 
        });
    
        put(route('checkout.store')); 
    }

    return (
        <section className="grid grid-cols-1 p-4 justify-items-center bg-slate-100 gap-12 h-screen sm:grid-cols-2 sm:gap-0 sm:p-0 sm:items-center">
            <Head title="Checkout"/>
            <div className="flex flex-col w-full text-center gap-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:w-auto">
            <h1 className="text-2xl font-bold mb-4 col-span-2">Datos personales</h1>
                <div className="max-w-auto border-r-solid gap-2 border-gray-300 pr-4 flex flex-col h-full sm:border-r-2">
                    <div className="flex flex-col text-start gap-2 border rounded-md bg-white p-4 w-full h-full">
                        <span className="flex flex-col gap-1">
                            <p className="font-bold text-lg">Nombre</p>
                            <p>{user.name}</p>
                        </span>
                        <span className="flex flex-col gap-1">
                            <p className="font-bold text-lg">Email</p>
                            <p>{user.email}</p>
                        </span>
                    </div>
                </div>
                <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2 sm:mt-0">
                    <div className="flex flex-col gap-2 border rounded-md bg-white p-4 w-full">
                            <label htmlFor="address" className="font-medium">Dirección de envío:</label>
                            {addresses && addresses.length > 0 ? (
                                <Listbox 
                                    value={selectedAddress} 
                                    onChange={setSelectedAddress}
                                    as="div" 
                                    className="relative"
                                >
                                {/* Botón que muestra la opción seleccionada */}
                                <ListboxButton className="w-full border rounded-md p-2 bg-white text-left flex justify-between items-center">
                                {addresses.find(a => a.id === selectedAddress)?.street || "Selecciona una dirección"}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                </ListboxButton>
                            
                                {/* Opciones desplegables */}
                                <ListboxOptions className="absolute z-10 mt-1 w-full max-h-60 overflow-auto border rounded-md bg-white shadow-lg">
                                {addresses.map((address) => (
                                    <ListboxOption
                                    key={address.id}
                                    value={address.id}
                                    className={({ active }) => 
                                        `p-2 cursor-pointer ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                                    }
                                    >
                                    {address.street}, {address.city}, {address.zip_code}
                                    </ListboxOption>
                                ))}
                                </ListboxOptions>
                            </Listbox>
                                ) : (
                                    <div>
                                        <p className="text-sm text-gray-500 italic">No tienes direcciones guardadas</p>
                                        <Button>Añadir</Button>
                                    </div> 
                                )}
                        </div>
                        <div className="flex flex-col gap-2 border rounded-md bg-white p-4">
                            <label htmlFor="methods" className="font-medium">Métodos de pago:</label>
                            {methods && methods.length > 0 ? (
                                <Listbox 
                                    value={selectedMethod} 
                                    onChange={setSelectedMethod}
                                    as="div"
                                    className="relative"
                                >
                                    <ListboxButton className="w-full border rounded-md p-2 bg-white text-left flex justify-between items-center">
                                        {selectedMethod.name}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    </ListboxButton>
                                    <ListboxOptions className="absolute z-10 mt-1 border rounded-md bg-white shadow-lg">
                                        {methods.map((method) => (
                                            <ListboxOption
                                                key={method.id}
                                                value={method}
                                                className="p-2 hover:bg-blue-100 cursor-pointer"
                                            >
                                                {method.name}
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Listbox>
                                ) : (
                                    <div>
                                        <p className="text-sm text-gray-500 italic">No es posible realizar una compra en estos momentos</p>
                                    </div> 
                                )
                            }
                        </div>
                </form>
                <Button variant="default" className="w-full col-span-2 mt-2" onClick={() => window.history.back()}>
                        Volver
                </Button>
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
                            <p className=" text-md self-end ">Subtotal: {item.unit_price * item.quantity}€</p>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="mt-4 space-y-4 flex flex-col justify-end">
                    <p className="self-end text-lg"><strong>Total : {cart.total_amount} €</strong> </p>
                    <Button variant="default" className="w-auto" disabled={processing} type="submit" form="checkout-form">
                        Pagar
                    </Button>
                </div>
            </div>
        </section>
    );
}

