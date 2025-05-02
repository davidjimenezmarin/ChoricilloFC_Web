import { OrderList } from "@/Components/OrderList";
import { Order } from "@/types/index";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Orders({ orders }: { orders: Order[] }) {
    return (
        <AuthenticatedLayout>
            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold mb-4 pl-2">Mis Pedidos</h1>
                <OrderList orders={orders} />
            </div>
        </AuthenticatedLayout>
    );
}