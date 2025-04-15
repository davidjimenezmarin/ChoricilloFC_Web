import { usePage } from "@inertiajs/react";
import { useState } from 'react';
import AddressForm from '@/Components/AddressForm';
import { ShippingAddress } from '@/types/index'; // Asegúrate que tienes este tipo definido
import { Inertia } from '@inertiajs/inertia';
import SecondaryButton from '@/Components/PrimaryButton';


export default function UpdateAddresses({ className = '' }: { className?: string }) {
    const addresses = usePage().props.addresses;
    
    // Estado para controlar si se está editando una dirección
    const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(null);

    const handleEditClick = (address: ShippingAddress) => {
        setSelectedAddress(address);
    };

    const handleCancelEdit = () => {
        setSelectedAddress(null);
    };

    const handleDelete = (id: number) => {
        if (!confirm("¿Estás seguro de que quieres eliminar esta dirección?")) return;
    
        Inertia.delete(route('addresses.destroy', { id }), {
            onSuccess: () => {
                setSelectedAddress(null);
            },
            onError: () => {
                alert("Hubo un error al eliminar la dirección.");
            },
        });
    };

    return (
        <section className={className}>
            <h2 className="text-xl font-bold mb-4">Direcciones guardadas</h2>

            {!addresses || addresses.length === 0 ?(
                <p className="text-gray-600 mb-4">No tienes direcciones aún.</p>
            ):(
                <div>
                {/* Lista de direcciones */}
                <ul className="space-y-4 mb-6">
                    {addresses.map(address => (
                        <li key={address.id} className="border p-4 rounded-md bg-white flex justify-between items-center">
                            <div>
                                <p>{address.street}, {address.city}</p>
                                <p>{address.province}, {address.country} - {address.zip_code}</p>
                            </div>
                            <SecondaryButton
                                className=" hover:underline"
                                onClick={() => handleEditClick(address)}
                            >
                                Editar
                            </SecondaryButton>
                        </li>
                    ))}
                </ul>
                </div>
            )}

            

            {/* Formulario dinámico */}
            <div className="border-t pt-6">
                {selectedAddress ? (
                    <div className="mt-6 space-y-4">
                    <AddressForm
                        mode="edit"
                        initialData={selectedAddress}
                        onSuccess={() => setSelectedAddress(null)}
                        onCancel={handleCancelEdit}
                    />
                    <button
                        onClick={() => handleDelete(selectedAddress.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                        Eliminar dirección
                    </button>
                </div>
                    
                ) : (
                    <AddressForm
                        mode="create"
                        onSuccess={() => console.log("Dirección creada")}
                    />
                )}
            </div>
        </section>
    );
}
