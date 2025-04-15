import { Order } from '@/types/index';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';

export function OrderList({ orders }: { orders: Order[] }) {
    return (
        <div className="w-full overflow-x-auto rounded-lg shadow-sm">
            {/* Versión para pantallas grandes */}
            <table className="hidden w-full bg-white md:table">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                                {order.order_date}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                ${order.total_amount}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                                <PrimaryButton 
                                    className="w-auto bg-blue-600 hover:bg-blue-700"
                                    onClick={() => window.location.href = `/orders/${order.id}`}
                                >
                                    Ver Detalles
                                </PrimaryButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Versión para móviles */}
            <div className="md:hidden space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Pedido #</p>
                                <p className="text-lg font-semibold">#{order.id}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {order.status}
                            </span>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Fecha</p>
                                <p className="text-sm">{order.order_date}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total</p>
                                <p className="text-sm font-semibold">${order.total_amount}</p>
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <PrimaryButton 
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                onClick={() => window.location.href = `/orders/${order.id}`}
                            >
                                Ver Detalles
                            </PrimaryButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}