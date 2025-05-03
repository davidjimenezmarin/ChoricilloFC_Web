import React, { useState } from 'react';
import { Player } from '@/types';
import { PlayerCard } from '@/Components/PlayerCard';
import { Head, Link } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';

type Props = {
    players: Player[];
};

const TeamManage: React.FC<Props> = ({ players }) => {
    const [search, setSearch] = useState('');

    // Agrupamos por posición
    const groupedPlayers = {
        Porteros: players.filter(p => p.position === 'Goalkeeper'),
        Defensas: players.filter(p => p.position === 'Defender'),
        Centrocampistas: players.filter(p => p.position === 'Midfielder'),
        Delanteros: players.filter(p => p.position === 'Forward'),
    };

    // Filtro global para nombre o número
    const filterPlayers = (list: Player[]) => {
        return list.filter((player) =>
            player.name.toLowerCase().includes(search.toLowerCase()) ||
            player.number?.toString().includes(search)
        );
    };

    return (
        <BaseLayout titulo="Gestionar Jugadores">
            <Head title="Gestionar Jugadores" />

            <div className="max-w-7xl mx-auto px-4 py-8 bg-white bg-opacity-90 rounded-lg shadow-lg mt-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Lista de Jugadores</h2>
                    <div className='flex flex-row gap-2'>
                        <Link
                            href={route('players.create')}
                            className="inline-flex items-center px-4 py-2 bg-transparent text-black rounded border-2 hover:bg-gray-950 transition hover:text-white border-gray-700"
                        >
                            Añadir Jugador
                        </Link>
                        <PrimaryButton className="w-auto" onClick={() => router.visit(route('team'))}>
                            Volver
                        </PrimaryButton>
                    </div>
                </div>

                {/* Buscador */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o dorsal..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                {/* Listas por posición */}
                {Object.entries(groupedPlayers).map(([groupName, groupPlayers]) => {
                    const filtered = filterPlayers(groupPlayers);
                    if (filtered.length === 0) return null;

                    return (
                        <div key={groupName} className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">{groupName}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filtered.map((player) => (
                                    <div key={player.id} className="relative">
                                        <PlayerCard player={player} />
                                        <div className="absolute top-2 right-2 flex gap-2">
                                            <Link
                                                href={route('players.edit', player.id)}
                                                className="inline-flex items-center px-2 py-1 bg-yellow-400 text-sm text-white rounded hover:bg-yellow-500 transition"
                                            >
                                                Editar
                                            </Link>
                                            <Link
                                                href={route('players.destroy', player.id)}
                                                method="delete"
                                                as="button"
                                                className="inline-flex items-center px-2 py-1 bg-red-500 text-sm text-white rounded hover:bg-red-600 transition"
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
        </BaseLayout>
    );
};

export default TeamManage;
