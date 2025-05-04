import React from 'react';
import { Head, Link } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import { Player } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import { FaSquare, FaRegSquare } from 'react-icons/fa';

type GlobalStats = {
    total_minutes: number;
    total_goals: number;
    total_assists: number;
    total_yellow_cards: number;
    total_red_cards: number;
};

type MatchPlayerWithGame = {
    id: number;
    is_starter: boolean;
    minutes_played: number;
    goals: number;
    assists: number;
    yellow_cards: number;
    red_cards: number;
    game: {
        id: number;
        date: string;
        home_team: string;
        away_team: string;
        slug: string;
    };
};

type Props = {
    player: Player;
    globalStats: GlobalStats;
    matches: MatchPlayerWithGame[];
};

const PlayerDetail: React.FC<Props> = ({ player, globalStats, matches }) => {
    return (
        <BaseLayout titulo={`Jugador: ${player.name} ${player.surname}`}>
            <Head title={`Jugador: ${player.name}`} />
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 mt-8">
                <PrimaryButton className="w-auto mb-5" onClick={() => router.visit(route('team'))}>
                    Volver
                </PrimaryButton>

                {/* Info del jugador */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 text-center sm:text-left">
                    {player.image ? (
                        <img
                            src={`/recursos/${player.image}`}
                            alt={player.name}
                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-md"
                        />
                    ) : (
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-300 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white">
                            {player.name}
                        </div>
                    )}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{player.name} {player.surname}</h2>
                        <p className="text-gray-600">Dorsal: {player.number}</p>
                        <p className="text-gray-600 capitalize">Posición: {player.position}</p>
                    </div>
                </div>

                {/* Estadísticas globales */}
                <div className="mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Estadísticas Globales</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
                        <div>
                            <p className="text-lg font-bold">{globalStats.total_minutes ?? 0}</p>
                            <p className="text-gray-600 text-sm">Minutos</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">{globalStats.total_goals ?? 0}</p>
                            <p className="text-gray-600 text-sm">Goles</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">{globalStats.total_assists ?? 0}</p>
                            <p className="text-gray-600 text-sm">Asistencias</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">{globalStats.total_yellow_cards ?? 0}</p>
                            <p className="text-gray-600 text-sm flex justify-center items-center gap-1">
                                <FaSquare className="text-yellow-400" /> Amarillas
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">{globalStats.total_red_cards ?? 0}</p>
                            <p className="text-gray-600 text-sm flex justify-center items-center gap-1">
                                <FaSquare className="text-red-500" /> Rojas
                            </p>
                        </div>
                    </div>
                </div>

                {/* Estadísticas por partido */}
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Estadísticas por Partido</h3>
                    {matches.length === 0 ? (
                        <p className="text-gray-600">Este jugador no ha jugado ningún partido todavía.</p>
                    ) : (
                        <>
                            {/* Tabla para pantallas grandes */}
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm sm:text-base">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-2 sm:px-4 border-b text-left">Partido</th>
                                            <th className="py-2 px-2 sm:px-4 border-b text-left">Fecha</th>
                                            <th className="py-2 px-2 sm:px-4 border-b text-left">Min</th>
                                            <th className="py-2 px-2 sm:px-4 border-b text-left">Goles</th>
                                            <th className="py-2 px-2 sm:px-4 border-b text-left">Asist.</th>
                                            <th className="py-2 px-2 sm:px-4 border-b text-left"><FaSquare className="text-yellow-400"/></th>
                                            <th className="py-2 px-2 sm:px-4 border-b text-left"><FaSquare className="text-red-500"/></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {matches.map((mp) => (
                                            <tr key={mp.id} className="hover:bg-gray-50">
                                                <td className="py-2 px-2 sm:px-4 border-b">
                                                    <Link
                                                        href={route('match.show', mp.game.slug)}
                                                        className="text-blue-600 hover:underline text-sm sm:text-base"
                                                    >
                                                        {mp.game.home_team} vs {mp.game.away_team}
                                                    </Link>
                                                </td>
                                                <td className="py-2 px-2 sm:px-4 border-b">
                                                    {new Date(mp.game.date).toLocaleDateString('es-ES')}
                                                </td>
                                                <td className="py-2 px-2 sm:px-4 border-b">{mp.minutes_played}</td>
                                                <td className="py-2 px-2 sm:px-4 border-b">{mp.goals}</td>
                                                <td className="py-2 px-2 sm:px-4 border-b">{mp.assists}</td>
                                                <td className="py-2 px-2 sm:px-4 border-b">
                                                    {mp.yellow_cards}
                                                </td>
                                                <td className="py-2 px-2 sm:px-4 border-b ">
                                                    {mp.red_cards}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Vista tipo tarjeta para móviles */}
                            <div className="flex flex-col gap-4 sm:hidden">
                                {matches.map((mp) => (
                                    <Link href={route('match.show', mp.game.slug)} key={mp.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                                        <p
                                            className="text-gray-900 font-semibold block mb-2"
                                        >
                                            {mp.game.home_team} vs {mp.game.away_team}
                                        </p>
                                        <p className="text-gray-500 text-sm mb-2">
                                            {new Date(mp.game.date).toLocaleDateString('es-ES')}
                                        </p>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <p><span className="font-semibold">Min:</span> {mp.minutes_played}</p>
                                            <p><span className="font-semibold">Goles:</span> {mp.goals}</p>
                                            <p><span className="font-semibold">Asist.:</span> {mp.assists}</p>
                                            <p className="flex items-center gap-1">
                                                <FaSquare className="text-yellow-400" /> {mp.yellow_cards}
                                            </p>
                                            <p className="flex items-center gap-1">
                                                <FaSquare className="text-red-500" /> {mp.red_cards}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </BaseLayout>
    );
};

export default PlayerDetail;
