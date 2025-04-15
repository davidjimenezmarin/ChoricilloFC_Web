<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Testing\Fluent\Concerns\Has;

class ShippingAddress extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'street',
        'city',
        'province',
        'country',
        'zip_code',
        'main',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->hasOne(Order::class);
    }
}
