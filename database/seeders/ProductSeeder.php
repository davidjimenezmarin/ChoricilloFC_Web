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
                'image' => 'image1.jpg',
            ],
            [
                'category_id' => 2,
                'name' => 'Pantaloneta - Primera Equipación',
                'description' => 'Pantaloneta oficial de la Primera Equipación del ChoricilloFC',
                'price' => 20.00,
                'image' => 'image2.jpg',
            ],
            // Add more products here
        ];
        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
