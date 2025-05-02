<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notice;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
class NoticeController extends Controller
{
    public function index()
    {
        $notices = Notice::all();

        return Inertia::render('Notices', [
            'notices' => $notices,
        ]);
    }
}
