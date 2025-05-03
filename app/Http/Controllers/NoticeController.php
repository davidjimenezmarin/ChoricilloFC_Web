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

    public function show($slug)
    {
        $notice = Notice::where('slug', $slug)->firstOrFail();

        return Inertia::render('NoticeDetail', [
            'notice' => $notice,
        ]);
    }

    public function manage()
    {
        $notices = Notice::all();
        return Inertia::render('Admin/NoticesManage', [
            'notices' => $notices,
        ]);
    }

    public function destroy(Notice $notice)
    {
        $notice->delete();
        return redirect()->route('notices.manage')->with('success', 'Noticia eliminada correctamente');
    }

    public function create()
    {
        return Inertia::render('Admin/CreateNotice');
    }

    public function edit(Notice $notice)
    {
        return Inertia::render('Admin/EditNotice', [
            'notice' => $notice,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $notice = new Notice();
        $notice->title = $request->title;
        $notice->short_description = $request->short_description;
        $notice->description = $request->description;
        $notice->date = $request->date;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('notices', 'public');
            $notice->image = $path;
        }

        $notice->save();

        return redirect()->route('notices.manage')->with('success', 'Noticia creada correctamente');
    }

    public function update(Request $request, Notice $notice)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $notice->title = $request->title;
        $notice->short_description = $request->short_description;
        $notice->description = $request->description;
        $notice->date = $request->date;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('notices', 'public');
            $notice->image = $path;
        }

        $notice->save();

        return redirect()->route('notices.manage')->with('success', 'Noticia actualizada correctamente');
    }
}
