import React from 'react';
import { Head } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import { Match } from '@/types';
import GameCard from '@/Components/GameCard';
import { usePage } from '@inertiajs/react';
import {Link} from '@inertiajs/react';

type Props = {
    matches: Match[];
};

const Matches: React.FC<Props> = ({ matches }) => {
        const { auth } = usePage().props;
    
    return (
        <BaseLayout titulo="Partidos">
            <Head title="Partidos" />
            <div className="max-w-7xl mx-auto p-4 mt-8">
                {auth?.user?.is_admin ? (
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('matches.manage')}
                            className="inline-flex items-center px-4 py-2 bg-gray-950 text-white rounded hover:bg-gray-700 transition"
                        >
                            Gestionar partidos
                        </Link>
                    </div>
                ):null}
                {matches.length === 0 ? (
                    <p className="text-center text-gray-600">No hay partidos disponibles.</p>
                ) : (
                    <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matches.map((match) => (
                            <GameCard
                                key={match.id}
                                match={match}
                            />
                        ))}
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};

export default Matches;
