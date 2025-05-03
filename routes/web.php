<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ShippingAddressController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\NoticeController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'notices' => \App\Models\Notice::latest()->take(5)->get(),  
    ]);
});

Route::get('/team', [PlayerController::class, 'index'])->name('team');

Route::get('/notices', [NoticeController::class, 'index'])->name('notices');

Route::get('/notices/{slug}', [NoticeController::class, 'show'])->name('notice.show');


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
    Route::post('/cart/update/{id}', [OrderDetailController::class, 'updateCart'])->name('details.update');

    Route::get('/order/checkout', [OrderController::class, 'checkout'])->name('order.checkout');
    Route::put('/checkout', [OrderController::class, 'store'])->name('checkout.store');
    Route::get('/checkout', [OrderController::class, 'index'])->name('checkout.index');


    Route::post('/addresses', [ShippingAddressController::class, 'store'])->name('addresses.store');
    Route::put('/addresses/{address}', [ShippingAddressController::class, 'update'])->name('addresses.update');
    Route::delete('/addresses/{address}', [ShippingAddressController::class, 'destroy'])->name('addresses.destroy');

});


require __DIR__.'/auth.php';
