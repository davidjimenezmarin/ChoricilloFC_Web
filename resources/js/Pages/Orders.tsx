// Página de listado de pedidos del usuario autenticado.
// Renderiza un layout autenticado con un header que contiene el título y un botón para volver a la página anterior.
// Utiliza el componente OrderList para mostrar la lista de pedidos recibida vía props.
// Gestiona el título del documento mediante Inertia Head para SEO y UX.

import { OrderList } from "@/Components/OrderList";
import { Order } from "@/types/index";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Orders({ orders }: { orders: Order[] }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between'>
                    {/* Título traducido */}
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {t('orders.title')}
                    </h2>
                    {/* Botón para volver traducido */}
                    <PrimaryButton className="w-auto" onClick={() => router.visit(route('profile.edit'))}>
                        {t('orders.back')}
                    </PrimaryButton>
                </div>
            }
        >
            {/* Título de la página traducido */}
            <Head title={t('orders.title')} />

            <div className="overflow-x-auto">
                <OrderList orders={orders} />
            </div>
        </AuthenticatedLayout>
    );
}

