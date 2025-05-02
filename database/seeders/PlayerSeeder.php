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
                'name' => 'Gerardo',
                'surname' => 'Martínez',
                'number' => 2,
                'position' => 'Forward',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Adrián',
                'surname' => 'Zatorre',
                'number' => 4,
                'position' => 'Midfielder',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Juan',
                'surname' => 'García',
                'number' => 5,
                'position' => 'Midfielder',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Javier',
                'surname' => 'Ciriano',
                'number' => 7,
                'position' => 'Forward',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Pablo',
                'surname' => 'García',
                'number' => 8,
                'position' => 'Defender',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Kevin Iván',
                'surname' => 'Fernández',
                'number' => 9,
                'position' => 'Midfielder',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Manuel',
                'surname' => 'Revilla',
                'number' => 10,
                'position' => 'Forward',
                'image' => 'player_default.png',
            ],
            [
                'name' => 'Javier',
                'surname' => 'Revilla',
                'number' => 11,
                'position' => 'Forward',
                'image' => 'player_default.png',   
            ],
            [
                'name' => 'Raúl',
                'surname' => 'Lavilla',
                'number' => 13,
                'position' => 'Goalkeeper',
                'image' => 'player_default.png',   
            ],
            [
                'name' => 'Daniel',
                'surname' => 'Pallas',
                'number' => 14,
                'position' => 'Defender',
                'image' => 'player_default.png',   
            ],
            [
                'name' => 'Víctor',
                'surname' => 'Barrera',
                'number' => 19,
                'position' => 'Defender',
                'image' => 'player_default.png',   
            ],
            [
                'name' => 'Luis',
                'surname' => 'Gil',
                'number' => 22,
                'position' => 'Defender',
                'image' => 'player_default.png',   
            ],
            [
                'name' => 'David',
                'surname' => 'Barrera',
                'number' => 28,
                'position' => 'Midfielder',
                'image' => 'player_default.png',   
            ],
            [
                'name' => 'Borja',
                'surname' => 'Sarnago',
                'number' => 64,
                'position' => 'Defender',
                'image' => 'player_default.png',   
            ],
            [
                'name' => 'Manuel',
                'surname' => 'Marco',
                'number' => 77,
                'position' => 'Forward',
                'image' => 'player_default.png',   
            ],
            [
                'name' => 'Oscar',
                'surname' => 'Herrera',
                'number' => 82,
                'position' => 'Midfielder',
                'image' => 'player_default.png',   
            ],
            [
                'name' => 'Jorge',
                'surname' => 'Miranda',
                'number' => 92,
                'position' => 'Defender',
                'image' => 'player_default.png',   
            ],
        ];

        foreach ($players as $player) {
            \App\Models\Player::create($player);
        }
    }
}
