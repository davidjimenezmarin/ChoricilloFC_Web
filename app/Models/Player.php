<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Player extends Model
{
    use SoftDeletes, HasFactory;
    
    protected $fillable = [
        'name',
        'surname',
        'number',
        'position',
        'image',
        'slug'
    ];

    public function matchParticipations()
    {
        return $this->hasMany(MatchPlayer::class, 'player_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($player) {
            $baseSlug = \Illuminate\Support\Str::slug($player->name . ' ' . $player->surname);
            $slug = $baseSlug;
            $count = 1;

            while (Player::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }

            $player->slug = $slug;
        });
    }
}
