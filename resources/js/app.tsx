// Archivo principal de entrada de la aplicación React con Inertia.js y Vite

import '../css/app.css';                   // Estilos globales CSS
import './bootstrap';                      // Inicialización de dependencias y configuraciones
import { Toaster } from 'react-hot-toast';// Componente para notificaciones toast
import './language/i18n';                  // Configuración y carga de traducciones i18n
import { createInertiaApp } from '@inertiajs/react'; // Función para crear la app Inertia + React
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'; // Resolver componentes páginas con Vite
import { createRoot } from 'react-dom/client'; // API moderna para renderizado en React 18+

// Nombre de la aplicación configurado vía variable de entorno
const appName = import.meta.env.VITE_APP_NAME || 'Choricillo';

createInertiaApp({
    // Plantilla para el título de las páginas, incluye nombre app
    title: (title) => `${title} - ${appName}`,

    // Resolución dinámica de componentes según nombre de página, usa glob para cargar todos
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),

    // Setup personalizado para React 18 usando createRoot
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Renderizado principal de la app Inertia y el Toaster para notificaciones
        root.render(
            <>
                <App {...props} />
                <Toaster position="top-right" reverseOrder={false} />
            </>
        );
    },

    // Barra de progreso configurada para navegación Inertia (color gris)
    progress: {
        color: '#e53610', 
    },
});
