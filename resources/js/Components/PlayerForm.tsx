import { useForm } from '@inertiajs/react';
import { Player } from '@/types';
import React, { useEffect } from 'react';

type Props = {
    player?: Player | null;
    positions: string[];
    onSuccessRoute: string;
};

const PlayerForm: React.FC<Props> = ({ player, positions, onSuccessRoute }) => {
    const isEditMode = !!player;

    const imageUrl = player?.image === 'player_default.png'
        ? '/recursos/player_default.png'
        : `/storage/${player?.image}`;

    const { data, setData, post, put, processing, errors } = useForm<{
        name: string;
        surname: string;
        number: number | string;
        position: string;
        image: File | null;
    }>({
        name: player?.name || '',
        surname: player?.surname || '',
        number: player?.number || '',
        position: player?.position || '',
        image: null,  // Ahora es File (para subida)
    });

    useEffect(() => {
        if (player) {
            setData({
                name: player.name,
                surname: player.surname,
                number: player.number,
                position: player.position,
                image: null,  // siempre null aquí (solo para nuevas subidas)
            });
        }
    }, [player]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            onSuccess: () => window.location.href = route(onSuccessRoute),
            forceFormData: true,  // 🚨 Muy importante para enviar archivos
        };

        if (isEditMode) {
            post(route('players.update', player.id), options);
        } else {
            post(route('players.store'), options);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            {/* Nombre */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Apellido */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Apellido</label>
                <input
                    type="text"
                    value={data.surname}
                    onChange={(e) => setData('surname', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
            </div>

            {/* Número */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Número (Dorsal)</label>
                <input
                    type="number"
                    value={data.number}
                    onChange={(e) => setData('number', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
            </div>

            {/* Posición */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Posición</label>
                <select
                    value={data.position}
                    onChange={(e) => setData('position', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Selecciona una posición</option>
                    {positions.map((pos) => (
                        <option key={pos} value={pos}>{pos}</option>
                    ))}
                </select>
                {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
            </div>

            {/* Imagen */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Imagen (archivo)</label>
                <div className="flex items-center gap-4 flex-wrap">
                    <label
                    htmlFor="image-upload"
                    className="cursor-pointer inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                    >
                    Seleccionar imagen
                    </label>
                    <span className="text-sm text-gray-600">
                    {data.image?.name || 'Ningún archivo seleccionado'}
                    </span>
                </div>

                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setData('image', file);
                    }}
                    className="hidden"
                />

                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

                <div className="mt-4 flex gap-6 items-start flex-wrap">
                    {/* Imagen seleccionada en formulario */}
                    {data.image && (
                    <div className="text-sm text-gray-700">
                        <p className="mb-2">Vista previa:</p>
                        <img
                        src={URL.createObjectURL(data.image)}
                        alt="Vista previa"
                        className="w-32 rounded-lg shadow"
                        />
                    </div>
                    )}

                    {/* Imagen actual (solo en modo edición) */}
                    {isEditMode && player?.image && !data.image && (
                    <div className="text-sm text-gray-700">
                        <p className="mb-2">Imagen actual:</p>
                        <img
                        src={imageUrl}
                        alt="Imagen actual"
                        className="w-32 rounded-lg shadow"
                        />
                    </div>
                    )}
                </div>
            </div>

            {/* Botón */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isEditMode ? 'Guardar cambios' : 'Crear jugador'}
                </button>
            </div>
        </form>
    );
};

export default PlayerForm;
