import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Cart from '@/Components/Cart';
import PrimaryButton from '@/Components/PrimaryButton';
export default function OrderDetails() {
  const { cart } = usePage().props;

  return (
    <AuthenticatedLayout
                
                cartComponent={<Cart />}
            >
      <Head title="Detalles del Pedido" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Detalles del Pedido</h1>

        {/* Información del Pedido */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">Información del Pedido</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles generales del pedido.</p>
            </div>
            <div className="mt-4 sm:mt-0">
            <span className={`px-2 py-1 text-xs rounded-full ${
                                    cart.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    cart.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                {cart.status}
            </span>
            </div>
        </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">ID del Pedido</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cart.id}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Fecha</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cart.order_date}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Método de Pago</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cart.payment_method?.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Dirección de Envío</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {cart.shipping_address?.street}, {cart.shipping_address?.city}, {cart.shipping_address?.zip_code}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Productos del Pedido */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Productos</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Lista de productos incluidos en este pedido.</p>
          </div>
          <div className="border-t border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
              {cart.details.map((item) => (
                <li key={item.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">{item.product.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.quantity} x €{item.unit_price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Talla: {item.size}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      Subtotal: €{item.unit_price * item.quantity}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Total */}
        <div className="mt-6 flex justify-end">
          <p className="text-xl font-semibold text-gray-900">Total: €{cart.total_amount}</p>
        </div>

        {/* Botón de Volver */}
        <div className="mt-6">
          <Link
            href={route('orders.index')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Volver a Mis Pedidos
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
