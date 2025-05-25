import React from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { FaFutbol, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface HighlightsProps {
  top_scorer: Player;
  scorer_of_the_month: Player;
  most_booked: Player;
}

const playerCardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: 'spring',
      stiffness: 60,
    },
  }),
};

const HighlightsCard: React.FC<HighlightsProps> = ({ top_scorer, scorer_of_the_month, most_booked }) => {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: <FaFutbol className="text-yellow-400 text-2xl" />,
      label: t('highlights.top_scorer'),
      player: top_scorer,
    },
    {
      icon: <FaCalendarAlt className="text-blue-400 text-2xl" />,
      label: t('highlights.scorer_month'),
      player: scorer_of_the_month,
    },
    {
      icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
      label: t('highlights.most_booked'),
      player: most_booked,
    },
  ];

  return (
    <div className="bg-[#191919] text-white py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#c6aa76]">
        {t('highlights.title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {highlights.map((h, i) => (
          <motion.div
            key={h.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={playerCardVariant}
            className="bg-white text-black rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="mb-4 flex justify-center">{h.icon}</div>
            <h3 className="text-lg font-bold text-[#c6aa76] mb-1">{h.label}</h3>
            <div className="relative group w-28 h-28 mx-auto">
                <img
                    src={
                    h.player.image === 'player_default.png'
                        ? '/recursos/player_default.png'
                        : `/storage/${h.player.image}`
                    }
                    alt={h.player.name}
                    className="w-28 h-28 rounded-full object-cover border-2 border-[#c6aa76] shadow transition duration-300 group-hover:brightness-50"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-6xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {h.player.number}
                </span>
            </div>

            <p className="mt-3 font-semibold">{h.player.name} {h.player.surname}</p>
            <p className="text-sm text-gray-600 capitalize">{h.player.position}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HighlightsCard;
