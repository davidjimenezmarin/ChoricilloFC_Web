// Tipos TS para la aplicación, describiendo entidades y relaciones clave
// Asegura tipado estricto, legibilidad y autocompletado en IDE

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string; // Fecha de verificación del email, puede ser undefined si no ha verificado
    is_admin?: boolean;          // Indica si el usuario tiene permisos de administrador (opcional)
    is_player?: boolean;         // Indica si el usuario es jugador (opcional)
}

export type ShippingAddress = {
    id: number;
    street: string;
    city: string;
    province: string;
    country: string;
    zip_code: string;
    main: boolean;               // Marca esta dirección como principal para el usuario
}

export type PaymentMethod = {
    id: number;
    name: string;
    description: string;
}

export type Order = {
    id: number;
    user_id: number;
    status?: 'pending' | 'completed' | 'cancelled';  // Estado actual del pedido
    total_amount: number;                            // Importe total monetario del pedido
    details: OrderDetail[];                          // Lista de items detallados en el pedido
    order_date?: string;                             // Fecha del pedido (opcional)
    payment_method?: PaymentMethod;                  // Método de pago asociado (opcional)
    shipping_address?: ShippingAddress;              // Dirección de envío asociada (opcional)
};

export type OrderDetail = {
    size: string;           // Talla seleccionada del producto
    id: number;
    order_id: number;       // Relación con el pedido padre
    product_id: number;     // Identificador del producto
    quantity: number;       // Cantidad solicitada
    unit_price: number;     // Precio unitario del producto en el pedido
    product: Product;       // Referencia al objeto producto completo
};

export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    slug?: string;          // Slug para URL amigable, opcional
    image?: string;         // Imagen principal del producto, opcional
    image_detail?: string;  // Imagen detallada para vista individual, opcional
    size?: ProductSize;     // Talla del producto (S, M, L, XL), puede ser undefined
    stock: boolean;         // Estado de disponibilidad en inventario
};

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | undefined;

export interface Category {
    id: number;
    name: string;
    slug: string;           // Slug amigable para URL
}

export interface Player {
    id: number;
    name: string;
    surname: string;
    position: string;       // Posición del jugador en el campo (e.g., defensa, portero)
    number: number;         // Número dorsal que porta el jugador
    image: string;          // URL o path a la imagen del jugador
    slug?: string;          // Slug para URL amigable, opcional
}

export interface Notice {
    id: number;
    title: string;
    short_description: string;
    description: string;
    image: string;
    date: string;           // Fecha de publicación o creación de la noticia
    slug: string;           // Slug amigable para URL
}

export interface ProductsByCategory {
    [categoryId: string]: Product[];   // Mapeo entre id de categoría y lista de productos pertenecientes
}

type MatchPlayer = {
    id: number;
    player: Player;           // Referencia al jugador
    is_starter: boolean;      // Indica si fue titular en el partido
    minutes_played: number;   // Minutos jugados en el partido
    goals: number;            // Goles anotados
    assists: number;          // Asistencias realizadas
    yellow_cards: number;     // Tarjetas amarillas recibidas
    red_cards: number;        // Tarjetas rojas recibidas
};

export interface Match {
    id: number;
    date: string;
    home_team: string;
    away_team: string;
    home_team_score: number | null;  // Goles equipo local, puede ser null si no hay marcador
    away_team_score: number | null;  // Goles equipo visitante, puede ser null si no hay marcador
    location: string | null;          // Lugar donde se juega el partido, null si no definido
    status: 'scheduled' | 'in_progress' | 'completed'; // Estado del partido
    slug?: string;                   // Slug para URL amigable, opcional
    players_match: MatchPlayer[];    // Estadísticas y participaciones de jugadores en este partido
}

export type Highlights = {
    top_scorer: Player;           // Jugador con más goles globales
    scorer_of_the_month: Player;  // Jugador con más goles en el mes actual
    most_booked: Player;          // Jugador con más amonestaciones (tarjetas)
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;             // Usuario autenticado actual
    };
    cart: Order;                // Carrito o pedido en curso
    addresses: ShippingAddress[]; // Direcciones del usuario
    methods: PaymentMethod[];     // Métodos de pago disponibles
    notices: Notice[];            // Noticias para mostrar
    highlights: Highlights;       // Destacados (goleadores, amonestados, etc)
};
