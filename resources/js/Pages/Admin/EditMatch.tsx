import React from 'react';
import { Head } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import MatchForm from '@/Components/MatchForm';
import { Match, Player } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
type Props = {
    match: Match; // El partido a editar (con players_match si quieres pasar stats)
    players: Player[];
};

const EditMatch: React.FC<Props> = ({ match, players }) => {
    return (
        <BaseLayout titulo={`Editar Partido: ${match.home_team} vs ${match.away_team}`}>
            <Head title="Editar Partido" />
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
            <PrimaryButton className="w-auto mb-3" onClick={() => router.visit(route('matches.manage'))}>
                Volver
            </PrimaryButton>
                <MatchForm match={match} players={players} onSuccessRoute="matches.manage" />
            </div>
        </BaseLayout>
    );
};

export default EditMatch;
