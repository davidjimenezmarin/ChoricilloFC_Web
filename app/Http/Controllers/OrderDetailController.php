<?php
namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
class OrderDetailController extends Controller
{
   
    public function addToCart(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // Obtener la orden activa del usuario (su carrito actual)
        $order = Order::firstOrCreate(
         //   ['user_id' => auth()->id(), 'status' => 'pending'], // Buscar una orden pendiente
            ['total' => 0] // Si no existe, la crea con total = 0
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

        return redirect()->back()->with('success', 'Producto agregado al carrito');
    }

}