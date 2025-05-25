<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Define las reglas de validación para la actualización del perfil del usuario.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // El campo nombre es obligatorio, debe ser una cadena y no exceder 255 caracteres
            'name' => ['required', 'string', 'max:255'],

            // El campo email es obligatorio, debe tener formato de email válido,
            // debe estar en minúsculas, no puede superar 255 caracteres y debe ser único,
            // exceptuando el del usuario autenticado (para evitar conflicto con su propio email)
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }
}
