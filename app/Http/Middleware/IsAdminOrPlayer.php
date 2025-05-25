<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdminOrPlayer
{
    /**
     * Maneja una solicitud entrante y verifica si el usuario es administrador o jugador.
     *
     * @param  Request  $request La solicitud HTTP actual
     * @param  Closure  $next Función que representa el siguiente paso en el flujo de middleware
     * @return Response La respuesta resultante de continuar con el siguiente middleware o controlador
     *
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException Si el usuario no está autenticado o no tiene roles válidos
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user(); // Obtiene el usuario autenticado desde la solicitud actual

        // Verifica si el usuario no está autenticado o no tiene rol de admin ni de jugador
        if (!$user || (!$user->is_admin && !$user->is_player)) {
            abort(403, 'No autorizado.'); // Finaliza con un error 403 si no cumple
        }

        // Continúa con la ejecución de la solicitud si el usuario está autorizado
        return $next($request);
    }
}
