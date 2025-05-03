<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $matches = [
            [
                'date' => '2023-10-01 15:00:00',
                'home_team' => 'Team A',
                'away_team' => 'Team B',
                'home_team_score' => 2,
                'away_team_score' => 1,
                'location' => 'Stadium A',
                'status' => 'completed',
            ],
            [
                'date' => '2023-10-02 17:00:00',
                'home_team' => 'Team C',
                'away_team' => 'Team D',
                'home_team_score' => 0,
                'away_team_score' => 0,
                'location' => 'Stadium B',
                'status' => 'in_progress',
            ],
            // Add more matches as needed
        ];
        foreach ($matches as $match) {
            \App\Models\Game::create($match);
        }
    }
}
