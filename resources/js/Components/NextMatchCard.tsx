import React from 'react';
import { Link } from '@inertiajs/react';
import { Match } from '@/types/index';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

type NextMatchCardProps = {
  match: Match;
  t: (key: string) => string;
  locale: string;
};

const NextMatchCard: React.FC<NextMatchCardProps> = ({ match, t, locale }) => {
  const matchDate = new Date(match.date).toLocaleDateString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section className="max-w-4xl mx-auto my-12 p-6 rounded-lg bg-gradient-to-r from-[#191919] to-[#2c2c2c] text-[#c6aa76] shadow-2xl
      transform-gpu transition-transform duration-700 ease-in-out hover:scale-[1.05] hover:shadow-[0_0_25px_#c6aa76] hover:brightness-110
      animate-fadeIn">
      <h2 className="text-3xl font-extrabold mb-6 tracking-wide drop-shadow-md">
        {t('welcome.next_match')}
      </h2>

      <Link
        href={route('match.show', match.slug)}
        className="block bg-[#292929] rounded-lg shadow-lg p-6 cursor-pointer group relative overflow-hidden"
        aria-label={`${match.home_team} vs ${match.away_team}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-center sm:text-left">
            <span className="text-2xl font-semibold tracking-tight group-hover:text-[#f9e5a2] transition-colors duration-500">
              {match.home_team}
            </span>
            <span className="mx-3 text-3xl font-extrabold text-[#c6aa76] select-none">vs</span>
            <span className="text-2xl font-semibold tracking-tight group-hover:text-[#f9e5a2] transition-colors duration-500">
              {match.away_team}
            </span>
          </div>

          <div className="flex flex-col text-[#c6aa76]/80 text-sm sm:text-base gap-2 select-none">
            <time dateTime={match.date} className="flex items-center gap-2 font-mono tracking-wide">
              <FaCalendarAlt className="inline" />
              {matchDate}
            </time>
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="inline" />
              {match.location ?? t('matches.no_location')}
            </span>
          </div>
        </div>

        <div
          className="mt-4 text-right text-xs sm:text-sm font-bold uppercase tracking-widest text-[#f9e5a2] drop-shadow-lg select-none"
          aria-label="Match status"
        >
          {t(`matches.status.${match.status}`)}
        </div>

      </Link>
    </section>
  );
};

export default NextMatchCard;
