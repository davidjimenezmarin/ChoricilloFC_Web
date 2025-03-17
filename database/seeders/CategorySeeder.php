<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Camisetas',
                'description' => 'Producto de ropa',
            ],
            [
                'name' => 'Pantalones',
                'description' => 'Producto de ropa',
            ],
            [
                'name' => 'Accesorios',
                'description' => 'Producto de ropa',
            ],
        ];
        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }
    }
}
