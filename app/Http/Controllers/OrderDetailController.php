<?php
namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderDetailController extends Controller
{
   
    public function addToCart(Request $request)
    {
        $userId = Auth::id();
        $validated = $request->validate([
            'productId' => 'required|exists:products,id',
            'size' => 'nullable|string',
        ]);
        
        $product = Product::findOrFail($validated['productId']);

        // Obtener la orden activa del usuario (su carrito actual)
        $order = Order::firstOrCreate(
         ['user_id' => $userId, 'status' => 'pending'], // Buscar una orden pendiente
        ['total' => 0, 'user_id' => $userId]  // Si no existe, la crea con total = 0
        );

        // Verificar si el producto ya está en el carrito
        $detail = OrderDetail::where('order_id', $order->id)
                            ->where('product_id', $product->id)
                            ->first();

        if ($detail) {
            // Si ya existe, aumentar la cantidad
            $detail->quantity += 1;
            $detail->save();
        } else {
            // Si no existe, crear un nuevo detalle de pedido
            OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => 1,
                'unit_price' => $product->price,
            ]);
        }

        // Recalcular el total del carrito
        $order->update([
            'total' => $order->details->sum(function($detail) {
                return $detail->quantity * $detail->unit_price;
            })
        ]);

        return Inertia::render('Components/Cart', [
            'cart' => $order->load('details.product'),
        ]);
    }

    public function removeFromCart(OrderDetail $detail)
    {
        $detail->delete();
        
        // Recalcular total
        $order = $detail->order;
        $order->update([
            'total' => $order->details->sum(fn($d) => $d->quantity * $d->unit_price)
        ]);
        
        return redirect()->back();
    }

    public function updateQuantity(OrderDetail $detail, Request $request)
    {
        $detail->update(['quantity' => $request->quantity]);
        
        $order = $detail->order;
        $order->update([
            'total' => $order->details->sum(fn($d) => $d->quantity * $d->unit_price)
        ]);
        
        return redirect()->back();
    }

}