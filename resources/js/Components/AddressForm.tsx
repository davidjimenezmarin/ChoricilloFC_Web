import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { ShippingAddress } from "@/types/index";
import { Button } from "@/shadcn/ui/button";
import PrimaryButton from '@/Components/PrimaryButton';

interface AddressFormProps {
    mode: "create" | "edit";
    initialData?: ShippingAddress;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function AddressForm({ mode, initialData, onSuccess, onCancel }: AddressFormProps) {
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
                    placeholder="Calle, Piso, Departamento"
                    value={data.street}
                    onChange={(e) => setData("street", e.target.value)}
                    className="w-full p-2 border rounded"
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Ciudad"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Provincia"
                    value={data.province}
                    onChange={(e) => setData("province", e.target.value)}
                    className="p-2 border rounded"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="País"
                    value={data.country}
                    onChange={(e) => setData("country", e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Código postal"
                    value={data.zip_code}
                    onChange={(e) => setData("zip_code", e.target.value)}
                    className="p-2 border rounded"
                />
            </div>

            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={data.main}
                    onChange={(e) => setData("main", e.target.checked)}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                />
                <span>¿Es la dirección principal?</span>
            </label>

            <div className="flex gap-4">
                <PrimaryButton type="submit" disabled={processing}>
                    {mode === "edit" ? "Actualizar dirección" : "Añadir dirección"}
                </PrimaryButton>
                {mode === "edit" && onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
            </div>
        </form>
    );
}
