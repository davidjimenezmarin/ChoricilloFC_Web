import BaseLayout from '@/Layouts/BaseLayout';
import { Head, Link } from '@inertiajs/react';
import PlayerForm from '@/Components/PlayerForm';

type Props = {
    positions: string[];
};

const CreatePlayer: React.FC<Props> = ({ positions }) => {
    return (
        <BaseLayout titulo="Crear Jugador">
            <Head title="Crear Jugador" />
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Añadir nuevo jugador</h2>
                    <Link
                        href={route('team.manage')}
                        className="text-blue-600 hover:underline"
                    >
                        Volver
                    </Link>
                </div>
                <PlayerForm positions={positions} onSuccessRoute="team.manage" />
            </div>
        </BaseLayout>
    );
};

export default CreatePlayer;
