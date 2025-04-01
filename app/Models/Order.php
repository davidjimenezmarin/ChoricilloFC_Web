<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = [
        'user_id', 
        'status',
        'total_amount',
        'payment_method_id',
        'order_date',
    ];

    public function details()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
