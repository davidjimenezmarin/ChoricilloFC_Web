<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MatchPlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $match_players = [
            [
                'game_id' => 1,
                'player_id' => 1,
                'is_starter' => true,
                'minutes_played' => 90,
                'goals' => 2,
                'assists' => 1,
                'yellow_cards' => 0,
                'red_cards' => 0,
            ],
            [
                'game_id' => 1,
                'player_id' => 2,
                'is_starter' => true,
                'minutes_played' => 90,
                'goals' => 0,
                'assists' => 1,
                'yellow_cards' => 1,
                'red_cards' => 0,
            ],
            [
                'game_id' => 1,
                'player_id' => 3,
                'is_starter' => false,
                'minutes_played' => 30,
                'goals' => 0,
                'assists' => 0,
                'yellow_cards' => 0,
                'red_cards' => 0,
            ],
            [
                'game_id' => 2,
                'player_id' => 1,
                'is_starter' => true,
                'minutes_played' => 90,
                'goals' => 1,
                'assists' => 0,
                'yellow_cards' => 0,
                'red_cards' => 0,
            ],
            [
                'game_id' => 2,
                'player_id' => 4,
                'is_starter' => true,
                'minutes_played' => 90,
                'goals' => 0,
                'assists' => 1,
                'yellow_cards' => 0,
                'red_cards' => 0,
            ],
            [
                'game_id' => 2,
                'player_id' => 5,
                'is_starter' => false,
                'minutes_played' => 20,
                'goals' => 0,
                'assists' => 0,
                'yellow_cards' => 1,
                'red_cards' => 0,
            ],
            [
                'game_id' => 1,
                'player_id' => 6,
                'is_starter' => true,
                'minutes_played' => 80,
                'goals' => 1,
                'assists' => 0,
                'yellow_cards' => 1,
                'red_cards' => 0,
            ],
            [
                'game_id' => 1,
                'player_id' => 7,
                'is_starter' => true,
                'minutes_played' => 85,
                'goals' => 0,
                'assists' => 2,
                'yellow_cards' => 0,
                'red_cards' => 0,
            ],
            [
                'game_id' => 2,
                'player_id' => 6,
                'is_starter' => false,
                'minutes_played' => 30,
                'goals' => 0,
                'assists' => 0,
                'yellow_cards' => 0,
                'red_cards' => 1,
            ],
            [
                'game_id' => 3,
                'player_id' => 8,
                'is_starter' => true,
                'minutes_played' => 90,
                'goals' => 2,
                'assists' => 1,
                'yellow_cards' => 0,
                'red_cards' => 0,
            ],
            [
                'game_id' => 3,
                'player_id' => 9,
                'is_starter' => true,
                'minutes_played' => 90,
                'goals' => 0,
                'assists' => 1,
                'yellow_cards' => 1,
                'red_cards' => 0,
            ],
            [
                'game_id' => 4,
                'player_id' => 10,
                'is_starter' => true,
                'minutes_played' => 90,
                'goals' => 0,
                'assists' => 0,
                'yellow_cards' => 0,
                'red_cards' => 1,
            ],
        ];

        foreach ($match_players as $match_player) {
            \App\Models\MatchPlayer::create($match_player);
        }
    }
}
