export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    is_admin?: boolean;
    is_player?: boolean;
}

export type ShippingAddress = {
    id: number;
    street: string;
    city: string;
    province: string;
    country: string;
    zip_code: string;
    main: boolean; // Indica si es la dirección principal
}

export type PaymentMethod = {
    id: number;
    name: string;
    description: string;
}

export type Order = {
    id: number;
    user_id: number;
    status?: 'pending' | 'completed' | 'cancelled'; // Estado de la orden
    total_amount: number;
    details: OrderDetail[]; // Array de items del carrito
    order_date?: string; // Fecha de la orden
    payment_method?: PaymentMethod; // Método de envío
    shipping_address?: ShippingAddress; // Dirección de envío
};

export type OrderDetail = {
    size: string;
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    product: Product; // Relación con el producto
};

export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    slug?: string;
    image?: string;
    image_detail?: string;
    size?: ProductSize; // Puede ser "S", "M", "L" o "XL"
    stock: boolean; // Nuevo campo como booleano
};

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | undefined;

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Player {
    id: number;
    name: string;
    surname: string;
    position: string;
    number: number;
    image: string;
  }

export interface Notice{
    id: number;
    title: string;
    short_description: string;
    description: string;
    image: string;
    date: string;
    slug: string;
}

export interface ProductsByCategory {
    [categoryId: string]: Product[];
}

type MatchPlayer = {
    id: number;
    player: Player;
    is_starter: boolean;
    minutes_played: number;
    goals: number;
    assists: number;
    yellow_cards: number;
    red_cards: number;
};

export interface Match  {
    id: number;
    date: string;
    home_team: string;
    away_team: string;
    home_team_score: number | null;
    away_team_score: number | null;
    location: string | null;
    status: 'scheduled' | 'in_progress' | 'completed';
    players_match: MatchPlayer[];
}


export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    cart: Order;
    addresses: ShippingAddress[];
    methods: PaymentMethod[];
    notices: Notice[];
    
};
