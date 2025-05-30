import React from 'react';
import { Player } from '../types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type Props = {
  player: Player;
};

export const PlayerCard: React.FC<Props> = ({ player }) => {
  const { t } = useTranslation();

  const imageUrl =
    player.image === 'player_default.png'
      ? '/recursos/player_default.png'
      : `/storage/${player.image}`;

  return (
    <Link href={route('player.show', player.slug)}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative overflow-hidden rounded-xl shadow-md border border-gray-200 bg-white hover:shadow-xl"
      >
        {/* Imagen con efecto de zoom */}
        <motion.div
          className="relative h-56 w-full overflow-hidden"
          whileHover="hover"
        >
          <motion.img
            src={imageUrl}
            alt={player.name}
            className="object-cover w-full h-full"
            variants={{
              hover: { scale: 1.08 },
              initial: { scale: 1 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Dorsal */}
          <div className="absolute top-3 left-3 bg-black/70 text-white text-sm sm:text-base md:text-lg px-3 py-1 rounded-full shadow font-bold tracking-widest">
            {player.number}
          </div>
        </motion.div>

        {/* Info jugador */}
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{player.name}</h3>
          <p className="text-gray-500 text-sm">{player.surname}</p>
          <p className="text-gray-600 text-sm capitalize">{t(`positions.${player.position}`)}</p>
        </div>
      </motion.div>
    </Link>
  );
};
