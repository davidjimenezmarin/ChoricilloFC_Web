import { Link } from '@inertiajs/react';
import { Match } from '@/types';

export default function GameCard({ match }: { match: Match }) {
    return (
        <Link
            href={route('match.show', match.slug)}
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
        </Link>
    );
}