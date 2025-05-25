<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OrderDetailController extends Controller
{
    /**
     * Actualiza el total de una orden sumando el precio de cada detalle.
     *
     * @param \App\Models\Order $order
     * @return void
     */
    private function updateOrderTotal($order)
    {
        $order->update([
            'total_amount' => $order->details->sum(function ($detail) {
                return $detail->quantity * $detail->unit_price;
            })
        ]);
    }

    /**
     * Agrega un producto al carrito del usuario autenticado.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function addToCart(Request $request)
    {
        $userId = Auth::id();

        // Validación de la solicitud
        $validated = $request->validate([
            'productId' => 'required|exists:products,id',
            'size' => 'nullable|string|in:S,M,L,XL',
        ]);

        $product = Product::findOrFail($validated['productId']);

        // Se obtiene o crea una orden pendiente para el usuario
        $order = Order::firstOrCreate(
            ['user_id' => $userId, 'status' => 'pending'],
            ['total_amount' => 0, 'order_date' => now()]
        );

        // Verifica si ya existe una entrada para el mismo producto y talla
        $detail = OrderDetail::where('order_id', $order->id)
            ->where('product_id', $product->id)
            ->where('size', $validated['size'])
            ->first();

        if ($detail) {
            // Si ya existe, incrementa la cantidad
            $detail->increment('quantity');
        } else {
            // Si no existe, crea un nuevo detalle de orden
            OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'size' => $validated['size'],
                'quantity' => 1,
                'unit_price' => $product->price,
            ]);
        }

        // Recalcula el total de la orden
        $this->updateOrderTotal($order);

        return redirect()->back();
    }

    /**
     * Elimina un producto del carrito del usuario.
     *
     * @param int $id ID del detalle de la orden
     * @return \Illuminate\Http\RedirectResponse
     */
    public function removeFromCart($id)
    {
        $detail = OrderDetail::findOrFail($id);

        // Elimina el detalle del pedido
        $detail->delete();

        // Recalcula el total de la orden
        $this->updateOrderTotal($detail->order);

        return back();
    }

    /**
     * Actualiza la cantidad de un producto en el carrito.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id ID del detalle de la orden
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateCart(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $detail = OrderDetail::findOrFail($id);
        $detail->quantity = $request->quantity;
        $detail->save();

        // Recalcula el total tras la actualización
        $this->updateOrderTotal($detail->order);

        return back();
    }

    /**
     * Retorna el carrito actual del usuario autenticado.
     *
     * @return \App\Models\Order|null
     */
    public static function getCart()
    {
        $userId = Auth::id();

        // Obtiene la orden pendiente con productos relacionados
        return Order::with('details.product')->where([
            'user_id' => $userId,
            'status' => 'pending'
        ])->first();
    }
}
