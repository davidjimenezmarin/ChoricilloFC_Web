<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::all();

        return Inertia::render('Shop', [
            'products' => $products,
        ]);
    }
}
