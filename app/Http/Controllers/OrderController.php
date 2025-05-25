<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\PaymentMethod;
use App\Models\User;

class OrderController extends Controller
{
    /**
     * Muestra la vista de checkout para que el usuario seleccione
     * dirección de envío y método de pago.
     *
     * @return \Inertia\Response
     */
    public function checkout()
    {
        $user = Auth::user(); // Usuario autenticado
        $addresses = $user->addresses; // Direcciones asociadas al usuario
        $methods = PaymentMethod::all(); // Todos los métodos de pago disponibles

        return Inertia::render('Checkout', [
            'addresses' => $addresses,
            'methods' => $methods,
        ]);
    }

    /**
     * Completa un pedido pendiente del usuario con los datos de envío y pago.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Se recupera el primer pedido pendiente del usuario actual
        $order = Auth::user()->orders
            ->where('status', 'pending')
            ->first();

        // Se actualiza el pedido con los datos recibidos
        $order->update([
            'shipping_address_id' => $request->shipping_address_id,
            'payment_method_id' => $request->payment_method_id,
            'status' => 'completed',
            'order_date' => now(),
        ]);

        // Redirige a la tienda con mensaje de éxito
        return redirect()->route('shop')->with('success', 'Order placed successfully!');
    }

    /**
     * Muestra un listado de todos los pedidos del usuario autenticado.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Se obtienen los pedidos del usuario con relaciones cargadas
        $orders = Order::with(['details.product', 'shippingAddress', 'paymentMethod'])
            ->where('user_id', Auth::id())
            ->get();

        return Inertia::render('Orders', [
            'orders' => $orders,
        ]);
    }

    /**
     * Muestra el detalle de un pedido específico si pertenece al usuario actual.
     *
     * @param int $id ID del pedido
     * @return \Inertia\Response
     */
    public function show($id)
    {
        // Se busca el pedido por ID y usuario autenticado
        $order = Order::with(['details.product', 'shippingAddress', 'paymentMethod'])
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return Inertia::render('OrderDetails', [
            'order' => $order,
        ]);
    }
}
