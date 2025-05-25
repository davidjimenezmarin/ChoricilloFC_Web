import React from 'react';
import BaseLayout from '@/Layouts/BaseLayout';
import { Head } from '@inertiajs/react';
import { Match } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import { useTranslation } from 'react-i18next';

type Props = {
    game: Match;
    players?: any[];
};

const MatchDetail: React.FC<Props> = ({ game, players }) => {
    const {i18n, t } = useTranslation();

    return (
        <BaseLayout>
            <Head title={`${t('matches.title')}: ${game.home_team} vs ${game.away_team}`} />
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
                <PrimaryButton className="w-auto mb-3" onClick={() => window.history.back()}>
                    {t('profile.back')}
                </PrimaryButton>

                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {game.home_team} vs {game.away_team}
                    </h2>
                    <p className="text-gray-500 text-sm mb-1">
                        {new Date(game.date).toLocaleDateString(i18n.language, {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {game.location || t('matches.no_location')}
                    </p>
                    <div className="mt-4">
                        {game.status === 'completed' && (
                            <p className="text-3xl font-bold text-gray-900">
                                {game.home_team_score} - {game.away_team_score}
                            </p>
                        )}
                        {game.status === 'in_progress' && (
                            <span className="inline-block px-3 py-1 text-sm font-semibold text-orange-800 bg-orange-100 rounded-full animate-pulse">
                                {t('matches.status.in_progress')}
                            </span>
                        )}
                        {game.status === 'scheduled' && (
                            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                                {t('matches.status.scheduled')}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('matches.stats_title')}</h3>
                    {players?.length === 0 ? (
                        <p className="text-gray-600">{t('matches.no_player_data')}</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg hidden sm:table">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">{t('matches.table.player')}</th>
                                        <th className="py-2 px-4 border-b text-left">{t('matches.table.position')}</th>
                                        <th className="py-2 px-4 border-b text-left">{t('matches.table.minutes')}</th>
                                        <th className="py-2 px-4 border-b text-left">{t('matches.table.goals')}</th>
                                        <th className="py-2 px-4 border-b text-left">{t('matches.table.assists')}</th>
                                        <th className="py-2 px-4 border-b text-left">{t('matches.table.yellow')}</th>
                                        <th className="py-2 px-4 border-b text-left">{t('matches.table.red')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {players?.map(pm => (
                                        <tr key={pm.id}>
                                            <td className="py-2 px-4 border-b flex items-center gap-2">
                                                <img
                                                    src={
                                                        pm.player.image === 'player_default.png'
                                                            ? '/recursos/player_default.png'
                                                            : `/storage/${pm.player.image}`
                                                    }
                                                    alt={pm.player.name}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <span>{pm.player.name} {pm.player.surname}</span>
                                                {pm.is_starter === 1 && (
                                                    <span className="ml-2 text-xs text-green-600">({t('matches.starter')})</span>
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">{pm.player.position}</td>
                                            <td className="py-2 px-4 border-b">{pm.minutes_played}</td>
                                            <td className="py-2 px-4 border-b">{pm.goals}</td>
                                            <td className="py-2 px-4 border-b">{pm.assists}</td>
                                            <td className="py-2 px-4 border-b">{pm.yellow_cards}</td>
                                            <td className="py-2 px-4 border-b">{pm.red_cards}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Vista móvil */}
                            <div className="sm:hidden flex flex-col gap-4">
                                {players?.map(pm => (
                                    <div key={pm.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <img
                                                src={
                                                    pm.player.image === 'player_default.png'
                                                        ? '/recursos/player_default.png'
                                                        : `/storage/${pm.player.image}`
                                                }
                                                alt={pm.player.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">{pm.player.name} {pm.player.surname}</p>
                                                <p className="text-sm text-gray-500">{pm.player.position}</p>
                                                {pm.is_starter && (
                                                    <span className="inline-block mt-1 text-xs text-green-600">({t('matches.starter')})</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                            <div><span className="font-semibold">{t('matches.table.minutes')}:</span> {pm.minutes_played}</div>
                                            <div><span className="font-semibold">{t('matches.table.goals')}:</span> {pm.goals}</div>
                                            <div><span className="font-semibold">{t('matches.table.assists')}:</span> {pm.assists}</div>
                                            <div><span className="font-semibold">{t('matches.table.yellow')}:</span> {pm.yellow_cards}</div>
                                            <div><span className="font-semibold">{t('matches.table.red')}:</span> {pm.red_cards}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </BaseLayout>
    );
};

export default MatchDetail;
