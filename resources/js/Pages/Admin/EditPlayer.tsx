import BaseLayout from '@/Layouts/BaseLayout';
import { Head, Link } from '@inertiajs/react';
import PlayerForm from '@/Components/PlayerForm';
import { Player } from '@/types';

type Props = {
    player: Player;
    positions: string[];
};

const EditPlayer: React.FC<Props> = ({ player, positions }) => {
    return (
        <BaseLayout titulo={`Editar ${player.name}`}>
            <Head title={`Editar ${player.name}`} />
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Editar Jugador</h2>
                    <Link
                        href={route('team.manage')}
                        className="text-blue-600 hover:underline"
                    >
                        Volver
                    </Link>
                </div>
                <PlayerForm player={player} positions={positions} onSuccessRoute="team.manage" />
            </div>
        </BaseLayout>
    );
};

export default EditPlayer;
