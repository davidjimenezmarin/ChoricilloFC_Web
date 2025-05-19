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
use App\Http\Controllers\GameController;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsAdminOrPlayer;
use App\Models\Game;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'notices' => \App\Models\Notice::latest()->take(5)->get(),  
    ]);
});

Route::get('/team', [PlayerController::class, 'index'])->name('team');

Route::get('/notices', [NoticeController::class, 'index'])->name('notices');

Route::get('/matches', [GameController::class, 'index'])->name('matches');


Route::get('/shop', [ProductController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('shop');

Route::middleware(['auth', 'verified', IsAdmin::class])->group(function () {
    Route::get('/players/manage', [PlayerController::class, 'manage'])->name('team.manage');
    Route::get('/players/create', [PlayerController::class, 'create'])->name('players.create');
    Route::get('/players/{player}/edit', [PlayerController::class, 'edit'])->name('players.edit');
    Route::delete('/players/{player}', [PlayerController::class, 'destroy'])->name('players.destroy');
    Route::post('/players', [PlayerController::class, 'store'])->name('players.store');
    Route::post('/players/{player}', [PlayerController::class, 'update'])->name('players.update');

    Route::get('/matches/manage', [GameController::class, 'manage'])->name('matches.manage');
    Route::get('/matches/create', [GameController::class, 'create'])->name('matches.create');
    Route::post('/matches', [GameController::class, 'store'])->name('matches.store');
    Route::get('/matches/{match}/edit', [GameController::class, 'edit'])->name('matches.edit');
    Route::post('/matches/{match}', [GameController::class, 'update'])->name('matches.update');
    Route::delete('/matches/{match}', [GameController::class, 'destroy'])->name('matches.destroy');
});    

Route::middleware(['auth', 'verified', IsAdminOrPlayer::class])->group(function () {
    Route::get('/notices/manage', [NoticeController::class, 'manage'])->name('notices.manage');
    Route::get('/notices/create', [NoticeController::class, 'create'])->name('notices.create');
    Route::post('/notices', [NoticeController::class, 'store'])->name('notices.store');
    Route::get('/notices/{notice}/edit', [NoticeController::class, 'edit'])->name('notices.edit');
    Route::post('/notices/{notice}', [NoticeController::class, 'update'])->name('notices.update');
    Route::delete('/notices/{notice}', [NoticeController::class, 'destroy'])->name('notices.destroy');
});

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
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');

    Route::post('/addresses', [ShippingAddressController::class, 'store'])->name('addresses.store');
    Route::put('/addresses/{address}', [ShippingAddressController::class, 'update'])->name('addresses.update');
    Route::delete('/addresses/{address}', [ShippingAddressController::class, 'destroy'])->name('addresses.destroy');

});

Route::get('/notices/{slug}', [NoticeController::class, 'show'])->name('notice.show');

Route::get('/matches/{slug}', [GameController::class, 'show'])->name('match.show');

Route::get('/players/{slug}', [PlayerController::class, 'show'])->name('player.show');

require __DIR__.'/auth.php';
