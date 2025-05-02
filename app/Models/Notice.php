<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Testing\Fluent\Concerns\Has;

class Notice extends Model
{
    use SoftDeletes, HasFactory;
    
    protected $fillable = [
        'title',
        'short_description',
        'description',
        'image',
        'date',
    ];

}
