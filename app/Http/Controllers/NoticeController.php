<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notice;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class NoticeController extends Controller
{
    /**
     * Muestra el listado completo de noticias.
     *
     * @return \Inertia\Response Vista con todas las noticias disponibles.
     */
    public function index()
    {
        $notices = Notice::all();

        return Inertia::render('Notices', [
            'notices' => $notices,
        ]);
    }

    /**
     * Muestra el detalle de una noticia específica, identificada por su slug.
     *
     * @param string $slug Identificador único legible de la noticia.
     * @return \Inertia\Response Vista del detalle de la noticia.
     */
    public function show($slug)
    {
        $notice = Notice::where('slug', $slug)->firstOrFail();

        return Inertia::render('NoticeDetail', [
            'notice' => $notice,
        ]);
    }

    /**
     * Vista de gestión administrativa de noticias.
     *
     * @return \Inertia\Response Página del panel de administración con todas las noticias.
     */
    public function manage()
    {
        $notices = Notice::all();

        return Inertia::render('Admin/NoticesManage', [
            'notices' => $notices,
        ]);
    }

    /**
     * Elimina una noticia de la base de datos.
     *
     * @param Notice $notice Instancia de la noticia a eliminar.
     * @return \Illuminate\Http\RedirectResponse Redirección a la vista de gestión con mensaje.
     */
    public function destroy(Notice $notice)
    {
        $notice->delete();

        return redirect()->route('notices.manage')->with('success', 'Noticia eliminada correctamente');
    }

    /**
     * Muestra el formulario de creación de noticias.
     *
     * @return \Inertia\Response Vista del formulario para crear una nueva noticia.
     */
    public function create()
    {
        return Inertia::render('Admin/CreateNotice');
    }

    /**
     * Muestra el formulario de edición de una noticia existente.
     *
     * @param Notice $notice Noticia a editar.
     * @return \Inertia\Response Vista del formulario con datos cargados.
     */
    public function edit(Notice $notice)
    {
        return Inertia::render('Admin/EditNotice', [
            'notice' => $notice,
        ]);
    }

    /**
     * Procesa y almacena una nueva noticia en la base de datos.
     *
     * @param Request $request Datos recibidos desde el formulario de creación.
     * @return \Illuminate\Http\RedirectResponse Redirección con mensaje de éxito.
     */
    public function store(Request $request)
    {
        // Validación de campos obligatorios y tipos
        $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Creación de la instancia de noticia
        $notice = new Notice();
        $notice->title = $request->title;
        $notice->short_description = $request->short_description;
        $notice->description = $request->description;
        $notice->date = $request->date;

        // Si se sube imagen, se guarda en storage/public/recursos/notices
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('/recursos/notices', 'public');
            $notice->image = $path;
        }

        $notice->save();

        return redirect()->route('notices.manage')->with('success', 'Noticia creada correctamente');
    }

    /**
     * Actualiza una noticia existente, con posibilidad de reemplazar la imagen.
     *
     * @param Request $request Datos del formulario de edición.
     * @param Notice $notice Noticia a modificar.
     * @return \Illuminate\Http\RedirectResponse Redirección tras guardar cambios.
     */
    public function update(Request $request, Notice $notice)
    {
        // Validación de datos editables
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

        // Si hay una nueva imagen, se elimina la anterior y se guarda la nueva
        if ($request->hasFile('image')) {
            // Eliminar imagen anterior si existe
            if ($notice->image && Storage::disk('public')->exists($notice->image)) {
                Storage::disk('public')->delete($notice->image);
            }

            // Guardar imagen nueva con UUID único
            $path = $request->file('image')->storeAs(
                'recursos/notices',
                Str::uuid() . '.' . $request->file('image')->extension(),
                'public'
            );

            $notice->image = $path;
        }

        $notice->save();

        return redirect()->route('notices.manage')->with('success', 'Noticia actualizada correctamente');
    }
}
