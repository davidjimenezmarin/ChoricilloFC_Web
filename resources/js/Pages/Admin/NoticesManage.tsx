import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Notice } from '@/types';
import BaseLayout from '@/Layouts/BaseLayout';
import PrimaryButton from '@/Components/PrimaryButton';

type Props = {
    notices: Notice[];
};

const NoticesManage: React.FC<Props> = ({ notices }) => {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
            destroy(route('notices.destroy', id));
        }
    };

    return (
        <BaseLayout titulo="Gestionar Noticias">
            <Head title="Gestionar Noticias" />
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-8 mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
                        Listado de Noticias
                    </h2>
                    
                    <div className='flex flex-row gap-2'>
                        <Link
                            href={route('notices.create')}
                            className="inline-flex items-center px-4 py-2 bg-transparent text-black rounded border-2 hover:bg-gray-950 transition hover:text-white border-gray-700"
                        >
                            Crear Noticia
                        </Link>
                        <Link href={route('notices')}>
                            <PrimaryButton className="h-full">
                                Volver
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>

                {notices.length === 0 ? (
                    <p className="text-gray-600 text-center">No hay noticias todavía.</p>
                ) : (
                    <>
                        {/* Tabla para pantallas grandes */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Título</th>
                                        <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Fecha</th>
                                        <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-700">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notices.map((notice) => (
                                        <tr key={notice.id} className="hover:bg-gray-50">
                                            <td className="py-3 px-4 border-b">{notice.title}</td>
                                            <td className="py-3 px-4 border-b">{new Date(notice.date).toLocaleDateString()}</td>
                                            <td className="py-3 px-4 border-b flex space-x-2">
                                                <Link
                                                    href={route('notices.edit', notice.id)}
                                                    className="inline-flex items-center px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition text-sm"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(notice.id)}
                                                    disabled={processing}
                                                    className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm disabled:opacity-50"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Cards para pantallas pequeñas */}
                        <div className="sm:hidden space-y-4">
                            {notices.map((notice) => (
                                <div key={notice.id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{notice.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Fecha: {new Date(notice.date).toLocaleDateString()}
                                    </p>
                                    <div className="flex justify-end space-x-2">
                                        <Link
                                            href={route('notices.edit', notice.id)}
                                            className="inline-flex items-center px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition text-sm"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(notice.id)}
                                            disabled={processing}
                                            className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm disabled:opacity-50"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </BaseLayout>
    );
};

export default NoticesManage;
