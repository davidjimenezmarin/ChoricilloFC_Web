import React from 'react';
import BaseLayout from '@/Layouts/BaseLayout';
import { Head, Link } from '@inertiajs/react';
import NoticeForm from '@/Components/NoticeForm';

const CreateNotice: React.FC = () => {
    return (
        <BaseLayout titulo="Crear Noticia">
            <Head title="Crear Noticia" />
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Añadir nueva noticia</h2>
                    <Link
                        href={route('notices.manage')}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Volver a la gestión
                    </Link>
                </div>
                <NoticeForm onSuccessRoute="notices.manage" />
            </div>
        </BaseLayout>
    );
};

export default CreateNotice;
