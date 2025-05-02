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
}
