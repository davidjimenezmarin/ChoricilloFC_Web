import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import { Match } from '@/types';
import GameCard from '@/Components/GameCard';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

type Props = {
    matches: Match[];
};

const Matches: React.FC<Props> = ({ matches }) => {
    const { auth } = usePage().props;
    const { t } = useTranslation();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredMatches = matches.filter((match) => {
        const matchDate = new Date(match.date).getTime();
        const start = startDate ? new Date(startDate).getTime() : -Infinity;
        const end = endDate ? new Date(endDate).getTime() : Infinity;
        return matchDate >= start && matchDate <= end;
    });

    return (
        <BaseLayout titulo={t('layout.matches')}>
            <Head title="Partidos" />

            <div className="max-w-7xl mx-auto p-4 mt-8">
                {auth?.user?.is_admin && (
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('matches.manage')}
                            className="inline-flex items-center px-4 py-2 bg-gray-950 text-white rounded hover:bg-gray-700 transition"
                        >
                            {t('matches.manage')}
                        </Link>
                    </div>
                )}

                {/* Filtro por fechas */}
                <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="startDate" className="text-sm text-gray-600 mb-1">{t('date.from')}</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="endDate" className="text-sm text-gray-600 mb-1">{t('date.to')}</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                {filteredMatches.length === 0 ? (
                    <p className="text-center text-gray-600">{t('matches.empty')}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMatches.map((match) => (
                            <GameCard key={match.id} match={match} />
                        ))}
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};

export default Matches;
