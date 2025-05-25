<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Registra los servicios de la aplicación.
     * Este método se ejecuta antes de que se resuelvan los bindings en el contenedor.
     * Es ideal para definir servicios que serán utilizados por otros proveedores.
     */
    public function register(): void
    {
        // Aquí se pueden registrar bindings personalizados, servicios, etc.
    }

    /**
     * Inicia cualquier servicio requerido por la aplicación.
     * Este método se llama automáticamente una vez que todos los proveedores han sido registrados.
     */
    public function boot(): void
    {
        // Configura la estrategia de precarga de módulos Vite para mejorar el rendimiento del frontend
        Vite::prefetch(concurrency: 3);
    }
}
