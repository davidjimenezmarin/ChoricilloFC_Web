import { OrderList } from "@/Components/OrderList";
import { Order } from "@/types/index";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Orders({ orders }: { orders: Order[] }) {
    return (
        <AuthenticatedLayout
                    header={
                        <div className='flex justify-between'>
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                Mis Pedidos
                            </h2>
                            <PrimaryButton className="w-auto" onClick={() => window.history.back()}>
                                Volver
                            </PrimaryButton>
                        </div>
                    }
                >
            <Head title="Mis Pedidos" />
            <div className="overflow-x-auto">
                <OrderList orders={orders} />
            </div>
        </AuthenticatedLayout>
    );
}