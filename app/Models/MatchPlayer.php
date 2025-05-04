<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Testing\Fluent\Concerns\Has;

class MatchPlayer extends Model
{
    use SoftDeletes,HasFactory;

    protected $table = 'match_player';

    protected $fillable = [
        'game_id',
        'player_id',
        'is_starter',
        'minutes_played',
        'goals',
        'assists',
        'yellow_cards',
        'red_cards',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
    public function player()
    {
        return $this->belongsTo(Player::class);
    }
}
