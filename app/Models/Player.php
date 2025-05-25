<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Player extends Model
{
    use SoftDeletes, HasFactory;

    /**
     * Atributos que se pueden asignar masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'number',
        'position',
        'image',
        'slug',
    ];

    /**
     * Relación uno a muchos con la tabla match_player.
     * Un jugador puede haber participado en múltiples partidos.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function matchParticipations()
    {
        return $this->hasMany(MatchPlayer::class, 'player_id');
    }

    /**
     * Método que se ejecuta automáticamente al crear una instancia del modelo.
     * Se encarga de generar un slug único basado en el nombre y apellido del jugador.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($player) {
            $baseSlug = Str::slug($player->name . ' ' . $player->surname);
            $slug = $baseSlug;
            $count = 1;

            // Garantiza la unicidad del slug
            while (Player::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }

            $player->slug = $slug;
        });
    }
}
