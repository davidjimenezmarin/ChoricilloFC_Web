import { usePage } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";

export default function Checkout() {
    const { cart } = usePage().props;
    const user = usePage().props.auth.user;

    return (
        <section className="grid grid-cols-1 pt-4 justify-items-center bg-slate-100 gap-20 h-screen sm:grid-cols-2 sm:gap-10 sm:p-0 sm:items-center">
            <div className="max-w-auto border-r-solid border-r-2 border-gray-300 pr-4 flex flex-col items-start">
                <h1 className="text-2xl font-bold mb-4">Datos personales</h1>
                <div className="flex flex-col gap-2 border rounded-md bg-white p-4 mb-2">
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
                <Button variant="default" className="w-auto" onClick={() => window.history.back()}>
                    Volver
                </Button>
            </div>
            <div className="w-auto max-w-lg bg-white rounded-lg shadow-lg p-6 h-screen flex flex-col gap-4">
                <div className="max-w-auto border-r-solid flex flex-col items-start justify-center">
                    <p className="text-2xl font-bold mb-2">Resumen de la compra</p>
                    <p className="text-sm text-gray-600 mb-4">Por favor, revisa los productos en tu carrito antes de proceder al pago.</p>
                </div>
                {/* Scroll solo en productos */}
                <div className="space-y-4 overflow-y-auto h-full ">
                    {cart.details.map((item) => (
                    <div key={item.id} className="grid grid-rows-1 grid-cols-2 gap-6 p-2 border rounded-md">
                        {/* Imagen del producto */}
                        <img
                        src={`/recursos/products/${item.product.image}`}
                        alt={item.product?.name}
                        className="w-auto h-auto object-cover rounded-md justify-self-center"
                        />
                        {/* Info producto */}
                        <div className="flex flex-col justify-center">
                            <h3 className="font-semibold">{item.product.name}</h3>
                            <p className="text-sm text-gray-600">Talla: {item.size}</p>
                            <p className="font-semibold mt-2">€{item.unit_price}</p>
                            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                            <p className=" text-md self-end ">Subtotal: €{item.unit_price * item.quantity}</p>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="mt-4 space-y-4 flex flex-col justify-end">
                    <p className="self-end text-lg"><strong>Total : {cart.total_amount} €</strong> </p>
                    <Button variant="default" className="w-auto" onClick={() => window.history.back()}>
                        Pagar
                    </Button>
                </div>
                
            </div>
        </section>
    );
}