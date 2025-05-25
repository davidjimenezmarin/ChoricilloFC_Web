<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Muestra el formulario de edición del perfil del usuario autenticado.
     *
     * @param Request $request Instancia de la petición HTTP
     * @return Response Vista Inertia del perfil con datos del usuario
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'addresses' => $request->user()->addresses, // direcciones asociadas al usuario
        ]);
    }

    /**
     * Actualiza la información del perfil del usuario.
     *
     * @param ProfileUpdateRequest $request Datos validados del formulario de perfil
     * @return RedirectResponse Redirección a la vista de edición con los cambios aplicados
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        // Si el usuario ha cambiado su correo, se anula la verificación previa
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Elimina la cuenta del usuario autenticado.
     *
     * @param Request $request Instancia de la petición HTTP
     * @return RedirectResponse Redirección a la raíz tras eliminar al usuario
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'], // validación de contraseña actual
        ]);

        $user = $request->user();

        Auth::logout(); // se cierra la sesión

        $user->delete(); // se elimina el usuario

        // Invalida y regenera el token de sesión para prevenir reutilización
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Elimina todas las órdenes del usuario autenticado.
     *
     * @param Request $request Instancia de la petición HTTP
     * @return RedirectResponse Redirección a la vista de perfil con mensaje de estado
     */
    public function deleteOrders(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Elimina todas las órdenes asociadas al usuario
        $user->orders()->delete();

        return Redirect::route('profile.edit')->with('status', 'Órdenes eliminadas correctamente.');
    }
}
