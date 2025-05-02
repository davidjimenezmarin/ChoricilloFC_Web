<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $players = [
            [
                'name' => 'Lionel',
                'surname' => 'Messi',
                'number' => 10,
                'position' => 'Forward',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Cristiano',
                'surname' => 'Ronaldo',
                'number' => 7,
                'position' => 'Forward',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Kylian',
                'surname' => 'Mbappé',
                'number' => 7,
                'position' => 'Forward',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Kevin',
                'surname' => 'De Bruyne',
                'number' => 17,
                'position' => 'Midfielder',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Virgil',
                'surname' => 'van Dijk',
                'number' => 4,
                'position' => 'Defender',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Manuel',
                'surname' => 'Neuer',
                'number' => 1,
                'position' => 'Goalkeeper',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Sadio',
                'surname' => 'Mané',
                'number' => 10,
                'position' => 'Forward',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Sergio',
                'surname' => 'Ramos',
                'number' => 4,
                'position' => 'Defender',
                'image' => 'player_default.png',   
            ],
            
        ];

        foreach ($players as $player) {
            \App\Models\Player::create($player);
        }
    }
}
