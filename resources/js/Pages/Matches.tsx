import React from 'react';
import { Head } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import { Match } from '@/types';

type Props = {
    matches: Match[];
};

const Matches: React.FC<Props> = ({ matches }) => {
    return (
        <BaseLayout titulo="Partidos">
            <Head title="Partidos" />
            <div className="max-w-7xl mx-auto p-4 mt-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Resultados y Partidos</h2>

                {matches.length === 0 ? (
                    <p className="text-center text-gray-600">No hay partidos disponibles.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matches.map((match) => (
                            <div
                                key={match.id}
                                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition"
                            >
                                <div className="mb-4 text-center">
                                    <p className="text-sm text-gray-500">
                                        {new Date(match.date).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                    <p className="text-xs text-gray-400">{match.location || 'Ubicación no especificada'}</p>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-center w-1/3">
                                        <p className="font-semibold text-gray-800">{match.home_team}</p>
                                    </div>
                                    <div className="text-center w-1/3">
                                        {match.status === 'completed' || match.status === 'in_progress' ? (
                                            <span className="text-2xl font-bold text-gray-900">
                                                {match.home_team_score} - {match.away_team_score}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 text-sm">Próximamente</span>
                                        )}
                                    </div>
                                    <div className="text-center w-1/3">
                                        <p className="font-semibold text-gray-800">{match.away_team}</p>
                                    </div>
                                </div>

                                <div className="text-center">
                                    {match.status === 'scheduled' && (
                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                                            Programado
                                        </span>
                                    )}
                                    {match.status === 'in_progress' && (
                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-full animate-pulse">
                                            En juego
                                        </span>
                                    )}
                                    {match.status === 'completed' && (
                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                            Finalizado
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};

export default Matches;
