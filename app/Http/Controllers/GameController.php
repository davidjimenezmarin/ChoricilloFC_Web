<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use Inertia\Inertia;
use App\Models\MatchPlayer;
use App\Models\Player;

class GameController extends Controller
{
    public function index()
    {
        $matches = Game::orderBy('date', 'desc')->get();

        return Inertia::render('Matches', [
            'matches' => $matches,
        ]);
    }

    public function show($id)
    {
        $game = Game::where('id', $id)
            ->firstOrFail();
        
        $players = $game->playersMatch()->with('player')->get();

        return Inertia::render('MatchDetail', [
            'game' => $game,
            'players' => $players,
        ]);
    }

    public function manage()
    {
        $matches = Game::all();
        return Inertia::render('Admin/MatchesManage', [
            'matches' => $matches,
        ]);
    }

    public function create()
    {
        $players = Player::all();  

        return Inertia::render('Admin/CreateMatch', [
            'players' => $players,  
        ]);
    }
    public function edit(Game $match)
    {
        $players = Player::all();
        $match->load(['playersMatch.player']);  

        return Inertia::render('Admin/EditMatch', [
            'match' => $match,
            'players' => $players,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'home_team' => 'required|string|max:255',
            'away_team' => 'required|string|max:255',
            'home_team_score' => 'nullable|integer',
            'away_team_score' => 'nullable|integer',
            'location' => 'nullable|string|max:255',
            'status' => 'required|in:scheduled,in_progress,completed',
            'stats' => 'array',
            'stats.*.player_id' => 'required|exists:players,id',
        ]);

        $game = Game::create([
            'date' => $request->date,
            'home_team' => $request->home_team,
            'away_team' => $request->away_team,
            'home_team_score' => $request->home_team_score,
            'away_team_score' => $request->away_team_score,
            'location' => $request->location,
            'status' => $request->status,
        ]);

        // Guardar las estadísticas usando game_id
        foreach ($request->stats as $stat) {
            if (!empty($stat['minutes_played']) && $stat['minutes_played'] > 0) {
                MatchPlayer::create([
                    'game_id' => $game->id,
                    'player_id' => $stat['player_id'],
                    'is_starter' => $stat['is_starter'] ?? false,
                    'minutes_played' => $stat['minutes_played'],
                    'goals' => $stat['goals'] ?? 0,
                    'assists' => $stat['assists'] ?? 0,
                    'yellow_cards' => $stat['yellow_cards'] ?? 0,
                    'red_cards' => $stat['red_cards'] ?? 0,
                ]);
            }
        }
        

        return redirect()->route('matches.manage')->with('success', 'Partido creado correctamente');
    }

    public function update(Request $request, Game $match)
    {
        $request->validate([
            'date' => 'required|date',
            'home_team' => 'required|string|max:255',
            'away_team' => 'required|string|max:255',
            'home_team_score' => 'nullable|integer',
            'away_team_score' => 'nullable|integer',
            'location' => 'nullable|string|max:255',
            'status' => 'required|in:scheduled,in_progress,completed',
            'stats' => 'array',
            'stats.*.player_id' => 'required|exists:players,id',
        ]);

        $match->update([
            'date' => $request->date,
            'home_team' => $request->home_team,
            'away_team' => $request->away_team,
            'home_team_score' => $request->home_team_score,
            'away_team_score' => $request->away_team_score,
            'location' => $request->location,
            'status' => $request->status,
        ]);

        // Aquí hacemos update o create de cada MatchPlayer usando game_id
        foreach ($request->stats as $stat) {
            MatchPlayer::updateOrCreate(
                [
                    'game_id' => $match->id,  // 👈 CAMBIO aquí
                    'player_id' => $stat['player_id'],
                ],
                [
                    'is_starter' => $stat['is_starter'] ?? false,
                    'minutes_played' => $stat['minutes_played'] ?? 0,
                    'goals' => $stat['goals'] ?? 0,
                    'assists' => $stat['assists'] ?? 0,
                    'yellow_cards' => $stat['yellow_cards'] ?? 0,
                    'red_cards' => $stat['red_cards'] ?? 0,
                ]
            );
        }

        return redirect()->route('matches.manage')->with('success', 'Partido actualizado correctamente');
    }

    public function destroy(Game $match)
    {
        $match->delete();
        return redirect()->route('matches.manage')->with('success', 'Partido eliminado correctamente');
    }
}
