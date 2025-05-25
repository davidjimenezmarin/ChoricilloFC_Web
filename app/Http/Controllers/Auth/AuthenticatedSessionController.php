<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Muestra la vista del formulario de inicio de sesión.
     *
     * @return Response Página renderizada con Inertia, incluyendo:
     *  - canResetPassword: boolean indicando si existe la ruta para resetear contraseña.
     *  - status: estado actual de la sesión, por ejemplo mensajes de éxito o error.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Procesa una solicitud de autenticación del usuario.
     *
     * @param LoginRequest $request Solicitud validada que contiene las credenciales del usuario.
     * @return RedirectResponse Redirección a una ruta protegida según el rol del usuario:
     *  - Admins o jugadores → dashboard
     *  - Otros roles → tienda
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // Autentica al usuario con los datos del formulario
        $request->authenticate();

        // Regenera la sesión para mitigar ataques de fijación de sesión
        $request->session()->regenerate();

        // Redirecciona a dashboard si es admin o jugador, si no a la tienda
        if (Auth::user()->isAdmin() || Auth::user()->isPlayer()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        return redirect()->intended(route('shop', absolute: false));
    }

    /**
     * Cierra la sesión del usuario autenticado.
     *
     * @param Request $request Solicitud HTTP actual, utilizada para invalidar la sesión y regenerar el token.
     * @return RedirectResponse Redirección al home tras cerrar sesión de forma segura.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Cierra sesión usando el guard por defecto
        Auth::guard('web')->logout();

        // Invalida la sesión actual
        $request->session()->invalidate();

        // Regenera el token CSRF para proteger la siguiente sesión
        $request->session()->regenerateToken();

        // Redirige al usuario a la página de inicio
        return redirect('/');
    }
}
