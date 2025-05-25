<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Notice extends Model
{
    use SoftDeletes, HasFactory;

    /**
     * Atributos que se pueden asignar de forma masiva.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'short_description',
        'description',
        'image',
        'date',
        'slug',
    ];

    /**
     * Método boot del modelo.
     * Se utiliza para generar automáticamente el slug basado en el título,
     * tanto en la creación como en la actualización del modelo.
     *
     * Esto asegura que si no se proporciona un slug manualmente,
     * se derive uno automáticamente desde el título.
     */
    protected static function boot()
    {
        parent::boot();

        // Al crear, si no hay slug, se genera a partir del título
        static::creating(function ($notice) {
            if (empty($notice->slug)) {
                $notice->slug = Str::slug($notice->title);
            }
        });

        // Al actualizar, si el slug sigue vacío, se regenera desde el título
        static::updating(function ($notice) {
            if (empty($notice->slug)) {
                $notice->slug = Str::slug($notice->title);
            }
        });
    }
}
