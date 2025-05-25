<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Maneja la solicitud entrante y determina si el usuario autenticado tiene permisos de administrador.
     *
     * @param  Request  $request La solicitud HTTP actual
     * @param  Closure  $next La siguiente acción que debe ejecutarse en la cadena de middlewares
     * @return Response Una respuesta HTTP, ya sea continuando o abortando con error
     *
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException Si el usuario no está autorizado
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verifica que el usuario esté autenticado y que tenga el rol de administrador.
        // Si no cumple, se detiene la ejecución con un error 403 (Forbidden).
        if (!Auth::check() || !Auth::user()->is_admin) {
            abort(403, 'Acceso no autorizado');
        }

        // Si pasa la validación, se continúa con la siguiente etapa de la solicitud.
        return $next($request);
    }
}
