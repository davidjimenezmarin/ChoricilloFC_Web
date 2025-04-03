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
        public function addToCart(Request $request)
        {
            Log::debug('Datos recibidos en addToCart:', $request->all());

            $userId = Auth::id();
            $validated = $request->validate([
                'productId' => 'required|exists:products,id',
                'size' => 'nullable|string|in:S,M,L,XL',
            ]);

            Log::debug('user:', ['id' => $userId]);
            
            $product = Product::findOrFail($validated['productId']);

            // Obtener o crear la orden
            $order = Order::firstOrCreate(
                ['user_id' => $userId, 'status' => 'pending'],
                ['total' => 0, 'user_id' => $userId, 'status' => 'pending']
            );

            // Buscar si ya existe el producto en el carrito
            $detail = OrderDetail::where('order_id', $order->id)
            ->where('product_id', $product->id)
            ->whereHas('product', function($query) use ($validated) {
                if ($validated['size']) {
                    $query->where('size', $validated['size']);
                }
            })
            ->first();
            
            //Log::debug('Producto existente en el carrito:', $detail->toArray());
    
            if ($detail) {
                $detail->increment('quantity');
            } else {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => 1,
                    'unit_price' => $product->price,
                ]);
            }
    
            // Actualizar total
            $order->update([
                'total_amount' => $order->details->sum(function($detail) {
                    return $detail->quantity * $detail->unit_price;
                })
            ]);
           return back()->with('success', 'Producto agregado al carrito');
            
        }
    

    public function removeFromCart(OrderDetail $detail)
    {
        $detail->delete();
        
        // Recalcular total
        $order = $detail->order;
        $order->update([
            'total_amount' => $order->details->sum(fn($d) => $d->quantity * $d->unit_price)
        ]);
        
        return redirect()->back();
    }

    public function updateQuantity(OrderDetail $detail, Request $request)
    {
        $detail->update(['quantity' => $request->quantity]);
        
        $order = $detail->order;
        $order->update([
            'total_amount' => $order->details->sum(fn($d) => $d->quantity * $d->unit_price)
        ]);
        
        return redirect()->back();
    }

}