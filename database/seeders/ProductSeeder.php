<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'category_id' => 1,
                'name' => 'Camiseta - Primera Equipación',
                'description' => 'Camiseta oficial de la Primera Equipación del ChoricilloFC',
                'price' => 25.00,
                'stock' => true,
                'image' => 'cami1.webp',
                'image_detail' => 'detalle1.webp',
            ],
            [
                'category_id' => 2,
                'name' => 'Pantaloneta - Primera Equipación',
                'description' => 'Pantaloneta oficial de la Primera Equipación del ChoricilloFC',
                'price' => 15.90,
                'stock' => true,
                'image' => 'panti1.webp',
                'image_detail' => 'panti1.webp',
            ],
            [
                'category_id' => 1,
                'name' => 'Camiseta - Segunda Equipación',
                'description' => 'Camiseta oficial de la Segunda Equipación del ChoricilloFC',
                'price' => 25.00,
                'stock' => true,
                'image' => 'cami2.webp',
                'image_detail' => 'detalle2.webp',
            ],
            [
                'category_id' => 2,
                'name' => 'Pantaloneta - Segunda Equipación',
                'description' => 'Pantaloneta oficial de la Segunda Equipación del ChoricilloFC',
                'price' => 15.90,
                'stock' => true,
                'image' => 'panti2.webp',
                'image_detail' => 'panti2.webp',
            ],
            [
                'category_id' => 1,
                'name' => 'Camiseta - Tercera Equipación',
                'description' => 'Camiseta oficial de la Tercera Equipación del ChoricilloFC',
                'price' => 25.00,
                'stock' => true,
                'image' => 'cami3.webp',
                'image_detail' => 'detalle3.webp',
            ],
            [
                'category_id' => 2,
                'name' => 'Pantaloneta - Tercera Equipación',
                'description' => 'Pantaloneta oficial de la Tercera Equipación del ChoricilloFC',
                'price' => 15.90,
                'stock' => true,
                'image' => 'panti3.webp',
                'image_detail' => 'panti3.webp',
            ],
            [
                'category_id' => 3,
                'name' => 'Balón',
                'description' => 'Balón oficial del ChoricilloFC',
                'price' => 25.00,
                'stock' => false,
                'size' => null,
                'image' => 'balon.jpg',
                'image_detail' => 'balon.jpg',
            ],
            [
                'category_id' => 1,
                'name' => 'Camiseta - Portero',
                'description' => 'Camiseta oficial de la Portero del ChoricilloFC',
                'price' => 25.00,
                'stock' => true,
                'image' => 'cami4.webp',
                'image_detail' => 'detalle4.webp',
            ],
            [
                'category_id' => 2,
                'name' => 'Pantaloneta - Portero',
                'description' => 'Pantaloneta oficial de la Portero del ChoricilloFC',
                'price' => 15.90,
                'stock' => true,
                'image' => 'panti4.webp',
                'image_detail' => 'panti4.webp',
            ],
            [
                'category_id' => 3,
                'name' => 'Medias - Primera Equipación',
                'description' => 'Medias oficiales de la Primera Equipación del ChoricilloFC',
                'price' => 10.00,
                'stock' => true,
                'image' => 'media1.webp',
                'image_detail' => 'media1.webp',
            ],
            [
                'category_id' => 3,
                'name' => 'Medias - Segunda Equipación',
                'description' => 'Medias oficiales de la Segunda Equipación del ChoricilloFC',
                'price' => 10.00,
                'stock' => true,
                'image' => 'media2.webp',
                'image_detail' => 'media2.webp',
            ],
            [
                'category_id' => 3,
                'name' => 'Medias - Tercera Equipación',
                'description' => 'Medias oficiales de la Tercera Equipación del ChoricilloFC',
                'price' => 10.00,
                'stock' => true,
                'image' => 'media3.webp',
                'image_detail' => 'media3.webp',
            ],
            [
                'category_id' => 3,
                'name' => 'Medias - Portero',
                'description' => 'Medias oficiales de la Portero del ChoricilloFC',
                'price' => 10.00,
                'stock' => true,
                'image' => 'media4.webp',
                'image_detail' => 'media4.webp',
            ],
            [
                'category_id' => 3,
                'name' => 'Gorra - ChoricilloFC',
                'description' => 'Gorra oficial del ChoricilloFC',
                'price' => 15.00,
                'stock' => true,
                'image' => 'gorra.webp',
                'image_detail' => 'gorra.webp',
            ],
            [
                'category_id' => 3,
                'name' => 'Bufanda - ChoricilloFC',
                'description' => 'Bufanda oficial del ChoricilloFC',
                'price' => 20.00,
                'stock' => true,
                'image' => 'bufanda.webp',
                'image_detail' => 'bufanda.webp',
            ]
            
        ];
        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
