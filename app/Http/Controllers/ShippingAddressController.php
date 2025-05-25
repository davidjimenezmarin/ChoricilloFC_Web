<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShippingAddress;
use Illuminate\Support\Facades\Auth;

class ShippingAddressController extends Controller
{
    /**
     * Almacena una nueva dirección de envío asociada al usuario autenticado.
     *
     * @param Request $request Instancia de la petición HTTP con los datos de la dirección
     * @return \Illuminate\Http\RedirectResponse Redirección de vuelta tras guardar la dirección
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'street'    => 'required|string|max:255',
            'city'      => 'required|string|max:100',
            'province'  => 'required|string|max:100',
            'country'   => 'required|string|max:100',
            'zip_code'  => 'required|string|max:20',
            'main'      => 'boolean',
        ]);

        // Si se marca como principal, desactivar otras direcciones principales del usuario
        if ($validated['main']) {
            ShippingAddress::where('user_id', Auth::id())->update(['main' => false]);
        }

        // Crea la nueva dirección asociada al usuario
        $user->addresses()->create($validated);

        return back();
    }

    /**
     * Actualiza los datos de una dirección de envío existente.
     *
     * @param Request $request Instancia de la petición con los nuevos datos
     * @param ShippingAddress $address Dirección que se desea actualizar
     * @return \Illuminate\Http\RedirectResponse Redirección de vuelta tras la actualización
     *
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException Si el usuario no es propietario de la dirección
     */
    public function update(Request $request, ShippingAddress $address)
    {
        // Verifica que la dirección pertenece al usuario autenticado
        if ($address->user_id !== Auth::id()) {
            abort(403); // Acceso prohibido
        }

        $validated = $request->validate([
            'street'    => 'required|string|max:255',
            'city'      => 'required|string|max:100',
            'province'  => 'required|string|max:100',
            'country'   => 'required|string|max:100',
            'zip_code'  => 'required|string|max:20',
            'main'      => 'boolean',
        ]);

        // Si la dirección es marcada como principal, anula las demás
        if ($validated['main']) {
            ShippingAddress::where('user_id', Auth::id())->update(['main' => false]);
        }

        // Actualiza los campos de la dirección
        $address->update($validated);

        return back();
    }

    /**
     * Elimina una dirección de envío existente.
     *
     * @param ShippingAddress $address Dirección que se desea eliminar
     * @return \Illuminate\Http\RedirectResponse Redirección de vuelta con mensaje de éxito
     */
    public function destroy(ShippingAddress $address)
    {
        // Elimina la dirección de la base de datos
        $address->delete();

        return back()->with('success', 'Dirección eliminada correctamente');
    }
}
