import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Notice } from '@/types';

type Props = {
    notice?: Notice | null;
    onSuccessRoute: string;
};

const NoticeForm: React.FC<Props> = ({ notice, onSuccessRoute }) => {
    const isEditMode = !!notice;

    const imageUrl = notice?.image === 'notice_default.jpg'
        ? '/recursos/notice_default.jpg'
        : `/storage/${notice?.image}`;

    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        short_description: string;
        description: string;
        date: string;
        image: File | null;
    }>({
        title: notice?.title || '',
        short_description: notice?.short_description || '',
        description: notice?.description || '',
        date: notice?.date || '',
        image: null,
    });

    useEffect(() => {
        if (notice) {
            setData({
                title: notice.title,
                short_description: notice.short_description,
                description: notice.description,
                date: notice.date,
                image: null, // para nuevas subidas solo
            });
        }
    }, [notice]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            onSuccess: () => window.location.href = route(onSuccessRoute),
            forceFormData: true, // muy importante para enviar archivos
        };

        if (isEditMode) {
            post(route('notices.update', notice!.id), options);
        } else {
            post(route('notices.store'),  options);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            {/* Título */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Título</label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Descripción corta */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Descripción corta</label>
                <textarea
                    value={data.short_description}
                    onChange={(e) => setData('short_description', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.short_description && <p className="text-red-500 text-sm mt-1">{errors.short_description}</p>}
            </div>

            {/* Descripción completa */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Descripción completa</label>
                <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Fecha */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Fecha</label>
                <input
                    type="date"
                    value={data.date}
                    onChange={(e) => setData('date', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
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
                    {isEditMode && notice?.image && !data.image && (
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
                    {isEditMode ? 'Guardar cambios' : 'Crear noticia'}
                </button>
            </div>
        </form>
    );
};

export default NoticeForm;
