<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use Inertia\Inertia;
use App\Models\MatchPlayer;
use App\Models\Player;

class GameController extends Controller
{
    /**
     * Muestra todos los partidos ordenados por fecha descendente.
     *
     * @return \Inertia\Response Vista pública con listado de partidos.
     */
    public function index()
    {
        $matches = Game::orderBy('date', 'desc')->get();

        return Inertia::render('Matches', [
            'matches' => $matches,
        ]);
    }

    /**
     * Muestra el detalle de un partido específico con sus estadísticas de jugadores.
     *
     * @param string $slug Slug único del partido.
     * @return \Inertia\Response Vista con información del partido y jugadores involucrados.
     */
    public function show($slug)
    {
        $game = Game::where('slug', $slug)->firstOrFail();

        // Se obtienen las estadísticas de los jugadores del partido
        $players = $game->playersMatch()->with('player')->get();

        return Inertia::render('MatchDetail', [
            'game' => $game,
            'players' => $players,
        ]);
    }

    /**
     * Muestra el panel administrativo para gestionar los partidos.
     *
     * @return \Inertia\Response Vista con todos los partidos creados.
     */
    public function manage()
    {
        $matches = Game::all();

        return Inertia::render('Admin/MatchesManage', [
            'matches' => $matches,
        ]);
    }

    /**
     * Muestra el formulario de creación de un partido.
     *
     * @return \Inertia\Response Vista con listado de jugadores para asignar.
     */
    public function create()
    {
        $players = Player::all();

        return Inertia::render('Admin/CreateMatch', [
            'players' => $players,
        ]);
    }

    /**
     * Muestra el formulario de edición de un partido con sus estadísticas cargadas.
     *
     * @param Game $match Instancia del partido a editar.
     * @return \Inertia\Response Vista con datos precargados para edición.
     */
    public function edit(Game $match)
    {
        $players = Player::all();
        $match->load(['playersMatch.player']);

        return Inertia::render('Admin/EditMatch', [
            'match' => $match,
            'players' => $players,
        ]);
    }

    /**
     * Guarda un nuevo partido junto a sus estadísticas de jugadores.
     *
     * @param Request $request Datos del formulario de creación.
     * @return \Illuminate\Http\RedirectResponse Redirección tras guardar el partido.
     */
    public function store(Request $request)
    {
        $localGoals = 0;

        // Validaciones de los campos
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

        // Se crea el partido con marcador local temporal
        $game = Game::create([
            'date' => $request->date,
            'home_team' => $request->home_team,
            'away_team' => $request->away_team,
            'home_team_score' => 0,
            'away_team_score' => $request->away_team_score,
            'location' => $request->location,
            'status' => $request->status,
        ]);

        // Procesamiento de estadísticas de jugadores
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

                $localGoals += $stat['goals'] ?? 0;
            }
        }

        // Se actualiza el marcador local final
        $game->update(['home_team_score' => $localGoals]);

        return redirect()->route('matches.manage')->with('success', 'Partido creado correctamente');
    }

    /**
     * Actualiza la información de un partido y sus estadísticas.
     *
     * @param Request $request Datos recibidos del formulario de edición.
     * @param Game $match Partido a actualizar.
     * @return \Illuminate\Http\RedirectResponse Redirección con confirmación.
     */
    public function update(Request $request, Game $match)
    {
        $localGoals = 0;

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

        // Se actualiza el partido sin definir el marcador local
        $match->update([
            'date' => $request->date,
            'home_team' => $request->home_team,
            'away_team' => $request->away_team,
            'home_team_score' => 0,
            'away_team_score' => $request->away_team_score,
            'location' => $request->location,
            'status' => $request->status,
        ]);

        foreach ($request->stats as $stat) {
            if (!empty($stat['minutes_played']) && $stat['minutes_played'] > 0) {
                MatchPlayer::updateOrCreate(
                    [
                        'game_id' => $match->id,
                        'player_id' => $stat['player_id'],
                    ],
                    [
                        'is_starter' => $stat['is_starter'] ?? false,
                        'minutes_played' => $stat['minutes_played'],
                        'goals' => $stat['goals'] ?? 0,
                        'assists' => $stat['assists'] ?? 0,
                        'yellow_cards' => $stat['yellow_cards'] ?? 0,
                        'red_cards' => $stat['red_cards'] ?? 0,
                    ]
                );

                $localGoals += $stat['goals'] ?? 0;
            } else {
                // Si el jugador ya no participa (minutos = 0), eliminamos su participación
                MatchPlayer::where([
                    'game_id' => $match->id,
                    'player_id' => $stat['player_id'],
                ])->delete();
            }
        }

        // Se actualiza el marcador local con los nuevos goles
        $match->update(['home_team_score' => $localGoals]);

        return redirect()->route('matches.manage')->with('success', 'Partido actualizado correctamente');
    }

    /**
     * Elimina un partido y todas sus relaciones asociadas.
     *
     * @param Game $match Partido a eliminar.
     * @return \Illuminate\Http\RedirectResponse Redirección tras eliminación.
     */
    public function destroy(Game $match)
    {
        $match->delete();

        return redirect()->route('matches.manage')->with('success', 'Partido eliminado correctamente');
    }
}
