<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PlayerController extends Controller
{
    /**
     * Muestra la lista de jugadores.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $players = Player::all();

        return Inertia::render('Team', [
            'players' => $players,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Muestra el formulario de creación de un nuevo jugador.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Admin/CreatePlayer', [
            'positions' => [
                'Goalkeeper',
                'Defense',
                'Midfielder',
                'Forward',
            ],
        ]);
    }

    /**
     * Muestra el formulario de edición de un jugador existente.
     *
     * @param Player $player
     * @return \Inertia\Response
     */
    public function edit(Player $player)
    {
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

    /**
     * Elimina un jugador del sistema.
     *
     * @param Player $player
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Player $player)
    {
        $player->delete();

        return redirect()->route('team.manage')->with('success', 'Jugador eliminado correctamente');
    }

    /**
     * Muestra la vista de administración del equipo.
     *
     * @return \Inertia\Response
     */
    public function manage()
    {
        $players = Player::all();

        return Inertia::render('Admin/TeamManage', [
            'players' => $players,
        ]);
    }

    /**
     * Guarda un nuevo jugador en la base de datos.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
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

        // Procesa y almacena la imagen si se proporciona
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('/recursos/players', 'public');
            $player->image = $path;
        }

        $player->save();

        return redirect()->route('team.manage')->with('success', 'Jugador creado correctamente');
    }

    /**
     * Actualiza los datos de un jugador existente.
     *
     * @param Request $request
     * @param Player $player
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Player $player)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'number' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $player->name = $request->name;
        $player->surname = $request->surname;
        $player->position = $request->position;
        $player->number = $request->number;

        // Reemplaza la imagen anterior si se carga una nueva
        if ($request->hasFile('image')) {
            if ($player->image && Storage::disk('public')->exists($player->image)) {
                Storage::disk('public')->delete($player->image);
            }

            $path = $request->file('image')->storeAs(
                'recursos/players',
                Str::uuid().'.'.$request->file('image')->extension(),
                'public'
            );

            $player->image = $path;
        }

        $player->save();

        return redirect()->route('team.manage')->with('success', 'Jugador actualizado correctamente');
    }

    /**
     * Muestra el detalle de un jugador incluyendo estadísticas agregadas y por partido.
     *
     * @param string $slug
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        // Carga el jugador con sus participaciones y los partidos relacionados
        $player = Player::where('slug', $slug)
            ->with(['matchParticipations.game'])
            ->firstOrFail();

        // Estadísticas globales agregadas del jugador
        $globalStats = $player->matchParticipations()
            ->selectRaw('
                SUM(minutes_played) as total_minutes,
                SUM(goals) as total_goals,
                SUM(assists) as total_assists,
                SUM(yellow_cards) as total_yellow_cards,
                SUM(red_cards) as total_red_cards
            ')
            ->first();

        // Datos por partido
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
