<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Atributos que pueden ser asignados masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'image',
        'size',
    ];

    /**
     * Relación inversa con la categoría a la que pertenece el producto.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relación uno a muchos con los detalles de pedidos.
     * Un producto puede estar en múltiples detalles de pedidos.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function details()
    {
        return $this->hasMany(OrderDetail::class);
    }

    /**
     * Método boot del modelo que se ejecuta automáticamente al crear una instancia.
     * Se encarga de generar un slug único para el producto basado en su nombre.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            $baseSlug = Str::slug($product->name);
            $slug = $baseSlug;
            $count = 1;

            // Se asegura que el slug generado sea único
            while (Product::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }

            $product->slug = $slug;
        });
    }
}
