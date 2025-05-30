import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Match } from '@/types';
import BaseLayout from '@/Layouts/BaseLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import { useState } from 'react';

type Props = {
    matches: Match[];
};

const MatchesManage: React.FC<Props> = ({ matches }) => {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este partido?')) {
            destroy(route('matches.destroy', id));
        }
    };

    const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
    
        const filteredMatches = matches.filter((match) => {
            const matchDate = new Date(match.date).getTime();
            const start = startDate ? new Date(startDate).getTime() : -Infinity;
            const end = endDate ? new Date(endDate).getTime() : Infinity;
            return matchDate >= start && matchDate <= end;
        });

    return (
        <BaseLayout titulo="Gestionar Partidos">
            <Head title="Gestionar Partidos" />
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Listado de Partidos</h2>
                    <div className='flex flex-row gap-2'>
                        <Link
                            href={route('matches.create')}
                            className="inline-flex items-center px-4 py-2 bg-transparent text-black rounded border-2 hover:bg-gray-950 transition hover:text-white border-gray-700"
                        >
                            Crear Partido
                        </Link>
                        <PrimaryButton className="w-auto" onClick={() => router.visit(route('matches'))}>
                            Volver
                        </PrimaryButton>
                    </div>
                </div>
                {/* Filtro por fechas */}
                <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="startDate" className="text-sm text-gray-600 mb-1">Desde:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="endDate" className="text-sm text-gray-600 mb-1">Hasta:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                {matches.length === 0 ? (
                    <p className="text-gray-600">No hay partidos todavía.</p>
                ) : (
                    <>
                        {/* Tabla para escritorio */}
                        <div className="overflow-x-auto hidden sm:block">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">Fecha</th>
                                        <th className="py-2 px-4 border-b text-left">Equipos</th>
                                        <th className="py-2 px-4 border-b text-left">Marcador</th>
                                        <th className="py-2 px-4 border-b text-left">Ubicación</th>
                                        <th className="py-2 px-4 border-b text-left">Estado</th>
                                        <th className="py-2 px-4 border-b text-left">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMatches.map((match) => (
                                        <tr key={match.id}>
                                            <td className="py-2 px-4 border-b">
                                                {new Date(match.date).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {match.home_team} vs {match.away_team}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {(match.home_team_score !== null && match.away_team_score !== null)
                                                    ? `${match.home_team_score} - ${match.away_team_score}`
                                                    : 'Pendiente'}
                                            </td>
                                            <td className="py-2 px-4 border-b">{match.location || '-'}</td>
                                            <td className="py-2 px-4 border-b capitalize">
                                                {match.status === 'completed' && (
                                                    <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                                        Finalizado
                                                    </span>
                                                )}
                                                {match.status === 'in_progress' && (
                                                    <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-full">
                                                        En juego
                                                    </span>
                                                )}
                                                {match.status === 'scheduled' && (
                                                    <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                                                        Programado
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b flex flex-wrap gap-2">
                                                <Link
                                                    href={route('matches.edit', match.id)}
                                                    className="inline-flex items-center px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition text-sm"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(match.id)}
                                                    disabled={processing}
                                                    className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm disabled:opacity-50"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Tarjetas para móviles */}
                        <div className="sm:hidden flex flex-col gap-4">
                            {filteredMatches.map((match) => (
                                <div key={match.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {match.home_team} vs {match.away_team}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(match.date).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                            <p className="text-sm text-gray-500">{match.location || '-'}</p>
                                        </div>
                                        <div className="text-lg font-bold text-gray-900">
                                            {(match.home_team_score !== null && match.away_team_score !== null)
                                                ? `${match.home_team_score} - ${match.away_team_score}`
                                                : 'Pendiente'}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        {match.status === 'completed' && (
                                            <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                                Finalizado
                                            </span>
                                        )}
                                        {match.status === 'in_progress' && (
                                            <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-full">
                                                En juego
                                            </span>
                                        )}
                                        {match.status === 'scheduled' && (
                                            <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                                                Programado
                                            </span>
                                        )}
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('matches.edit', match.id)}
                                                className="inline-flex items-center px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition text-sm"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(match.id)}
                                                disabled={processing}
                                                className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm disabled:opacity-50"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </BaseLayout>
    );
};

export default MatchesManage;
