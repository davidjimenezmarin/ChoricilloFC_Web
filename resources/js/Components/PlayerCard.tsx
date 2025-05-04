import React from 'react';
import { Player } from '../types';
import { Link } from '@inertiajs/react';
type Props = {
  player: Player;
};

export const PlayerCard: React.FC<Props> = ({ player }) => {
  return (
    <Link href={route('player.show',player.slug) } className="bg-white shadow-xl  rounded-xl overflow-hidden border-2 border-gray-950 p-2">
      <img src={`/recursos/${player.image}`} alt={player.name} className="w-full h-56 object-cover rounded-xl" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{player.name}</h3>
        <p className="text-gray-500">{player.surname}</p>
        <p className="text-gray-600">{player.position}</p>
        <p className="text-gray-800 font-medium mt-2">#{player.number}</p>
      </div>
    </Link>
  );
};
