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
    public function checkout()
    {
        $user = Auth::user();
        $addresses = $user->addresses;
        $methods = PaymentMethod::all();
        return Inertia::render('Checkout',[
            'addresses' => $addresses,
            'methods' => $methods,
        ]);
    }

    public function store(Request $request)
    {
        $order = Auth::user()->orders
            ->where('status', 'pending')
            ->first();

        $order->update([
            'shipping_address_id' => $request->shipping_address_id,
            'payment_method_id' => $request->payment_method_id,
            'status' => 'completed',
            'order_date' => now(),
        ]);

        return redirect()->route('shop')->with('success', 'Order placed successfully!');
    }

    public function index()
    {
        $orders = Order::with(['details.product', 'shippingAddress', 'paymentMethod'])
            ->where('user_id', Auth::id())
            ->get();

        return Inertia::render('Orders', [
            'orders' => $orders,
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['details.product', 'shippingAddress', 'paymentMethod'])
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return Inertia::render('OrderDetails', [
            'order' => $order,
        ]);
    }
}
