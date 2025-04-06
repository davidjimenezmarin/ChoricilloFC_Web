<?php

namespace App\Http\Controllers;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function checkout()
    {
        $userId = Auth::id();
        $order = Order::where('user_id', $userId)
            ->where('status', 'pending')
            ->first();

        if (!$order) {
            return redirect()->route('shop')->with('error', 'No hay productos en el carrito.');
        }

        return Inertia::render('Checkout');
    }
}
