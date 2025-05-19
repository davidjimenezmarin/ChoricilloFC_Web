<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PlayerController extends Controller
{
    public function index(){
        $players = Player::all();

        return Inertia::render('Team', [
            'players' => $players,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
    public function create(){
        return Inertia::render('Admin/CreatePlayer', [
            'positions' => [
                'Goalkeeper',
                'Defense',
                'Midfielder',
                'Forward',
            ],
        ]);
    }
    public function edit(Player $player){
        return Inertia::render('Admin/EditPlayer', [
            'player' => $player,
            'positions' => [
                'Goalkeeper',
                'Defense',
                'Midfielder',
                'Forward',
            ],
        ]);
    }
    public function destroy(Player $player){
        $player->delete();
        return redirect()->route('team.manage')->with('success', 'Jugador eliminado correctamente');
    }
    public function manage()
    {
        $players = Player::all();
        return Inertia::render('Admin/TeamManage', [
            'players' => $players,
        ]);
    }
    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'number' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $player = new Player();
        $player->name = $request->name;
        $player->surname = $request->surname;
        $player->position = $request->position;
        $player->number = $request->number;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('/recursos/players', 'public');
            $player->image = $path;
        }

        $player->save();

        return redirect()->route('team.manage')->with('success', 'Jugador creado correctamente');
    }
    public function update(Request $request, Player $player){
        

        $player->name = $request->name;
        $player->surname = $request->surname;
        $player->position = $request->position;
        $player->number = $request->number;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('/recursos/players', 'public');
            $player->image = $imagePath;
        }

        $player->save();

        return redirect()->route('team.manage')->with('success', 'Jugador actualizado correctamente');
    }

    public function show($slug)
    {
        // Estadísticas globales sumadas
        $player = Player::where('slug', $slug)
            ->with(['matchParticipations.game'])
            ->firstOrFail();
        $globalStats = $player->matchParticipations()
            ->selectRaw('
                SUM(minutes_played) as total_minutes,
                SUM(goals) as total_goals,
                SUM(assists) as total_assists,
                SUM(yellow_cards) as total_yellow_cards,
                SUM(red_cards) as total_red_cards
            ')
            ->first();

        // Estadísticas por partido con la info del partido (Game)
        $matches = $player->matchParticipations()
            ->with('game')
            ->get()
            ->map(function ($mp) {
                return [
                    'id' => $mp->id,
                    'is_starter' => $mp->is_starter,
                    'minutes_played' => $mp->minutes_played,
                    'goals' => $mp->goals,
                    'assists' => $mp->assists,
                    'yellow_cards' => $mp->yellow_cards,
                    'red_cards' => $mp->red_cards,
                    'game' => [
                        'id' => $mp->game->id,
                        'date' => $mp->game->date,
                        'home_team' => $mp->game->home_team,
                        'away_team' => $mp->game->away_team,
                        'slug' => $mp->game->slug,
                    ],
                ];
            });

        return Inertia::render('PlayerDetail', [
            'player' => $player,
            'globalStats' => $globalStats,
            'matches' => $matches,
        ]);
    }
}
