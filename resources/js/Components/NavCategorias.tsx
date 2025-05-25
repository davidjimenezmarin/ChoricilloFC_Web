import NavLink from '@/Components/NavLink';
import { useTranslation } from 'react-i18next';

export default function NavCategorias() {
    const { t } = useTranslation();

    return (
        <div className='flex py-2'>   
            <div className="hidden sm:flex">
                <NavLink
                    href={route('shop')}
                    active={route().current('shop') 
                        && !route().current('shop', 'camisetas') 
                        && !route().current('shop', 'pantalones') 
                        && !route().current('shop', 'accesorios')}
                >
                    {t('shop.home')}
                </NavLink>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route('shop', 'camisetas')} active={route().current('shop', 'camisetas')}>
                    {t('shop.categories.camisetas')}
                </NavLink>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route('shop', 'pantalones')} active={route().current('shop', 'pantalones')}>
                    {t('shop.categories.pantalones')}
                </NavLink>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route('shop','accesorios')} active={route().current('shop', 'accesorios')}>
                    {t('shop.categories.accesorios')}
                </NavLink>
            </div>
        </div>
    );
}
