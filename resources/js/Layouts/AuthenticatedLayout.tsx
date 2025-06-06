import Dropdown from '@/Components/Dropdown';
import Footer from '@/Components/Footer';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Authenticated({
    header,
    children,
    cartComponent,
}: {
    children: ReactNode,
    header?: ReactNode,
    cartComponent?: ReactNode
}) {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <nav className="bg-white">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="text-black hover:text-gray-600">
                                    <span className="hidden sm:inline">{t('shop.exit')}</span>
                                    <span className="inline sm:hidden">{t('shop.exit_short')}</span>
                                </Link>
                            </div>
                        </div>

                        <Link href={route('shop')} title="Logo">
                            <img src="/recursos/logoChoricilloNegro.png" alt="Our Shop" className="w-full h-full object-contain" />
                        </Link>

                        <div className="flex items-center gap-2 sm:ms-6 sm:flex sm:items-center sm:gap-4">
                            <div className="hidden sm:block sm:relative sm:ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-black transition hover:text-gray-600 focus:outline-none"
                                            >
                                                {user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            {t('shop.profile')}
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            {t('shop.logout')}
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>

                            {cartComponent && (
                                <div className="sm:block relative sm:ms-0">
                                    {cartComponent}
                                </div>
                            )}

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                    className="inline-flex items-center justify-center text-gray-700 focus:text-gray-700 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('shop')} active={route().current('shop')}>
                            {t('shop.home')}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('shop', 'camisetas')} active={route().current('shop', 'camisetas')}>
                            {t('shop.categories.camisetas')}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('shop', 'pantalones')} active={route().current('shop', 'pantalones')}>
                            {t('shop.categories.pantalones')}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('shop', 'accesorios')} active={route().current('shop', 'accesorios')}>
                            {t('shop.categories.accesorios')}
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                {t('shop.profile')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                {t('shop.logout')}
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white border-b border-gray-300">
                    <div className="mx-auto px-4 py-2 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-grow bg-slate-50">
                <div className="mx-auto max-w-full">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}
