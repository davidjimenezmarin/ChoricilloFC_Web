<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderDetailController;
use App\Models\OrderDetail;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Route::get('/shop', function () {
//     return Inertia::render('Shop');
// })->middleware(['auth', 'verified'])->name('shop');




Route::get('/shop', [ProductController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('shop');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/product/{slug?}', [ProductController::class, 'show'])->name('product.show');
    Route::get('/shop/{slug?}', [ProductController::class, 'index'])->name('shop');
    Route::post('/cart/add',[OrderDetailController::class, 'addToCart'])->name('details.add');
    Route::delete('/cart/remove/{id}', [OrderDetailController::class, 'removeFromCart'])
    ->name('details.remove');
    Route::post('/cart/update', [OrderDetailController::class, 'updateCart'])->name('details.update');
});


require __DIR__.'/auth.php';
