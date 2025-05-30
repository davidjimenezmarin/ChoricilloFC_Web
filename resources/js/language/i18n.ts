import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'es', // Idioma por defecto
  fallbackLng: 'en',
  debug: true,
  resources: {
    es: {
      translation: {
        positions: {
            Goalkeeper: 'Portero',
            Defender: 'Defensa',
            Midfielder: 'Centrocampista',
            Forward: 'Delantero',
        },       
        date: {
          from: 'Desde',
          to: 'Hasta',  
        },     
        layout: {
            title: 'Mi Aplicación',
            login: 'Iniciar sesión',
            register: 'Regístrate',
            store: 'Tienda',
            news: 'Noticias',
            team: 'Equipo',
            matches: 'Partidos',
            copyright: 'Desarrollado por David Jiménez',
            ilustrated: 'Ilustrado por Alejandro Martinez',
        },
        team: {
            title: 'Equipo',
            goalkeepers: 'Porteros',
            defenders: 'Defensas',
            midfielders: 'Centrocampistas',
            forwards: 'Delanteros',
            manage: 'Gestionar jugadores'
        },
        highlights: {
            title: "Destacados del Equipo",
            top_scorer: "Máximo Goleador",
            scorer_month: "Goleador del Mes",
            most_booked: "Carnicero"
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
            last_news: "ÚLTIMAS NOTICIAS",
            next_match: "Próximo Partido"
        },
        footer: {
            about: 'Apasionados por el fútbol, la comunidad y el fair play.',
            links: 'Enlaces',
            contact: 'Contacto',
            language: 'Idioma'
        },
        notices: {
            manage: 'Gestionar noticias',
            share: 'Compartir',
        },
        matches: {
            title: "Partidos",
            no_player_data: 'Aún no hay datos de jugadores disponibles.',
            manage: 'Gestionar partidos',
            empty: 'No hay partidos disponibles.',
            no_location: "Ubicación no especificada",
            stats_title: "Estadísticas del partido",
            upcoming: "Próximamente",
            starter: "Titular",
            global_stats: 'Estadísticas Globales',
            game_stats: 'Estadísticas por Partido',
            status: {
                scheduled: "Programado",
                in_progress: "En juego",
                completed: "Finalizado"
            },
            table: {
                date: "Fecha",
                player: "Jugador",
                position: "Posición",
                minutes: "Minutos",
                goals: "Goles",
                assists: "Asistencias",
                yellow: "Amarillas",
                red: "Rojas"
            }
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
        orders: {
            title: 'Mis Pedidos',
            back: 'Volver',
            date: 'Fecha',
            address: 'Dirección',
            status: 'Estado',
            total: 'Total',
            payment_method: 'Método de pago',
            actions: 'Acciones',
            not_assigned: 'Aún no asignada',
            view_details: 'Ver Detalles',
        },
        order_details: {
            title: "Detalles del Pedido",
            header: "Información del Pedido",
            header_description: "Detalles generales del pedido.",
            id: "ID del Pedido",
            date: "Fecha",
            payment_method: "Método de Pago",
            shipping_address: "Dirección de Envío",
            products_title: "Productos",
            products_description: "Lista de productos incluidos en este pedido.",
            size: "Talla",
            subtotal: "Subtotal",
            total: "Total: €{{amount}}",
            back_to_orders: "Volver a Mis Pedidos"
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
        positions: {
            Goalkeeper: 'Goalkeeper',
            Defender: 'Defender',
            Midfielder: 'Midfielder',
            Forward: 'Forward',
        },
        date: {
            from: 'From',
            to: 'To',
        },
        layout: {
            title: 'My Application',
            login: 'Login',
            register: 'Register',
            store: 'Store',
            news: 'News',
            team: 'Team',
            matches: 'Matches',
            copyright: 'Developed by David Jiménez',
            ilustrated: 'Illustrated by Alejandro Martinez',
        },
        team: {
            title: 'Team',
            goalkeepers: 'Goalkeepers',
            defenders: 'Defenders',
            midfielders: 'Midfielders',
            forwards: 'Forwards',
            manage: 'Manage players'
        },
        highlights: {
            title: "Team Highlights",
            top_scorer: "Top Scorer",
            scorer_month: "Scorer of the Month",
            most_booked: "Butcher Player"
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
            last_news: "LATEST NEWS",
            next_match: "Next Match"
        },
        footer: {
            about: 'Passionate about football, community, and fair play.',
            links: 'Links',
            contact: 'Contact',
            language: 'Language'
        },
        notices: {
            manage: 'Manage news',
            share: 'Share',
        },
        matches: {
            title: "Matches",
            manage: 'Manage matches',
            no_player_data: 'No player data available yet.',
            empty: 'No matches available.',
            no_location: 'Location not specified',
            stats_title: "Match Statistics",
            starter: "Starter",
            upcoming: 'Coming soon',
            global_stats: 'Global Stats',
            game_stats: 'Stats by Game',
            status: {
                scheduled: 'Scheduled',
                in_progress: 'In progress',
                completed: 'Completed'
            },
            table: {
                date: "Date",
                player: "Player",
                position: "Position",
                minutes: "Minutes",
                goals: "Goals",
                assists: "Assists",
                yellow: "Yellow cards",
                red: "Red cards"
            }
            
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
        orders: {
            title: 'My Orders',
            back: 'Back',
            date: 'Date',
            address: 'Address',
            status: 'Status',
            total: 'Total',
            payment_method: 'Payment Method',
            actions: 'Actions',
            not_assigned: 'Not assigned yet',
            view_details: 'View Details',
        },
        order_details: {
            title: "Order Details",
            header: "Order Information",
            header_description: "General details of the order.",
            id: "Order ID",
            date: "Date",
            payment_method: "Payment Method",
            shipping_address: "Shipping Address",
            products_title: "Products",
            products_description: "List of products included in this order.",
            size: "Size",
            subtotal: "Subtotal",
            total: "Total: €{{amount}}",
            back_to_orders: "Back to My Orders"
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
    },
    fr: {
      translation: {
        positions: {
          Goalkeeper: 'Gardien de but',
          Defender: 'Défenseur',
          Midfielder: 'Milieu de terrain',
          Forward: 'Attaquant',
        },
        date: {
          from: 'De',
          to: 'À',
        },
        layout: {
          title: 'Mon Application',
          login: 'Connexion',
          register: "S'inscrire",
          store: 'Boutique',
          news: 'Actualités',
          team: 'Équipe',
          matches: 'Matchs',
          copyright: 'Développé par David Jiménez',
          ilustrated: 'Illustré par Alejandro Martinez',
        },
        team: {
          title: 'Équipe',
          goalkeepers: 'Gardiens',
          defenders: 'Défenseurs',
          midfielders: 'Milieux de terrain',
          forwards: 'Attaquants',
          manage: 'Gérer les joueurs',
        },
        highlights: {
          title: "Points forts de l'équipe",
          top_scorer: "Meilleur buteur",
          scorer_month: "Buteur du mois",
          most_booked: "Joueur le plus sanctionné",
        },
        welcome: {
          team: "Équipe",
          news: "Actualités",
          results: "Résultats",
          store: "Boutique",
          register: "Inscrivez-vous",
          main_team: "ÉQUIPE",
          main_team_desc: "Compétition au plus haut niveau de la MLA, voici les personnes qui rendent cela possible.",
          main_team_cta: "VOIR L'ÉQUIPE",
          main_news: "ACTUALITÉS",
          main_news_desc: "Ne manquez aucun détail de ce qui se passe sur et en dehors du terrain.",
          main_news_cta: "EN SAVOIR PLUS",
          main_results: "RÉSULTATS",
          main_results_desc: "Restez à jour avec chaque résultat et ressentez la passion du football à chaque match.",
          main_results_cta: "EN SAVOIR PLUS",
          main_shop: "NOTRE BOUTIQUE",
          main_shop_desc: "Pour ceux qui veulent représenter l'équipe à la maison, ne cherchez plus.",
          main_shop_cta: "ACHETEZ MAINTENANT",
          last_news: "DERNIÈRES NOUVELLES",
          next_match: "Prochain match",
        },
        footer: {
          about: 'Passionnés de football, de communauté et de fair-play.',
          links: 'Liens',
          contact: 'Contact',
          language: 'Langue',
        },
        notices: {
          manage: 'Gérer les actualités',
          share: 'Partager',
        },
        matches: {
          title: "Matchs",
          no_player_data: "Données des joueurs non disponibles pour le moment.",
          manage: 'Gérer les matchs',
          empty: 'Aucun match disponible.',
          no_location: "Lieu non spécifié",
          stats_title: "Statistiques du match",
          upcoming: "À venir",
          starter: "Titulaire",
          global_stats: 'Statistiques globales',
          game_stats: 'Statistiques par match',
          status: {
            scheduled: 'Programmé',
            in_progress: 'En cours',
            completed: 'Terminé',
          },
          table: {
            date: "Date",
            player: "Joueur",
            position: "Position",
            minutes: "Minutes",
            goals: "Buts",
            assists: "Passes décisives",
            yellow: "Cartons jaunes",
            red: "Cartons rouges",
          },
        },
        login: {
          title: 'Connexion',
          email: 'E-mail',
          password: 'Mot de passe',
          remember: 'Se souvenir de moi',
          forgot: 'Mot de passe oublié ?',
          continue: 'Continuer',
        },
        forgot: {
          title: 'Mot de passe oublié',
          description: 'Mot de passe oublié ? Pas de problème. Indiquez simplement votre e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
          email: 'E-mail',
          send: 'Envoyer le lien de réinitialisation',
        },
        register: {
          title: 'Inscription',
          name: 'Nom',
          email: 'E-mail',
          password: 'Mot de passe',
          password_confirmation: 'Confirmez le mot de passe',
          login_link: 'Vous avez déjà un compte ?',
          submit: "S'inscrire",
        },
        shop: {
          home: 'Accueil',
          unknown_category: 'Catégorie inconnue',
          exit: 'Quitter la boutique',
          exit_short: 'Quitter',
          profile: 'Profil',
          logout: 'Déconnexion',
          categories: {
            camisetas: 'Maillots',
            pantalones: 'Pantalons',
            accesorios: 'Accessoires',
          },
          cart: {
            title: 'Votre panier',
            item_count: '{{count}} article(s)',
            empty: 'Votre panier est vide',
            view_products: 'Voir les produits',
            size: 'Taille',
            total: 'Total :',
            continue_shopping: 'Continuer vos achats',
            checkout: 'Passer à la caisse',
            label: 'Panier',
          },
          checkout: {
            title: 'Paiement',
            error_required: 'Veuillez sélectionner une adresse et un mode de paiement.',
            error_toast: 'Informations requises manquantes.',
            success: 'Commande passée avec succès !',
            error: 'Erreur lors du traitement de la commande.',
            back: 'Retour',
            section: {
              personal: 'Informations personnelles',
              address: 'Adresse de livraison',
              payment: 'Mode de paiement',
              summary: 'Résumé de la commande',
            },
            name: 'Nom',
            email: 'E-mail',
            select_address: 'Sélectionnez une adresse',
            no_addresses: "Vous n'avez pas d'adresses.",
            add_address: 'Ajouter',
            select_payment: 'Sélectionnez un mode de paiement',
            no_payments: "Aucun mode de paiement disponible.",
            pay: 'Payer',
            size: 'Taille',
            quantity: 'Quantité',
            total: 'Total : €{{amount}}',
          },
        },
        orders: {
          title: 'Mes commandes',
          back: 'Retour',
          date: 'Date',
          address: 'Adresse',
          status: 'Statut',
          total: 'Total',
          payment_method: 'Mode de paiement',
          actions: 'Actions',
          not_assigned: 'Pas encore assigné',
          view_details: 'Voir les détails',
        },
        order_details: {
          title: "Détails de la commande",
          header: "Informations sur la commande",
          header_description: "Détails généraux de la commande.",
          id: "ID de la commande",
          date: "Date",
          payment_method: "Mode de paiement",
          shipping_address: "Adresse de livraison",
          products_title: "Produits",
          products_description: "Liste des produits inclus dans cette commande.",
          size: "Taille",
          subtotal: "Sous-total",
          total: "Total : €{{amount}}",
          back_to_orders: "Retour à mes commandes",
        },
        profile: {
          title: 'Profil',
          back: 'Retour',
          orders: 'Voir mes commandes',
          addresses: {
            title: 'Adresses enregistrées',
            none: "Vous n'avez pas encore d'adresses.",
            edit: 'Modifier',
            delete: 'Supprimer l’adresse',
            confirm_delete: 'Êtes-vous sûr de vouloir supprimer cette adresse ?',
            delete_error: "Une erreur s'est produite lors de la suppression de l'adresse.",
            created: 'Adresse créée',
            form: {
              placeholders: {
                street: 'Rue, étage, appartement',
                city: 'Ville',
                province: 'Province/État',
                country: 'Pays',
                zip: 'Code postal',
              },
              main: 'Est-ce l’adresse principale ?',
              submit_create: 'Ajouter une adresse',
              submit_update: 'Mettre à jour l’adresse',
              cancel: 'Annuler',
            },
          },
          password: {
            title: 'Mettre à jour le mot de passe',
            description: 'Assurez-vous d’utiliser un mot de passe long et aléatoire pour sécuriser votre compte.',
            current: 'Mot de passe actuel',
            new: 'Nouveau mot de passe',
            confirm: 'Confirmer le mot de passe',
            save: 'Enregistrer',
            saved: 'Enregistré.',
          },
          info: {
            title: 'Informations du profil',
            description: 'Mettez à jour les informations de votre profil et votre adresse e-mail.',
            name: 'Nom',
            email: 'E-mail',
            verify_notice: 'Votre adresse e-mail n’est pas vérifiée.',
            verify_button: 'Cliquez ici pour renvoyer l’e-mail de vérification.',
            verify_sent: 'Un nouveau lien de vérification a été envoyé à votre adresse e-mail.',
            save: 'Enregistrer',
            saved: 'Enregistré.',
          },
          delete: {
            title: 'Supprimer le compte',
            description:
              'Une fois votre compte supprimé, toutes ses ressources et données seront définitivement supprimées. Veuillez télécharger toute information que vous souhaitez conserver.',
            button: 'Supprimer le compte',
            confirm_title: 'Êtes-vous sûr de vouloir supprimer votre compte ?',
            confirm_description:
              'Une fois votre compte supprimé, toutes ses ressources et données seront définitivement supprimées. Veuillez saisir votre mot de passe pour confirmer cette action.',
            password_label: 'Mot de passe',
            password_placeholder: 'Mot de passe',
            cancel: 'Annuler',
            confirm_button: 'Supprimer le compte',
          },
        },
      }
    }
  }
});

export default i18n;
