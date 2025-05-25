<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para realizar esta solicitud.
     * En este caso, se permite a cualquier visitante enviar un intento de login.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación para el formulario de inicio de sesión.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'], // Campo obligatorio, tipo string con formato email
            'password' => ['required', 'string'],        // Campo obligatorio, tipo string
            'remember' => ['boolean'],                   // Campo opcional, debe ser booleano
        ];
    }

    /**
     * Intenta autenticar las credenciales proporcionadas.
     * Lanza una excepción de validación si falla el intento.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            // Si el intento falla, registra el intento fallido para limitar por fuerza bruta
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'), // Mensaje estándar de Laravel para fallo de login
            ]);
        }

        // Si se autentica correctamente, limpia el contador de intentos fallidos
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Verifica que el usuario no haya excedido el número de intentos permitidos.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        // Permite un máximo de 5 intentos antes de bloquear temporalmente
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        // Dispara evento de bloqueo
        event(new Lockout($this));

        // Calcula tiempo restante de bloqueo en segundos
        $seconds = RateLimiter::availableIn($this->throttleKey());

        // Lanza excepción de validación indicando al usuario cuánto debe esperar
        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Genera una clave única para limitar los intentos de inicio de sesión por usuario e IP.
     *
     * @return string
     */
    public function throttleKey(): string
    {
        // Ejemplo de clave: "usuario@email.com|127.0.0.1"
        return Str::transliterate(Str::lower($this->string('email')) . '|' . $this->ip());
    }
}
