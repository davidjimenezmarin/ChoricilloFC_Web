// Vista Edit para perfil de usuario autenticado.
// Renderiza formulario para actualización de información personal, contraseña y direcciones.
// Incluye enlace a la lista de pedidos del usuario y formulario para eliminar la cuenta.
// Usa layout autenticado con título y botón para volver atrás.
// Integra componente Cart para mostrar carrito activo en la barra de navegación.
// Traduce textos con hook i18next, asegurando soporte multilenguaje.

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateAddresses from './Partials/UpdateAddresses';
import PrimaryButton from '@/Components/PrimaryButton';
import Cart from '@/Components/Cart';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';

export default function Edit({
    mustVerifyEmail,
    addresses,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {t('profile.title')}
                    </h2>
                    <PrimaryButton className="w-auto" onClick={() => router.visit(route('shop'))}>
                        {t('profile.back')}
                    </PrimaryButton>
                </div>
            }
            cartComponent={<Cart />}
        >
            <Head title={t('profile.title')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Formulario para actualizar información básica del usuario */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Formulario para actualizar contraseña */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Formulario para actualizar direcciones */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateAddresses className="max-w-xl" />
                    </div>

                    {/* Enlace a la sección de pedidos */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <Link
                            href={route('orders.index')}
                            className="text-sm text-gray-700 dark:text-gray-500 underline"
                        >
                            {t('profile.orders')}
                        </Link>
                    </div>

                    {/* Formulario para eliminar cuenta de usuario */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
