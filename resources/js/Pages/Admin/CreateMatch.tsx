import React from 'react';
import { Head } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import MatchForm from '@/Components/MatchForm'; 
import { Player } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton'; 
import { router } from '@inertiajs/react';
type Props = {
    players: Player[]; // Todos los jugadores disponibles
};

const CreateMatch: React.FC<Props> = ({ players }) => {
    return (
        <BaseLayout titulo="Crear Partido">
            <Head title="Crear Partido" />
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
                <PrimaryButton className="w-auto mb-4" onClick={() => router.visit(route('matches.manage'))}>
                    Volver
                </PrimaryButton>
                <MatchForm players={players} onSuccessRoute="matches.manage" />
            </div>
        </BaseLayout>
    );
};

export default CreateMatch;
