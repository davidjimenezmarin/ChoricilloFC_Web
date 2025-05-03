<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Testing\Fluent\Concerns\Has;
use Illuminate\Support\Str;

class Notice extends Model
{
    use SoftDeletes, HasFactory;
    
    protected $fillable = [
        'title',
        'short_description',
        'description',
        'image',
        'date',
        'slug',
    ];

    protected static function boot()
{
    parent::boot();

    static::creating(function ($notice) {
        if (empty($notice->slug)) {
            $notice->slug = Str::slug($notice->title);
        }
    });

    static::updating(function ($notice) {
        if (empty($notice->slug)) {
            $notice->slug = Str::slug($notice->title);
        }
    });
}

}
