<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ShippingAddress;

class User extends Authenticatable implements MustVerifyEmail
{
    /** Utiliza las fábricas para pruebas y la funcionalidad de notificaciones y borrado lógico */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * Atributos asignables en masa.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'is_player',
    ];

    /**
     * Atributos ocultos al serializar el modelo.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Relación uno a muchos: un usuario puede tener múltiples órdenes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Relación uno a muchos: un usuario puede tener múltiples direcciones de envío.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function addresses()
    {
        return $this->hasMany(ShippingAddress::class);
    }

    /**
     * Conversión de atributos para el modelo.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Verifica si el usuario tiene rol de administrador.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->is_admin;
    }

    /**
     * Verifica si el usuario tiene rol de jugador.
     *
     * @return bool
     */
    public function isPlayer(): bool
    {
        return $this->is_player;
    }
}
