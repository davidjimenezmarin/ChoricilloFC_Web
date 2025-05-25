<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;

class GameSeeder extends Seeder
{
    /**
     * Ejecuta la inserción de partidos en la base de datos.
     * Se insertan 11 partidos en total: 9 completados, 1 en progreso y 1 programado.
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
            [
                'date' => '2023-10-03 19:00:00',
                'home_team' => 'Team E',
                'away_team' => 'Team F',
                'home_team_score' => 1,
                'away_team_score' => 3,
                'location' => 'Stadium C',
                'status' => 'completed',
            ],
            [
                'date' => '2023-10-04 16:00:00',
                'home_team' => 'Team G',
                'away_team' => 'Team H',
                'home_team_score' => 2,
                'away_team_score' => 2,
                'location' => 'Stadium D',
                'status' => 'completed',
            ],
            [
                'date' => '2023-10-15 12:00:00',
                'home_team' => 'Team U',
                'away_team' => 'Team V',
                'home_team_score' => null,
                'away_team_score' => null,
                'location' => 'Stadium K',
                'status' => 'scheduled', 
            ],
        ];

        foreach ($matches as $match) {
            Game::create($match);
        }
    }
}
