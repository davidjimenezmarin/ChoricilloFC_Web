import { Link } from '@inertiajs/react';
import  LanguageSwitcher  from '@/Components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white py-8 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* Marca */}
        <div>
          <h2 className="text-lg font-bold mb-2">Choricillo FC</h2>
          <p className="text-gray-400">
            {t('footer.about', 'Apasionados por el fútbol, la comunidad y el fair play.')}
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-md font-semibold mb-2">{t('footer.links', 'Enlaces')}</h3>
          <ul className="space-y-1">
            <li><Link href={route('team')} className="hover:underline">{t('welcome.team')}</Link></li>
            <li><Link href={route('notices')} className="hover:underline">{t('welcome.news')}</Link></li>
            <li><Link href={route('matches')} className="hover:underline">{t('welcome.results')}</Link></li>
            <li><Link href={route('shop')} className="hover:underline">{t('welcome.store')}</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-md font-semibold mb-2">{t('footer.contact', 'Contacto')}</h3>
          <ul className="space-y-1 text-gray-400">
            <li>Email: contacto@choricillofc.com</li>
            <li>Tel: +34 123 456 789</li>
            <li>Instagram: @choricillofc</li>
          </ul>
        </div>

        {/* Idioma y redes */}
        <div>
          <h3 className="text-md font-semibold mb-2">{t('footer.language', 'Idioma')}</h3>
          <LanguageSwitcher />
          <div className="mt-4 flex space-x-4">
            <a href="https://www.instagram.com/choricillofc/" className="hover:text-gray-400">Instagram</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
            <a href="#" className="hover:text-gray-400">YouTube</a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Choricillo FC — {t('layout.copyright')}
      </div>
    </footer>
  );
}
