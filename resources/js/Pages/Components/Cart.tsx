import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/shadcn/ui/sheet"
import { usePage } from '@inertiajs/react';
import { Order } from '@/types/types';
import { Link } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';

interface CartProps extends PageProps {
    cart?: Order;
}

export default function Cart() {
    const { cart } = usePage<CartProps>().props;
    if (!cart || !cart.details || cart.details.length === 0){
         return (
            <div className="p-4 text-center">
                <p className="text-gray-500">Tu carrito está vacío</p>
                <Link 
                    href="/shop" 
                    className="text-blue-500 hover:underline mt-2 inline-block"
                >
                    Ver productos
                </Link>
            </div>
        );
    }
    return (
        <div className="space-y-4">
            {cart.details.map(item => (
                <div key={item.id} className="border-b pb-4">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-medium">{item.product?.name}</h3>
                            {item.product?.size && (
                                <p className="text-sm text-gray-600">
                                    Talla: {item.product.size}
                                </p>
                            )}
                        </div>
                        <div className="text-right">
                            <p>${item.unit_price} x {item.quantity}</p>
                            <p className="font-medium">
                                ${item.unit_price * item.quantity}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${cart.total}</span>
                </div>
            </div>

            <Link 
                href={route('shop')}
                className="block w-full bg-blue-600 text-white py-2 text-center rounded hover:bg-blue-700 mt-4"
            >
                Proceder al pago
            </Link>
        </div>
    )
}