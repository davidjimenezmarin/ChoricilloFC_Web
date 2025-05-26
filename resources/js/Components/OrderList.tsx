import { Order } from '@/types/index';
import PrimaryButton from './PrimaryButton';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export function OrderList({ orders }: { orders: Order[] }) {
    const { t } = useTranslation();

    return (
        <div className="w-full overflow-x-auto rounded-lg shadow-sm">
            {/* Versión para pantallas grandes */}
            <table className="hidden w-full bg-white md:table">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">{t('orders.date')}</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">{t('orders.address')}</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">{t('orders.status')}</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">{t('orders.total')}</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">{t('orders.payment_method')}</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">{t('orders.actions')}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                                {order.order_date}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.shipping_address 
                                ? `${order.shipping_address.street}, ${order.shipping_address.city}, ${order.shipping_address.country}` 
                                : t('orders.not_assigned')}
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
                            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700">
                                {order.payment_method?.name || t('orders.not_assigned')}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-left text-sm font-medium">
                                <Link
                                    href={route('orders.show', order.id)}                                  
                                >
                                    {t('orders.view_details')}
                                </Link>
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
                                <p className="text-sm font-medium text-gray-500">{t('orders.title')} #{order.id}</p>
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
                                <p className="text-sm font-medium text-gray-500">{t('orders.date')}</p>
                                <p className="text-sm">{order.order_date}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{t('orders.total')}</p>
                                <p className="text-sm font-semibold">${order.total_amount}</p>
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <PrimaryButton 
                                className="w-full"
                                onClick={() => window.location.href = `/orders/${order.id}`}
                            >
                                {t('orders.view_details')}
                            </PrimaryButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
