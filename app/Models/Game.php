<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Game extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = 'games';

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

    protected static function boot(){
        parent::boot();

        static::creating(function ($game) {
            $baseSlug = Str::slug($game->home_team . '-' . $game->away_team);
            $slug = $baseSlug;
            $count = 1;

            while (Game::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }

            $game->slug = $slug;
        });
    }
    
    public function playersMatch()
    {
        return $this->hasMany(MatchPlayer::class);
    }
}
