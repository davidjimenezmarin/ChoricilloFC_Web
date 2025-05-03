<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $table = 'matches';

    protected $fillable = [
        'date',
        'home_team',
        'away_team',
        'home_team_score',
        'away_team_score',
        'location',
        'status',
    ];

    
}
