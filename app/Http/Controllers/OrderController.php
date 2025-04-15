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
        $user = Auth::user();
        $addresses = $user->addresses;
       
        return Inertia::render('Checkout',[
            'addresses' => $addresses,
        ]);
    }
}
