import { ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';
export default function BaseLayout({ children, titulo }: { children: ReactNode; titulo?: string }) {
  const auth = usePage<PageProps>().props.auth;
  const { url } = usePage();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex flex-row justify-between items-center h-auto w-auto bg-[#191919] text-white p-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <ApplicationLogo className="w-16 h-auto fill-current hover:opacity-80 sm:w-40 sm:h-40" />
          </Link>
        </div>

        <h1 className="text-lg font-bold text-center sm:mr-10 sm:text-3xl">{titulo}</h1>

        {auth?.user ? (
          <Link
            href={route('shop')}
            className="text-md sm:text-lg rounded-md px-3 py-2 text-white/90 ring-1 ring-white transition hover:text-white/50 hover:ring-white/50 focus:outline-none focus-visible:ring-[#FF2D20]"
          >
            {t('layout.store')}
          </Link>
        ) : (
          <div className="flex items-center sm:space-x-4">
            <Link
              href={route('register')}
              className="text-sm sm:text-lg rounded-md px-3 py-2 text-white/90 sm:ring-1 ring-white transition hover:text-white/50 hover:ring-white/50"
            >
              {t('layout.register')}
            </Link>
            <Link
              href={route('login')}
              className="text-sm sm:text-lg rounded-md px-3 py-2 text-white/90 sm:ring-1 ring-white transition hover:text-white/50 hover:ring-white/50"
            >
              {t('layout.login')}
            </Link>
          </div>
        )}
      </header>

      <nav className="flex flex-row justify-start pr-8 gap-2 shadow-sm">
        <Link
          href={route('notices')}
          className={`text-md sm:text-xl px-3 py-2 text-black/90 border-b-2 transition
            ${url.startsWith('/notices') ? 'border-gray-500 text-gray-500' : 'border-transparent hover:border-black/50 hover:text-black/50'}`}
        >
          {t('layout.news')}
        </Link>
        <Link
          href={route('team')}
          className={`text-md sm:text-xl px-3 py-2 text-black/90 border-b-2 transition
            ${url.startsWith('/team') ? 'border-gray-500 text-gray-500' : 'border-transparent hover:border-black/50 hover:text-black/50'}`}
        >
          {t('layout.team')}
        </Link>
        <Link
          href={route('matches')}
          className={`text-md sm:text-xl px-3 py-2 text-black/90 border-b-2 transition
            ${url.startsWith('/matches') ? 'border-gray-500 text-gray-500' : 'border-transparent hover:border-black/50 hover:text-black/50'}`}
        >
          {t('layout.matches')}
        </Link>
      </nav>

      <main className="flex-grow p-2 bg-slate-50">{children}</main>

        <Footer />
      
    </div>
  );
}
