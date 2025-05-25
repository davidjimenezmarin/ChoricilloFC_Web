<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;

class ProductController extends Controller
{
    /**
     * Muestra la vista de tienda con productos organizados por categoría.
     * Si se pasa un slug, se filtran los productos por dicha categoría.
     *
     * @param string|null $slug Slug de la categoría (opcional)
     * @return \Inertia\Response
     */
    public function index($slug = null): Response
    {   
        // Obtiene todas las categorías junto con sus productos relacionados
        $categories = Category::with('products')->get();

        // Si se proporciona un slug, se intenta encontrar la categoría correspondiente
        if ($slug) {
            $category = Category::where('slug', $slug)->first();

            // Si no se encuentra la categoría, se devuelve la tienda sin productos filtrados
            if (!$category) {
                return Inertia::render('Shop', [
                    'productsByCategory' => [],
                    'categories' => $categories,
                    'selectedCategory' => null,
                ]);
            }

            // Si se encuentra la categoría, se muestra solo esa categoría y sus productos
            return Inertia::render('Shop', [
                'productsByCategory' => [
                    $category->id => $category->products ?? collect(),
                ],
                'categories' => $categories,
                'selectedCategory' => $category,
            ]);
        }

        // Si no se proporciona slug, se muestran todas las categorías con sus productos
        return Inertia::render('Shop', [
            'productsByCategory' => $categories->mapWithKeys(function ($category) {
                return [$category->id => $category->products ?? collect()];
            }),
            'categories' => $categories,
            'selectedCategory' => null,
        ]);
    }

    /**
     * Muestra el detalle de un producto específico.
     *
     * @param string $slug Slug del producto
     * @return \Inertia\Response
     */
    public function show($slug): Response
    {
        // Busca el producto por su slug y lanza 404 si no lo encuentra
        $product = Product::where('slug', $slug)->firstOrFail();

        // Renderiza la vista con los datos del producto
        return Inertia::render('ProductDetail', [
            'product' => $product
        ]);
    }
}
