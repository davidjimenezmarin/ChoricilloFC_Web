import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Notice } from '@/types';

type Props = {
    notice?: Notice | null;
    onSuccessRoute: string;
};

const NoticeForm: React.FC<Props> = ({ notice, onSuccessRoute }) => {
    const isEditMode = !!notice;

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
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                    className="w-full"
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                {isEditMode && notice?.image && (
                    <div className="mt-4">
                        <p className="text-gray-600 mb-2">Imagen actual:</p>
                        <img src={`/recursos/${notice.image}`} alt="Imagen actual" className="w-32 rounded-lg" />
                    </div>
                )}
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
