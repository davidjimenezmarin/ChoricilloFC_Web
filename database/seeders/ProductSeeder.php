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
                'image' => 'cami1.jpg',
            ],
            [
                'category_id' => 2,
                'name' => 'Pantaloneta - Primera Equipación',
                'description' => 'Pantaloneta oficial de la Primera Equipación del ChoricilloFC',
                'price' => 25.00,
                'image' => 'panti1.jpg',
            ],
            [
                'category_id' => 1,
                'name' => 'Camiseta - Segunda Equipación',
                'description' => 'Camiseta oficial de la Segunda Equipación del ChoricilloFC',
                'price' => 25.00,
                'image' => 'cami2.jpg',
            ],
            [
                'category_id' => 2,
                'name' => 'Pantaloneta - Segunda Equipación',
                'description' => 'Pantaloneta oficial de la Segunda Equipación del ChoricilloFC',
                'price' => 25.00,
                'image' => 'panti2.jpg',
            ],
            [
                'category_id' => 1,
                'name' => 'Camiseta - Tercera Equipación',
                'description' => 'Camiseta oficial de la Tercera Equipación del ChoricilloFC',
                'price' => 25.00,
                'image' => 'cami3.jpg',
            ],
            [
                'category_id' => 2,
                'name' => 'Pantaloneta - Tercera Equipación',
                'description' => 'Pantaloneta oficial de la Tercera Equipación del ChoricilloFC',
                'price' => 25.00,
                'image' => 'panti3.jpg',
            ],
        ];
        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
