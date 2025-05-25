import { usePage } from "@inertiajs/react";
import { useState } from 'react';
import AddressForm from '@/Components/AddressForm';
import { ShippingAddress } from '@/types/index';
import { Inertia } from '@inertiajs/inertia';
import SecondaryButton from '@/Components/PrimaryButton';
import { useTranslation } from 'react-i18next';

export default function UpdateAddresses({ className = '' }: { className?: string }) {
    const { t } = useTranslation();
    const addresses = usePage().props.addresses;

    const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(null);

    const handleEditClick = (address: ShippingAddress) => {
        setSelectedAddress(address);
    };

    const handleCancelEdit = () => {
        setSelectedAddress(null);
    };

    const handleDelete = (id: number) => {
        if (!confirm(t('profile.addresses.confirm_delete'))) return;

        Inertia.delete(route('addresses.destroy', { id }), {
            onSuccess: () => setSelectedAddress(null),
            onError: () => alert(t('profile.addresses.delete_error')),
        });
    };

    return (
        <section className={className}>
            <h2 className="text-xl font-bold mb-4">{t('profile.addresses.title')}</h2>

            {!addresses || addresses.length === 0 ? (
                <p className="text-gray-600 mb-4">{t('profile.addresses.none')}</p>
            ) : (
                <div>
                    <ul className="space-y-4 mb-6">
                        {addresses.map(address => (
                            <li key={address.id} className="border p-4 rounded-md bg-white flex justify-between items-center">
                                <div>
                                    <p>{address.street}, {address.city}</p>
                                    <p>{address.province}, {address.country} - {address.zip_code}</p>
                                </div>
                                <SecondaryButton
                                    className="hover:underline"
                                    onClick={() => handleEditClick(address)}
                                >
                                    {t('profile.addresses.edit')}
                                </SecondaryButton>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

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
                            {t('profile.addresses.delete')}
                        </button>
                    </div>
                ) : (
                    <AddressForm
                        mode="create"
                        onSuccess={() => console.log(t('profile.addresses.created'))}
                    />
                )}
            </div>
        </section>
    );
}
