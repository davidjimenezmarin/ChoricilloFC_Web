import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'es', // Idioma por defecto
  fallbackLng: 'en',
  debug: true,
  resources: {
    es: {
      translation: {       
        layout: {
            title: 'Mi Aplicación',
            login: 'Iniciar sesión',
            register: 'Regístrate',
            store: 'Tienda',
            news: 'Noticias',
            team: 'Equipo',
            matches: 'Partidos',
            copyright: 'Desarrollado por David Jiménez',
        },
        team: {
            title: 'Equipo',
            goalkeepers: 'Porteros',
            defenders: 'Defensas',
            midfielders: 'Centrocampistas',
            forwards: 'Delanteros',
            manage: 'Gestionar jugadores'
        },
        welcome: {
            team: "Equipo",
            news: "Noticias",
            results: "Resultados",
            store: "Tienda",
            register: "Regístrate",
            main_team: "EQUIPO",
            main_team_desc: "Compitiendo en el mayor nivel de la MLA, estas son las personas que lo hacen posible.",
            main_team_cta: "VER EQUIPO",
            main_news: "NOTICIAS",
            main_news_desc: "No te pierdas ningún detalle de todo lo que ocurre dentro y fuera del terreno de juego.",
            main_news_cta: "SABER MÁS",
            main_results: "RESULTADOS",
            main_results_desc: "Mantente al día con cada resultado y vive la pasión del fútbol en cada partido.",
            main_results_cta: "SABER MÁS",
            main_shop: "NUESTRA TIENDA",
            main_shop_desc: "Para quienes quieran representar al equipo en casa, no busquen más.",
            main_shop_cta: "COMPRA AHORA",
            last_news: "ÚLTIMAS NOTICIAS"
        },
        footer: {
            about: 'Apasionados por el fútbol, la comunidad y el fair play.',
            links: 'Enlaces',
            contact: 'Contacto',
            language: 'Idioma'
        },
        notices: {
            manage: 'Gestionar noticias',
        },
        matches: {
            manage: 'Gestionar partidos',
            empty: 'No hay partidos disponibles.'
        },
        login: {
            title: 'Iniciar sesión',
            email: 'Correo electrónico',
            password: 'Contraseña',
            remember: 'Recuérdame',
            forgot: '¿Has olvidado tu contraseña?',
            continue: 'Continuar'
        },
        forgot: {
            title: '¿Olvidaste tu contraseña?',
            description: '¿Olvidaste tu contraseña? No hay problema. Solo dinos tu correo electrónico y te enviaremos un enlace para que puedas restablecerla.',
            email: 'Correo electrónico',
            send: 'Enviar enlace de restablecimiento'
        },
        register: {
            title: 'Registro',
            name: 'Nombre',
            email: 'Correo electrónico',
            password: 'Contraseña',
            password_confirmation: 'Repite la contraseña',
            login_link: '¿Ya tienes una cuenta?',
            submit: 'Registrarse'
        },
        shop: {
            home: 'Inicio',
            unknown_category: 'Categoría desconocida',
            exit: 'Salir de la tienda',
            exit_short: 'Salir',
            profile: 'Perfil',
            logout: 'Cerrar Sesión',
            categories: {
                camisetas: 'Camisetas',
                pantalones: 'Pantalones',
                accesorios: 'Accesorios',
            },
            cart: {
                title: 'Tu cesta',
                item_count: '{{count}} Artículo(s)',
                empty: 'Tu carrito está vacío',
                view_products: 'Ver productos',
                size: 'Talla',
                total: 'Total:',
                continue_shopping: 'Seguir Comprando',
                checkout: 'Completar Pedido',
                label: 'Carrito'
            },
            checkout: {
                title: 'Finalizar compra',
                error_required: 'Selecciona dirección y método de pago.',
                error_toast: 'Faltan datos requeridos.',
                success: '¡Pedido realizado con éxito!',
                error: 'Error al procesar el pedido.',
                back: 'Volver',
                section: {
                personal: 'Datos personales',
                address: 'Dirección de envío',
                payment: 'Método de pago',
                summary: 'Resumen del pedido'
                },
                name: 'Nombre',
                email: 'Email',
                select_address: 'Selecciona una dirección',
                no_addresses: 'No tienes direcciones.',
                add_address: 'Añadir',
                select_payment: 'Selecciona un método de pago',
                no_payments: 'No hay métodos de pago disponibles.',
                pay: 'Pagar',
                size: 'Talla',
                quantity: 'Cantidad',
                total: 'Total: €{{amount}}'
            }
        },
        profile: {
            title: 'Perfil',
            back: 'Volver',
            orders: 'Ver mis pedidos',
            addresses: {
                title: 'Direcciones guardadas',
                none: 'No tienes direcciones aún.',
                edit: 'Editar',
                delete: 'Eliminar dirección',
                confirm_delete: '¿Estás seguro de que quieres eliminar esta dirección?',
                delete_error: 'Hubo un error al eliminar la dirección.',
                created: 'Dirección creada',
                form: {
                    placeholders: {
                        street: 'Calle, Piso, Departamento',
                        city: 'Ciudad',
                        province: 'Provincia',
                        country: 'País',
                        zip: 'Código postal',
                    },
                    main: '¿Es la dirección principal?',
                    submit_create: 'Añadir dirección',
                    submit_update: 'Actualizar dirección',
                    cancel: 'Cancelar'
                },
                
            },
            password: {
                    title: 'Actualizar contraseña',
                    description: 'Asegúrate de usar una contraseña larga y aleatoria para mantener tu cuenta segura.',
                    current: 'Contraseña actual',
                    new: 'Nueva contraseña',
                    confirm: 'Confirmar contraseña',
                    save: 'Guardar',
                    saved: 'Guardado.'
            },
            info: {
                title: 'Información del perfil',
                description: 'Actualiza la Información de tu perfil y tu dirección de correo.',
                name: 'Nombre',
                email: 'Correo electrónico',
                verify_notice: 'Tu dirección de correo no está verificada.',
                verify_button: 'Haz clic aquí para reenviar el correo de verificación.',
                verify_sent: 'Se ha enviado un nuevo enlace de verificación a tu correo electrónico.',
                save: 'Guardar',
                saved: 'Guardado.'
            },
            delete: {
                title: 'Eliminar cuenta',
                description:
                'Una vez eliminada tu cuenta, todos sus recursos y datos se eliminarán permanentemente. Asegúrate de descargar cualquier información que desees conservar.',
                button: 'Eliminar cuenta',
                confirm_title: '¿Estás seguro de que deseas eliminar tu cuenta?',
                confirm_description:
                'Una vez eliminada tu cuenta, todos sus recursos y datos se eliminarán permanentemente. Por favor, introduce tu contraseña para confirmar esta acción.',
                password_label: 'Contraseña',
                password_placeholder: 'Contraseña',
                cancel: 'Cancelar',
                confirm_button: 'Eliminar cuenta'
            }
        }
      }
    },
    en: {
      translation: {
        layout: {
            title: 'My Application',
            login: 'Login',
            register: 'Register',
            store: 'Store',
            news: 'News',
            team: 'Team',
            matches: 'Matches',
            copyright: 'Developed by David Jiménez',
        },
        team: {
            title: 'Team',
            goalkeepers: 'Goalkeepers',
            defenders: 'Defenders',
            midfielders: 'Midfielders',
            forwards: 'Forwards',
            manage: 'Manage players'
        },
        welcome: {
            team: "Team",
            news: "News",
            results: "Results",
            store: "Shop",
            register: "Sign up",
            main_team: "TEAM",
            main_team_desc: "Competing at the highest level of the MLA, these are the people who make it happen.",
            main_team_cta: "VIEW TEAM",
            main_news: "NEWS",
            main_news_desc: "Don't miss any details of what happens on and off the field.",
            main_news_cta: "LEARN MORE",
            main_results: "RESULTS",
            main_results_desc: "Stay up to date with every result and feel the passion of football in every match.",
            main_results_cta: "LEARN MORE",
            main_shop: "OUR SHOP",
            main_shop_desc: "For those who want to represent the team at home, look no further.",
            main_shop_cta: "SHOP NOW",
            last_news: "LATEST NEWS"
        },
        footer: {
            about: 'Passionate about football, community, and fair play.',
            links: 'Links',
            contact: 'Contact',
            language: 'Language'
        },
        notices: {
            manage: 'Manage news',
        },
        matches: {
            manage: 'Manage matches',
            empty: 'No matches available.'
        },
        login: {
            title: 'Log in',
            email: 'Email',
            password: 'Password',
            remember: 'Remember me',
            forgot: 'Forgot your password?',
            continue: 'Continue'
        },
        forgot: {
            title: 'Forgot Password',
            description: 'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.',
            email: 'Email',
            send: 'Email Password Reset Link'
        },
        register: {
            title: 'Register',
            name: 'Name',
            email: 'Email',
            password: 'Password',
            password_confirmation: 'Confirm password',
            login_link: 'Already have an account?',
            submit: 'Sign up'
        },
        shop: {
            home: 'Home',
            unknown_category: 'Unknown category',
            exit: 'Leave the shop',
            exit_short: 'Exit',
            profile: 'Profile',
            logout: 'Log out',
            categories: {
                camisetas: 'Shirts',
                pantalones: 'Pants',
                accesorios: 'Accessories',
            },
            cart: {
                title: 'Your cart',
                item_count: '{{count}} Item(s)',
                empty: 'Your cart is empty',
                view_products: 'View products',
                size: 'Size',
                total: 'Total:',
                continue_shopping: 'Continue Shopping',
                checkout: 'Checkout',
                label: 'Cart'
            },
            checkout: {
                title: 'Checkout',
                error_required: 'Select address and payment method.',
                error_toast: 'Missing required information.',
                success: 'Order placed successfully!',
                error: 'Error processing the order.',
                back: 'Back',
                section: {
                personal: 'Personal information',
                address: 'Shipping address',
                payment: 'Payment method',
                summary: 'Order summary'
                },
                name: 'Name',
                email: 'Email',
                select_address: 'Select an address',
                no_addresses: 'You have no addresses.',
                add_address: 'Add',
                select_payment: 'Select a payment method',
                no_payments: 'No payment methods available.',
                pay: 'Pay',
                size: 'Size',
                quantity: 'Quantity',
                total: 'Total: €{{amount}}'
            }
        },
        profile: {
            title: 'Profile',
            back: 'Back',
            orders: 'View my orders',
            addresses: {
                title: 'Saved addresses',
                none: 'You don’t have any addresses yet.',
                edit: 'Edit',
                delete: 'Delete address',
                confirm_delete: 'Are you sure you want to delete this address?',
                delete_error: 'There was an error deleting the address.',
                created: 'Address created',
                form: {
                    placeholders: {
                        street: 'Street, Apt, Unit',
                        city: 'City',
                        province: 'Province/State',
                        country: 'Country',
                        zip: 'Postal code',
                    },
                    main: 'Is this the main address?',
                    submit_create: 'Add address',
                    submit_update: 'Update address',
                    cancel: 'Cancel'
                }               
            },
            password: {
                title: 'Update Password',
                description: 'Ensure your account is using a long, random password to stay secure.',
                current: 'Current Password',
                new: 'New Password',
                confirm: 'Confirm Password',
                save: 'Save',
                saved: 'Saved.'
            },
            info: {
                title: 'Profile Information',
                description: 'Update your profile information and email address.',
                name: 'Name',
                email: 'Email',
                verify_notice: 'Your email address is unverified.',
                verify_button: 'Click here to re-send the verification email.',
                verify_sent: 'A new verification link has been sent to your email address.',
                save: 'Save',
                saved: 'Saved.'
            },
            delete: {
                title: 'Delete Account',
                description:
                'Once your account is deleted, all of its resources and data will be permanently deleted. Please download any data or information you wish to retain.',
                button: 'Delete Account',
                confirm_title: 'Are you sure you want to delete your account?',
                confirm_description:
                'Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you want to permanently delete your account.',
                password_label: 'Password',
                password_placeholder: 'Password',
                cancel: 'Cancel',
                confirm_button: 'Delete Account'
            }
        }
      }
    }
  }
});

export default i18n;
