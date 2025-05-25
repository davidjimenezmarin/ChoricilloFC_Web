import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { ShippingAddress } from "@/types/index";
import { Button } from "@/shadcn/ui/button";
import PrimaryButton from '@/Components/PrimaryButton';
import { useTranslation } from 'react-i18next';

interface AddressFormProps {
    mode: "create" | "edit";
    initialData?: ShippingAddress;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function AddressForm({ mode, initialData, onSuccess, onCancel }: AddressFormProps) {
    const { t } = useTranslation();
    const { data, setData, post, put, processing, errors, reset } = useForm({
        street: initialData?.street || "",
        city: initialData?.city || "",
        province: initialData?.province || "",
        country: initialData?.country || "",
        zip_code: initialData?.zip_code || "",
        main: initialData?.main || false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (mode === "edit" && initialData) {
            put(route("addresses.update", { id: initialData.id }), {
                onSuccess: () => {
                    onSuccess?.();
                    reset();
                },
            });
        } else {
            post(route("addresses.store"), {
                onSuccess: () => {
                    onSuccess?.();
                    reset();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    placeholder={t('profile.addresses.form.placeholders.street')}
                    value={data.street}
                    onChange={(e) => setData("street", e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder={t('profile.addresses.form.placeholders.city')}
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    className="p-2 border rounded"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

                <input
                    type="text"
                    placeholder={t('profile.addresses.form.placeholders.province')}
                    value={data.province}
                    onChange={(e) => setData("province", e.target.value)}
                    className="p-2 border rounded"
                />
                {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder={t('profile.addresses.form.placeholders.country')}
                    value={data.country}
                    onChange={(e) => setData("country", e.target.value)}
                    className="p-2 border rounded"
                />
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

                <input
                    type="text"
                    placeholder={t('profile.addresses.form.placeholders.zip')}
                    value={data.zip_code}
                    onChange={(e) => setData("zip_code", e.target.value)}
                    className="p-2 border rounded"
                />
                {errors.zip_code && <p className="text-red-500 text-sm">{errors.zip_code}</p>}
            </div>

            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={data.main}
                    onChange={(e) => setData("main", e.target.checked)}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                />
                <span>{t('profile.addresses.form.main')}</span>
            </label>

            <div className="flex gap-4">
                <PrimaryButton type="submit" disabled={processing}>
                    {mode === "edit"
                        ? t('profile.addresses.form.submit_update')
                        : t('profile.addresses.form.submit_create')}
                </PrimaryButton>
                {mode === "edit" && onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        {t('profile.addresses.form.cancel')}
                    </Button>
                )}
            </div>
        </form>
    );
}
