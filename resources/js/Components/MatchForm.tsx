import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Match, Player } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';

type Props = {
    match?: Match | null;
    players: Player[];  // todos los jugadores disponibles para seleccionar
    onSuccessRoute: string;
};

const FormMatch: React.FC<Props> = ({ match, players, onSuccessRoute }) => {
    const isEditMode = !!match;

    const { data, setData, post, put, processing, errors } = useForm<{
        date: string;
        home_team: string;
        away_team: string;
        home_team_score: number | string;
        away_team_score: number | string;
        location: string;
        status: string;
        stats: {
            player_id: number;
            is_starter: boolean;
            minutes_played: number | string;
            goals: number | string;
            assists: number | string;
            yellow_cards: number | string;
            red_cards: number | string;
        }[];
    }>({
        date: match?.date || '',
        home_team: match?.home_team || '',
        away_team: match?.away_team || '',
        home_team_score: match?.home_team_score ?? '',
        away_team_score: match?.away_team_score ?? '',
        location: match?.location || '',
        status: match?.status || 'scheduled',
        stats: players.map((p) => {
            const existingStat = match?.players_match?.find((pm: any) => pm.player.id === p.id);
            return {
                player_id: p.id,
                is_starter: existingStat ? existingStat.is_starter : false,
                minutes_played: existingStat ? existingStat.minutes_played : '',
                goals: existingStat ? existingStat.goals : '',
                assists: existingStat ? existingStat.assists : '',
                yellow_cards: existingStat ? existingStat.yellow_cards : '',
                red_cards: existingStat ? existingStat.red_cards : '',
            };
        }),
    });
    
    useEffect(() => {
        const newStats = players.map((p) => {
            const existingStat = match?.players_match?.find((pm: any) => pm.player.id === p.id);
            return {
                player_id: p.id,
                is_starter: existingStat ? existingStat.is_starter : false,
                minutes_played: existingStat ? existingStat.minutes_played : '',
                goals: existingStat ? existingStat.goals : '',
                assists: existingStat ? existingStat.assists : '',
                yellow_cards: existingStat ? existingStat.yellow_cards : '',
                red_cards: existingStat ? existingStat.red_cards : '',
            };
        });
        setData((prev) => ({ ...prev, stats: newStats }));
    }, [players, match]);
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            onSuccess: () => window.location.href = route(onSuccessRoute),
        };

        if (isEditMode) {
            post(route('matches.update', match!.id), options);
        } else {
            post(route('matches.store'), options);
        }
    };

    const handleStatChange = (index: number, field: string, value: any) => {
        const updatedStats = [...data.stats];
        updatedStats[index] = {
            ...updatedStats[index],
            [field]: value,
        };
        setData('stats', updatedStats);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos básicos */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Fecha</label>
                <input
                    type="date"
                    value={data.date}
                    onChange={(e) => setData('date', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Equipo Local</label>
                    <input
                        type="text"
                        value={data.home_team}
                        onChange={(e) => setData('home_team', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.home_team && <p className="text-red-500 text-sm mt-1">{errors.home_team}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Equipo Visitante</label>
                    <input
                        type="text"
                        value={data.away_team}
                        onChange={(e) => setData('away_team', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.away_team && <p className="text-red-500 text-sm mt-1">{errors.away_team}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Goles Local</label>
                    <input
                        type="number"
                        value={data.home_team_score}
                        onChange={(e) => setData('home_team_score', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Goles Visitante</label>
                    <input
                        type="number"
                        value={data.away_team_score}
                        onChange={(e) => setData('away_team_score', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Ubicación</label>
                    <input
                        type="text"
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Estado</label>
                <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="scheduled">Programado</option>
                    <option value="in_progress">En juego</option>
                    <option value="completed">Finalizado</option>
                </select>
            </div>

            {/* Estadísticas de jugadores */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas de Jugadores</h3>
                <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                    {data.stats.map((stat, index) => {
                        const player = players.find((p) => p.id === stat.player_id);
                        return (
                            <div key={stat.player_id} className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{player?.name} {player?.surname}</p>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={stat.is_starter}
                                            onChange={(e) => handleStatChange(index, 'is_starter', e.target.checked)}
                                        />
                                        Titular
                                    </label>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                                    <div>
                                        {isEditMode && <label className="block text-gray-700 mb-1 text-xs">Minutos</label>}
                                        <input
                                            type="number"
                                            placeholder={!isEditMode ? 'Minutos' : ''}
                                            value={stat.minutes_played}
                                            onChange={(e) => handleStatChange(index, 'minutes_played', e.target.value)}
                                            className="w-full px-3 py-1 border rounded"
                                        />
                                    </div>
                                    <div>
                                        {isEditMode && <label className="block text-gray-700 mb-1 text-xs">Goles</label>}
                                        <input
                                            type="number"
                                            placeholder={!isEditMode ? 'Goles' : ''}
                                            value={stat.goals}
                                            onChange={(e) => handleStatChange(index, 'goals', e.target.value)}
                                            className="w-full px-3 py-1 border rounded"
                                        />
                                    </div>
                                    <div>
                                        {isEditMode && <label className="block text-gray-700 mb-1 text-xs">Asistencias</label>}
                                        <input
                                            type="number"
                                            placeholder={!isEditMode ? 'Asistencias' : ''}
                                            value={stat.assists}
                                            onChange={(e) => handleStatChange(index, 'assists', e.target.value)}
                                            className="w-full px-3 py-1 border rounded"
                                        />
                                    </div>
                                    <div>
                                        {isEditMode && <label className="block text-gray-700 mb-1 text-xs">Amarillas</label>}
                                        <input
                                            type="number"
                                            placeholder={!isEditMode ? 'Amarillas' : ''}
                                            value={stat.yellow_cards}
                                            onChange={(e) => handleStatChange(index, 'yellow_cards', e.target.value)}
                                            className="w-full px-3 py-1 border rounded"
                                        />
                                    </div>
                                    <div>
                                        {isEditMode && <label className="block text-gray-700 mb-1 text-xs">Rojas</label>}
                                        <input
                                            type="number"
                                            placeholder={!isEditMode ? 'Rojas' : ''}
                                            value={stat.red_cards}
                                            onChange={(e) => handleStatChange(index, 'red_cards', e.target.value)}
                                            className="w-full px-3 py-1 border rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            {/* Botón */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isEditMode ? 'Guardar cambios' : 'Crear partido'}
                </button>
            </div>
        </form>
    );
};

export default FormMatch;
