<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use Inertia\Inertia;

class MatchController extends Controller
{
    public function index()
    {
        $matches = Game::orderBy('date', 'desc')->get();

        return Inertia::render('Matches', [
            'matches' => $matches,
        ]);
    }

    
}
