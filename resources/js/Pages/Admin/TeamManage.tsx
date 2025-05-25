import React, { useState } from 'react';
import { Player } from '@/types';
import { PlayerCard } from '@/Components/PlayerCard';
import { Head, Link, router } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import PrimaryButton from '@/Components/PrimaryButton';

type Props = {
    players: Player[];
};

const TeamManage: React.FC<Props> = ({ players }) => {
    const [search, setSearch] = useState('');

    const groupedPlayers = {
        Porteros: players.filter(p => p.position === 'Goalkeeper'),
        Defensas: players.filter(p => p.position === 'Defender'),
        Centrocampistas: players.filter(p => p.position === 'Midfielder'),
        Delanteros: players.filter(p => p.position === 'Forward'),
    };

    const filterPlayers = (list: Player[]) => {
        return list.filter((player) =>
            player.name.toLowerCase().includes(search.toLowerCase()) ||
            player.number?.toString().includes(search)
        );
    };

    return (
        <BaseLayout titulo="Gestionar Jugadores">
            <Head title="Gestionar Jugadores" />
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Gestión del Equipo</h2>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={route('players.create')}
                            className="px-4 py-2 border border-gray-700 text-black hover:bg-gray-900 hover:text-white rounded transition"
                        >
                            Añadir Jugador
                        </Link>
                        <PrimaryButton onClick={() => router.visit(route('team'))}>
                            Volver
                        </PrimaryButton>
                    </div>
                </div>

                {/* Buscador */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o dorsal..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                {/* Jugadores por posición */}
                <div className="space-y-10">
                    {Object.entries(groupedPlayers).map(([groupName, groupPlayers]) => {
                        const filtered = filterPlayers(groupPlayers);
                        if (filtered.length === 0) return null;

                        return (
                            <div key={groupName}>
                                <h3 className="text-xl font-semibold text-gray-700 mb-4">{groupName}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                                    {filtered.map((player) => (
                                        <div key={player.id} className="relative group">
                                            <PlayerCard player={player} />
                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={route('players.edit', player.id)}
                                                    className="px-2 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                                                >
                                                    Editar
                                                </Link>
                                                <Link
                                                    href={route('players.destroy', player.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="px-2 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                                                >
                                                    Eliminar
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </BaseLayout>
    );
};

export default TeamManage;
