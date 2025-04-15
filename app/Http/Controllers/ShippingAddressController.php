<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShippingAddress;
use Illuminate\Support\Facades\Auth;

class ShippingAddressController extends Controller
{
     /**
     * Guarda una nueva dirección de envío
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

        if ($validated['main']) {
            // Desactivar otras direcciones principales
            ShippingAddress::where('user_id', Auth::id())->update(['main' => false]);
        }

        $user->addresses()->create($validated);

        return back();
    }

    /**
     * Actualiza una dirección existente
     */
    public function update(Request $request, ShippingAddress $address)
    {
        // Asegurarse de que el usuario es el propietario
        if ($address->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'street'    => 'required|string|max:255',
            'city'      => 'required|string|max:100',
            'province'  => 'required|string|max:100',
            'country'   => 'required|string|max:100',
            'zip_code'  => 'required|string|max:20',
            'main'      => 'boolean',
        ]);

        if ($validated['main']) {
            // Desactivar otras direcciones principales
            ShippingAddress::where('user_id', Auth::id())->update(['main' => false]);
        }

        $address->update($validated);

        return back();
    }

    /**
     * Elimina una dirección existente
     */
    public function destroy(ShippingAddress $address)
    {
        
        $address->delete();

        return back()->with('success', 'Dirección eliminada correctamente');
    }
}
