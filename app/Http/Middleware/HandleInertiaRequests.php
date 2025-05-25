<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\OrderDetailController;

class HandleInertiaRequests extends Middleware
{
    /**
     * Define la vista raíz que Inertia debe renderizar en la primera carga de la aplicación.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Obtiene la versión de los recursos (assets) compartidos.
     * Esto se utiliza para invalidar el caché de los archivos del frontend cuando se despliegan nuevos cambios.
     *
     * @param Request $request La petición entrante
     * @return string|null Versión actual de los assets o null si no se define
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define los props compartidos globalmente con todas las respuestas de Inertia.
     * Estos valores estarán disponibles automáticamente en todas las vistas renderizadas con Inertia.
     *
     * @param Request $request La petición HTTP actual
     * @return array<string, mixed> Lista de variables compartidas
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),

            // Información de autenticación del usuario actual
            'auth' => [
                'user' => $request->user(),
            ],

            // Carga el carrito solo si el usuario está autenticado
            'cart' => Auth::check() ? OrderDetailController::getCart() : null,
        ];
    }
}
