import React from 'react';
import {Player} from '@/types/index';
import {PlayerCard} from '@/Components/PlayerCard';
import { Head, Link } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';

type Props = {
  players: Player[];
};

const TeamSection: React.FC<Props> = ({ players }) => {
    const goalkeepers = players.filter(player => player.position === 'Goalkeeper');
    const defenders = players.filter(player => player.position === 'Defender');
    const midfielders = players.filter(player => player.position === 'Midfielder');
    const forwards = players.filter(player => player.position === 'Forward');

  return (
    <BaseLayout titulo="Equipo">
        <section className="py-10 bg-cover bg-center h-full w-full">
        <Head title="Equipo" />
        <div className="max-w-7xl mx-auto px-4 bg-white bg-opacity-80 rounded-lg shadow-lg py-8">
          {goalkeepers.length > 0 && (  
            <>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Porteros</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {goalkeepers.map(player => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </>
          )}

          {defenders.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Defensas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {defenders.map(player => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </>
          )}

          {midfielders.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Centrocampistas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {midfielders.map(player => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </>
          )}

          {forwards.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Delanteros</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {forwards.map(player => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </BaseLayout>
  );
};

export default TeamSection;
