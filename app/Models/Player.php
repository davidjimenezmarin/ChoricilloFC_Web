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
    ];

    public function matchParticipations()
    {
        return $this->hasMany(MatchPlayer::class, 'player_id');
    }
}
