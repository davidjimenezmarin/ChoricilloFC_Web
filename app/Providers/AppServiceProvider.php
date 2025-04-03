<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'cart' => function () {
                if (Auth::check()) {
                    return Order::where('user_id', Auth::id())
                                ->where('status', 'pending')
                                ->with('details.product')
                                ->first();
                }
                return null;
            },
        ]);
    }
}
