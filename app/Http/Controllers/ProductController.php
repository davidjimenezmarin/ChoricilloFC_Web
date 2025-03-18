<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\Category;


class ProductController extends Controller
{
    public function index($slug = null) : Response
    {   
        // Obtenemos todas las categorías de la base de datos 
        // usando with('products') para incluir los productos de 
        // cada categoría en una sola consulta.
        $categories = Category::with('products')->get();

        // Si la url contien un slug, significa que el usuario está
        // filtrando por categoria.
        if ($slug) {
            // Busca la categoría en la base de datos con el slug recibido en la URL.
            $category = Category::where('slug', $slug)->first();
            // Si no se encuentra ninguna categoría con el slug, la función devuelve la vista Shop con
            // productsByCategory vacío y categories y selectedCategory = null porque la categoría no existe.
            if (!$category) {
                return Inertia::render('Shop', [
                    'productsByCategory' => [],
                    'categories' => $categories,
                    'selectedCategory' => null,
                ]);
            }
            // Si se encuentra una categoría con el slug, la función devuelve la vista Shop con
            // productsByCategory que contiene solo los productos de esa categoría y categories y selectedCategory = category.
            
            return Inertia::render('Shop', [
                'productsByCategory' => [
                    $category->id => $category->products ?? collect(),
                ],
                'categories' => $categories,
                'selectedCategory' => $category, // ← Aquí se envía la categoría seleccionada
            ]);
        }
        // Si la url no contiene un slug, significa que el usuario está
        // en la pantalla de inicio.
        return Inertia::render('Shop', [
            'productsByCategory' => $categories->mapWithKeys(function ($category) {
                return [$category->id => $category->products ?? collect()];
            }),
            'categories' => $categories,
            'selectedCategory' => null,
        ]);
    }


   

}
