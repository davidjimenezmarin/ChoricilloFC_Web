<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Game extends Model
{
    use SoftDeletes, HasFactory;

    /**
     * Nombre de la tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'games';

    /**
     * Atributos que se pueden asignar masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'date',
        'home_team',
        'away_team',
        'home_team_score',
        'away_team_score',
        'location',
        'status',
        'slug',
    ];

    /**
     * Boot method del modelo.
     * Se usa para registrar eventos de ciclo de vida como la creación de registros.
     */
    protected static function boot()
    {
        parent::boot();

        // Evento que se ejecuta automáticamente al crear una instancia del modelo
        static::creating(function ($game) {
            // Se genera un slug único combinando los nombres de los equipos
            $baseSlug = Str::slug($game->home_team . '-' . $game->away_team);
            $slug = $baseSlug;
            $count = 1;

            // Si el slug ya existe en la BD, se le añade un sufijo incremental
            while (Game::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }

            $game->slug = $slug;
        });
    }

    /**
     * Relación uno-a-muchos: un partido tiene muchas participaciones de jugadores.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function playersMatch()
    {
        return $this->hasMany(MatchPlayer::class);
    }
}
