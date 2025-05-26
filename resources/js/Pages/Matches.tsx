// Componente funcional Matches que muestra la lista de partidos disponibles.
// Recibe un array de partidos (matches) como prop para renderizar.
// Obtiene la información del usuario autenticado mediante Inertia usePage.
// Usa i18n para traducción de textos en la UI.
// Renderiza el layout base con título dinámico y el contenido principal con:
// - Botón de gestión visible solo para admins, redirigiendo a la gestión de partidos.
// - Mensaje cuando no hay partidos para mostrar.
// - Grid responsive que renderiza cada partido con el componente GameCard.

import React from 'react';
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
    // Obtiene la información de autenticación y el usuario actual
    const { auth } = usePage().props;
    // Hook para traducción i18n
    const { t } = useTranslation();
    
    return (
        <BaseLayout titulo={t('layout.matches')}>
            {/* Establece el título HTML de la página */}
            <Head title="Partidos" />
            
            <div className="max-w-7xl mx-auto p-4 mt-8">
                {/* Botón para la gestión de partidos, visible solo para admins */}
                {auth?.user?.is_admin ? (
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('matches.manage')}
                            className="inline-flex items-center px-4 py-2 bg-gray-950 text-white rounded hover:bg-gray-700 transition"
                        >
                            {t('matches.manage')}
                        </Link>
                    </div>
                ) : null}

                {/* Mensaje cuando no hay partidos */}
                {matches.length === 0 ? (
                    <p className="text-center text-gray-600">{t('matches.empty')}</p>
                ) : (
                    // Grid responsive para mostrar partidos en cards
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
