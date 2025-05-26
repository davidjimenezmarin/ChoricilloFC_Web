<?php

use App\Http\Controllers\ProfileController;
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
use App\Models\Player;
use App\Models\Notice;
use Carbon\Carbon;
/**
 * Ruta principal ('/'):
 * - Obtiene todos los jugadores con sus participaciones en partidos.
 * - Calcula destacados: máximo goleador total, goleador del mes y jugador más amonestado.
 * - Obtiene las 5 noticias más recientes.
 * - Renderiza la vista 'Welcome' con datos para la página de inicio.
 * - Incluye el próximo partido programado.
 */
Route::get('/', function () {
    $players = Player::with(['matchParticipations'])->get();

    // Máximo goleador total
    $topScorer = $players->sortByDesc(fn($p) => $p->matchParticipations->sum('goals'))->first();
    $topScorer->total_goals = $topScorer->matchParticipations->sum('goals');

    // Goleador del mes
    $oneMonthAgo = Carbon::now()->subMonth();
    $scorerOfMonth = $players->sortByDesc(fn($p) =>
        $p->matchParticipations->where('created_at', '>=', $oneMonthAgo)->sum('goals')
    )->first();
    $scorerOfMonth->monthly_goals = $scorerOfMonth->matchParticipations->where('created_at', '>=', $oneMonthAgo)->sum('goals');

    // Jugador más amonestado (suma de amarillas + rojas)
    $mostBooked = $players->sortByDesc(fn($p) =>
        $p->matchParticipations->sum('yellow_cards') + $p->matchParticipations->sum('red_cards')
    )->first();
    $mostBooked->total_cards = $mostBooked->matchParticipations->sum('yellow_cards') + $mostBooked->matchParticipations->sum('red_cards');

    // Obtiene el próximo partido programado
    $nextMatch = Game::where('status', 'scheduled')
            ->orderBy('date', 'asc')
            ->first();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'notices' => Notice::latest()->take(5)->get(),
        'highlights' => [
            'top_scorer' => $topScorer,
            'scorer_of_the_month' => $scorerOfMonth,
            'most_booked' => $mostBooked,
        ],
        'nextMatch' => $nextMatch,
    ]);
})->name('dashboard');

/**
 * Rutas públicas para visualizar equipo, noticias y partidos.
 */
Route::get('/team', [PlayerController::class, 'index'])->name('team');
Route::get('/notices', [NoticeController::class, 'index'])->name('notices');
Route::get('/matches', [GameController::class, 'index'])->name('matches');

/**
 * Ruta protegida para la tienda, solo para usuarios autenticados y verificados.
 */
Route::get('/shop', [ProductController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('shop');

/**
 * Grupo de rutas para administración exclusiva, protegidas por middleware IsAdmin:
 * - Gestión completa de jugadores y partidos (CRUD).
 */
Route::middleware(['auth', 'verified', IsAdmin::class])->group(function () {
    // Jugadores
    Route::get('/players/manage', [PlayerController::class, 'manage'])->name('team.manage');
    Route::get('/players/create', [PlayerController::class, 'create'])->name('players.create');
    Route::get('/players/{player}/edit', [PlayerController::class, 'edit'])->name('players.edit');
    Route::delete('/players/{player}', [PlayerController::class, 'destroy'])->name('players.destroy');
    Route::post('/players', [PlayerController::class, 'store'])->name('players.store');
    Route::post('/players/{player}', [PlayerController::class, 'update'])->name('players.update');

    // Partidos
    Route::get('/matches/manage', [GameController::class, 'manage'])->name('matches.manage');
    Route::get('/matches/create', [GameController::class, 'create'])->name('matches.create');
    Route::post('/matches', [GameController::class, 'store'])->name('matches.store');
    Route::get('/matches/{match}/edit', [GameController::class, 'edit'])->name('matches.edit');
    Route::post('/matches/{match}', [GameController::class, 'update'])->name('matches.update');
    Route::delete('/matches/{match}', [GameController::class, 'destroy'])->name('matches.destroy');
});    

/**
 * Grupo de rutas para usuarios administradores o jugadores, protegidas por middleware IsAdminOrPlayer:
 * - Gestión completa de noticias (CRUD).
 */
Route::middleware(['auth', 'verified', IsAdminOrPlayer::class])->group(function () {
    Route::get('/notices/manage', [NoticeController::class, 'manage'])->name('notices.manage');
    Route::get('/notices/create', [NoticeController::class, 'create'])->name('notices.create');
    Route::post('/notices', [NoticeController::class, 'store'])->name('notices.store');
    Route::get('/notices/{notice}/edit', [NoticeController::class, 'edit'])->name('notices.edit');
    Route::post('/notices/{notice}', [NoticeController::class, 'update'])->name('notices.update');
    Route::delete('/notices/{notice}', [NoticeController::class, 'destroy'])->name('notices.destroy');
});

/**
 * Rutas protegidas para usuarios autenticados:
 * - Gestión del perfil (editar, actualizar, eliminar).
 * - Visualización y gestión de productos y tienda.
 * - Operaciones de carrito (añadir, eliminar, actualizar).
 * - Checkout y gestión de pedidos.
 * - CRUD de direcciones de envío.
 */
Route::middleware('auth')->group(function () {
    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Productos y tienda
    Route::get('/product/{slug?}', [ProductController::class, 'show'])->name('product.show');
    Route::get('/shop/{slug?}', [ProductController::class, 'index'])->name('shop');

    // Carrito de compras
    Route::post('/cart/add',[OrderDetailController::class, 'addToCart'])->name('details.add');
    Route::delete('/cart/remove/{id}', [OrderDetailController::class, 'removeFromCart'])->name('details.remove');
    Route::post('/cart/update/{id}', [OrderDetailController::class, 'updateCart'])->name('details.update');

    // Pedidos y checkout
    Route::get('/order/checkout', [OrderController::class, 'checkout'])->name('order.checkout');
    Route::put('/checkout', [OrderController::class, 'store'])->name('checkout.store');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');

    // Direcciones de envío
    Route::post('/addresses', [ShippingAddressController::class, 'store'])->name('addresses.store');
    Route::put('/addresses/{address}', [ShippingAddressController::class, 'update'])->name('addresses.update');
    Route::delete('/addresses/{address}', [ShippingAddressController::class, 'destroy'])->name('addresses.destroy');
});

/**
 * Rutas públicas para mostrar detalles específicos por slug:
 * - Noticias, partidos y jugadores.
 */
Route::get('/notices/{slug}', [NoticeController::class, 'show'])->name('notice.show');
Route::get('/matches/{slug}', [GameController::class, 'show'])->name('match.show');
Route::get('/players/{slug}', [PlayerController::class, 'show'])->name('player.show');

/**
 * Archivo de rutas de autenticación provisto por Laravel Breeze o similar.
 */
require __DIR__.'/auth.php';
