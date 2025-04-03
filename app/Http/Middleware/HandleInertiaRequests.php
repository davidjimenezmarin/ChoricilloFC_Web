<?php

namespace App\Http\Middleware;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'cart' => Auth::check() ? $this->getCart() : null, // Solo si está autenticado
        ];
    }

    private function getCart()
    {
        $userId = Auth::id();
        return Order::with('details.product')->where([
            'user_id' => $userId,
            'status' => 'pending'
        ])->first();
    }
}
