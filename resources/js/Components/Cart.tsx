import { usePage } from '@inertiajs/react';
import { Order, } from '@/types/types';

interface CartPageProps {
    cart?: Order;
}

export default function Cart({ cart }: CartPageProps) {
    // Type-safe access to properties
    const subtotal = cart?.details.reduce(
        (sum, detail) => sum + (detail.quantity * detail.unit_price),
        0
    ) || 0;
    
    if (!cart) {
        return <div>No hay carrito disponible</div>;
        // O podrías redirigir: return <Navigate to="/" />;
    }
    return (
        <div>
            <h1>Carrito de Compras</h1>
            {cart?.details.map(detail => (
                <div key={detail.id}>
                    <h2>{detail.product.name}</h2>
                    <p>Tamaño: {detail.product.size}</p>
                    <p>Precio: ${detail.unit_price}</p>
                    <p>Cantidad: {detail.quantity}</p>
                </div>
            ))}
            <p>Total: ${cart?.total || 0}</p>
        </div>
    );
}