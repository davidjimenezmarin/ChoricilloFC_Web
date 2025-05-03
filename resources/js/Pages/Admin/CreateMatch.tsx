import React from 'react';
import { Head } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import MatchForm from '@/Components/MatchForm'; // Asegúrate de que la ruta sea correcta
import { Player } from '@/types';

type Props = {
    players: Player[]; // Todos los jugadores disponibles
};

const CreateMatch: React.FC<Props> = ({ players }) => {
    return (
        <BaseLayout titulo="Crear Partido">
            <Head title="Crear Partido" />
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
                <MatchForm players={players} onSuccessRoute="matches.manage" />
            </div>
        </BaseLayout>
    );
};

export default CreateMatch;
