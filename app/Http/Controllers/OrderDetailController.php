<?php
namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OrderDetailController extends Controller
{
        private function updateOrderTotal($order){
            $order->update([
                'total_amount' => $order->details->sum(function($detail) {
                    return $detail->quantity * $detail->unit_price;
                })
            ]);
        }
        
        public function addToCart(Request $request)
        {
            Log::debug('Datos recibidos en addToCart:', $request->all());

            $userId = Auth::id();

            $validated = $request->validate([
                'productId' => 'required|exists:products,id',
                'size' => 'nullable|string|in:S,M,L,XL',
            ]);
            
            $product = Product::findOrFail($validated['productId']);

            // Obtener o crear la orden
            $order = Order::firstOrCreate(
                ['user_id' => $userId, 'status' => 'pending'],
                ['total' => 0, 'user_id' => $userId, 'status' => 'pending']
            );

            // Buscar si ya existe el producto en el carrito
            $detail = OrderDetail::where('order_id', $order->id)
            ->where('product_id', $product->id)
            ->where('size', $validated['size'])
            ->first();
                
            if ($detail) {
                $detail->increment('quantity');
            } else {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'size' => $validated['size'],
                    'quantity' => 1,
                    'unit_price' => $product->price,
                ]);
            }
    
            // Actualizar total
            $this->updateOrderTotal($order);

            return back()->with(['cart' => $order->load('details.product')]);

        }
    
        public function removeFromCart($id)
        {
            $detail = OrderDetail::findOrFail($id);
            
            $detail->delete(); // Eliminamos el detalle del pedido
            
            $this->updateOrderTotal($detail->order); // Actualizamos el total de la orden

            return back()->with([
                'cart' => $detail->order->load('details.product'), // Recargamos el carrito
            ]);
        }


        public static function getCart()
        {
            $userId = Auth::id();
            return Order::with('details.product')->where([
                'user_id' => $userId,
                'status' => 'pending'
            ])->first();
        }

        // CartController.php

        public function updateCart(Request $request)
        {
            $request->validate([
                'itemId' => 'required|integer',
                'quantity' => 'required|integer|min:1',
            ]);

            $detail = OrderDetail::findOrFail($request->itemId);

            $detail->quantity = $request->quantity;
            $detail->save();

            $this->updateOrderTotal($detail->order); // Actualizamos el total de la orden

            return back(); // o redirect, o respuesta JSON
        }

        
     

}