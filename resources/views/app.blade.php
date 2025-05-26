<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Título dinámico gestionado por Inertia -->
        <title inertia>{{ config('app.name', 'Choricillo') }}</title>

        <!-- Preconexión para mejora de carga de fuentes -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <!-- Fuente personalizada Figtree en diferentes pesos -->
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Rutas generadas por Ziggy para JS -->
        @routes

        <!-- Habilita recarga rápida para React con Vite -->
        @viteReactRefresh

        <!-- Incluye scripts y hojas generadas por Vite para la app y la página específica -->
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])

        <!-- Inertia head para manejar títulos y meta dinámicos -->
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <!-- Punto de montaje de la app Inertia -->
        @inertia
    </body>
</html>
