// Componente Checkout que gestiona el proceso de pago de una orden pendiente.
// Usa hooks de Inertia para manejar estado, envío de formulario y obtención de datos desde backend.
// Integra componentes UI para selección de dirección de envío y método de pago usando Listbox de Headless UI.
// Controla errores de validación para asegurar que se seleccionen dirección y método antes de enviar.
// Permite añadir nueva dirección vía modal que se abre si no hay direcciones existentes.
// Muestra resumen del carrito con productos, tallas, cantidades y total actualizado dinámicamente.
// Utiliza traducción i18n para textos adaptables al idioma del usuario.
// Renderiza layout autenticado con botón para volver a página anterior.

import { usePage, Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AddressFormModal from '@/Components/AddressFormModal';
import { useTranslation } from "react-i18next";

export default function Checkout() {
    const { t } = useTranslation();
    const { cart, addresses, methods, auth } = usePage().props;
    const { data, setData, put, processing } = useForm({
        shipping_address_id: addresses?.[0]?.id || '',
        payment_method_id: methods?.[0]?.id || '',
    });

    const user = auth.user;
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || '');
    const [selectedMethod, setSelectedMethod] = useState(methods[0] || null);
    const [formError, setFormError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Actualiza dirección seleccionada y sincroniza con el formulario
    const handleAddressChange = (id: number) => {
        setSelectedAddress(id);
        setData('shipping_address_id', id);
    };

    // Actualiza método de pago seleccionado y sincroniza con el formulario
    const handleMethodChange = (method: any) => {
        setSelectedMethod(method);
        setData('payment_method_id', method.id);
    };

    // Maneja el envío del formulario, validando que se hayan seleccionado dirección y método de pago
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.shipping_address_id || !data.payment_method_id) {
            setFormError(t('shop.checkout.error_required'));
            toast.error(t('shop.checkout.error_toast'));
            return;
        }

        setFormError(null);

        // Envía la petición PUT para procesar la compra, mostrando toasts según el resultado
        put(route('checkout.store'), {
            onSuccess: () => toast.success(t('shop.checkout.success')),
            onError: () => toast.error(t('shop.checkout.error')),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between'>
                    <PrimaryButton className="w-auto" onClick={() => window.history.back()}>
                        {t('shop.checkout.back')}
                    </PrimaryButton>
                </div>
            }
        >
            <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 py-8">
                <Head title={t('shop.checkout.title')} />
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-8">
                    
                    {/* Formulario principal de checkout */}
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-6"
                    >
                        <h1 className="text-3xl font-bold text-gray-800">{t('shop.checkout.title')}</h1>

                        {/* Mensaje de error en validación */}
                        {formError && (
                            <div className="bg-red-100 text-red-700 p-3 rounded">{formError}</div>
                        )}

                        {/* Sección información personal */}
                        <section className="grid gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 mb-1">{t('shop.checkout.section.personal')}</h2>
                                <div className="text-sm text-gray-800">
                                    <p><strong>{t('shop.checkout.name')}:</strong> {user.name}</p>
                                    <p><strong>{t('shop.checkout.email')}:</strong> {user.email}</p>
                                </div>
                            </div>

                            {/* Selección de dirección de envío */}
                            <div>
                                <label className="block text-sm font-medium mb-1">{t('shop.checkout.section.address')}</label>
                                {addresses.length > 0 ? (
                                    <Listbox value={selectedAddress} onChange={handleAddressChange}>
                                        <div className="relative">
                                            <ListboxButton className={`w-full border rounded-lg p-2 bg-white text-left shadow-sm ${!data.shipping_address_id && formError ? 'border-red-500' : 'border-gray-300'}`}>
                                                {addresses.find(a => a.id === selectedAddress)?.street || t('shop.checkout.select_address')}
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
                                        {t('shop.checkout.no_addresses')}{' '}
                                        <SecondaryButton onClick={() => setModalOpen(true)}>
                                            {t('shop.checkout.add_address')}
                                        </SecondaryButton>
                                    </p>
                                )}
                            </div>

                            {/* Selección de método de pago */}
                            <div>
                                <label className="block text-sm font-medium mb-1">{t('shop.checkout.section.payment')}</label>
                                {methods.length > 0 ? (
                                    <Listbox value={selectedMethod} onChange={handleMethodChange}>
                                        <div className="relative">
                                            <ListboxButton className={`w-full border rounded-lg p-2 bg-white text-left shadow-sm ${!data.payment_method_id && formError ? 'border-red-500' : 'border-gray-300'}`}>
                                                {selectedMethod?.name || t('shop.checkout.select_payment')}
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
                                    <p className="text-sm text-gray-500">{t('shop.checkout.no_payments')}</p>
                                )}
                            </div>
                        </section>

                        {/* Botón de enviar formulario */}
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} className="w-full sm:w-auto px-8 py-3 text-lg font-semibold">
                                {t('shop.checkout.pay')}
                            </Button>
                        </div>
                    </form>

                    {/* Modal para añadir nueva dirección */}
                    <AddressFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

                    {/* Resumen del carrito */}
                    <div className="bg-white p-6 rounded-xl shadow-md h-fit flex flex-col">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('shop.checkout.section.summary')}</h2>
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
                                        <p>{t('shop.checkout.size')}: {item.size}</p>
                                        <p>{t('shop.checkout.quantity')}: {item.quantity}</p>
                                        <p className="font-semibold">€{item.unit_price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 border-t pt-4 text-right text-lg font-bold text-gray-800">
                            {t('shop.checkout.total', { amount: cart.total_amount })}
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
