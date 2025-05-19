import { usePage, Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AddressFormModal from '@/Components/AddressFormModal';


export default function Checkout() {
    const { cart, addresses, methods } = usePage().props;
    const { data, setData, put, processing } = useForm({
        shipping_address_id: addresses?.[0]?.id || '',
        payment_method_id: methods?.[0]?.id || '',
    });

    const user = usePage().props.auth.user;
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || '');
    const [selectedMethod, setSelectedMethod] = useState(methods[0] || null);
    const [formError, setFormError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddressChange = (id: number) => {
        setSelectedAddress(id);
        setData('shipping_address_id', id);
    };

    const handleMethodChange = (method: any) => {
        setSelectedMethod(method);
        setData('payment_method_id', method.id);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.shipping_address_id || !data.payment_method_id) {
            setFormError("Selecciona dirección y método de pago.");
            toast.error("Faltan datos requeridos.");
            return;
        }

        setFormError(null);

        put(route('checkout.store'), {
            onSuccess: () => toast.success("¡Pedido realizado con éxito!"),
            onError: () => toast.error("Error al procesar el pedido."),
        });
    };

    return (
        <AuthenticatedLayout
                    header={
                        <div className='flex justify-between'>
                            <PrimaryButton className="w-auto" onClick={() => window.history.back()}>
                                Volver
                            </PrimaryButton>
                        </div>
                    }
                >
        <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-8">
            <Head title="Checkout" />
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-8">
                
                {/* Formulario */}
                <form
                    id="checkout-form"
                    onSubmit={handleSubmit}
                    className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-6"
                >
                    <h1 className="text-3xl font-bold text-gray-800">Finalizar compra</h1>

                    {formError && (
                        <div className="bg-red-100 text-red-700 p-3 rounded">{formError}</div>
                    )}

                    <section className="grid gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-1">Datos personales</h2>
                            <div className="text-sm text-gray-800">
                                <p><strong>Nombre:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Dirección de envío</label>
                            {addresses.length > 0 ? (
                                <Listbox value={selectedAddress} onChange={handleAddressChange}>
                                    <div className="relative">
                                        <ListboxButton className={`w-full border rounded-lg p-2 bg-white text-left shadow-sm ${!data.shipping_address_id && formError ? 'border-red-500' : 'border-gray-300'}`}>
                                            {addresses.find(a => a.id === selectedAddress)?.street || "Selecciona una dirección"}
                                        </ListboxButton>
                                        <ListboxOptions className="absolute z-10 mt-1 w-full border rounded-lg bg-white shadow">
                                            {addresses.map(address => (
                                                <ListboxOption
                                                    key={address.id}
                                                    value={address.id}
                                                    className={({ active }) => `p-2 text-sm ${active ? 'bg-blue-100' : ''}`}
                                                >
                                                    {address.street}, {address.city}, {address.zip_code}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No tienes direcciones.{' '}
                                    <SecondaryButton
                                    onClick={() => setModalOpen(true)}
                                    
                                    >
                                    Añadir
                                    </SecondaryButton>
                                    <AddressFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Método de pago</label>
                            {methods.length > 0 ? (
                                <Listbox value={selectedMethod} onChange={handleMethodChange}>
                                    <div className="relative">
                                        <ListboxButton className={`w-full border rounded-lg p-2 bg-white text-left shadow-sm ${!data.payment_method_id && formError ? 'border-red-500' : 'border-gray-300'}`}>
                                            {selectedMethod?.name || "Selecciona un método de pago"}
                                        </ListboxButton>
                                        <ListboxOptions className="absolute z-10 mt-1 w-full border rounded-lg bg-white shadow">
                                            {methods.map(method => (
                                                <ListboxOption
                                                    key={method.id}
                                                    value={method}
                                                    className={({ active }) => `p-2 text-sm ${active ? 'bg-blue-100' : ''}`}
                                                >
                                                    {method.name}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>
                            ) : (
                                <p className="text-sm text-gray-500">No hay métodos de pago disponibles.</p>
                            )}
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold"
                        >
                            Pagar
                        </Button>
                    </div>
                </form>

                {/* Resumen */}
                <div className="bg-white p-6 rounded-xl shadow-md h-fit flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen del pedido</h2>
                    <div className="space-y-4 overflow-y-auto max-h-[400px] pr-1">
                        {cart.details.map(item => (
                            <div key={item.id} className="flex gap-4 pb-3">
                                <img
                                    src={`/recursos/products/${item.product.image}`}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded-sm"
                                />
                                <div className="flex-1 text-sm text-gray-700">
                                    <p className="font-medium">{item.product.name}</p>
                                    <p>Talla: {item.size}</p>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p className="font-semibold">€{item.unit_price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 border-t pt-4 text-right text-lg font-bold text-gray-800">
                        Total: €{cart.total_amount}
                    </div>
                </div>
            </div>
        </section>
        </AuthenticatedLayout>
    );
}
