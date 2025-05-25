import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/shadcn/ui/sheet";
import { Button } from "@/shadcn/ui/button";
import ApplicationLogo from '@/Components/ApplicationLogo';
import { HeadNotices } from '@/Components/HeadNotices';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';


export default function Welcome({ auth, notices }: PageProps) {
    const { t } = useTranslation();
    const mainNotice = notices.length > 0 ? notices[0] : null;
    const secondaryNotices = notices.slice(1);

    return (
        <>
            <Head title="Welcome" />
            <main className="flex flex-col w-auto h-auto">
                <header className="h-[60vh] grid grid-cols-2 items-center gap-2 bg-cover bg-[center_bottom_59%] bg-no-repeat bg-[url('/recursos/mainBackground.jpg')] before:absolute before:inset-0 before:bg-black before:opacity-20 before:z-0 before:h-[60vh]">
                    <div className="flex justify-start z-10 sm:pl-8">
                        <div className="flex sm:hidden justify-start pl-2 pr-2 z-10">
                            <Sheet>
                                <SheetTrigger>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white hover:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </SheetTrigger>
                                <SheetContent className="w-[90vw]" side="left">
                                    <div className="grid grid-rows-2 gap-2">
                                        <div className="flex justify-center items-center h-[30vh]">
                                            <Link href="/">
                                                <ApplicationLogo className="w-30 h-auto fill-current hover:opacity-80" src="/recursos/logoChoricilloNegro.png" />
                                            </Link>
                                        </div>
                                        <div className="grid grid-row gap-4">
                                            <Link href={route('team')} className="rounded-md px-3 py-2 text-black/90 ring-1 ring-transparent transition hover:text-black/50 dark:text-white dark:hover:text-white/80">
                                                {t('welcome.team')}
                                            </Link>
                                            <Link href={route('notices')} className="rounded-md px-3 py-2 text-black/90 ring-1 ring-transparent transition hover:text-black/50 dark:text-white dark:hover:text-white/80">
                                                {t('welcome.news')}
                                            </Link>
                                            <Link href={route('matches')} className="rounded-md px-3 py-2 text-black/90 ring-1 ring-transparent transition hover:text-black/50 dark:text-white dark:hover:text-white/80">
                                                {t('welcome.results')}
                                            </Link>
                                            <Link href={route('shop')} className="rounded-md px-3 py-2 text-black/90 ring-1 ring-transparent transition hover:text-black/50 dark:text-white dark:hover:text-white/80">
                                                {t('welcome.store')}
                                            </Link>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <Link href="/">
                            <ApplicationLogo className="w-16 h-auto fill-current hover:opacity-80 sm:w-40 sm:h-40" />
                        </Link>
                    </div>
                    <nav className="hidden sm:flex flex-row justify-end pr-8 z-10">
                        <Link href={route('notices')} className="rounded-md px-3 py-2 text-white/90 ring-1 ring-transparent transition hover:text-white/50 dark:text-white dark:hover:text-white/80">
                            {t('welcome.news')}
                        </Link>
                        <Link href={route('matches')} className="rounded-md px-3 py-2 text-white/90 ring-1 ring-transparent transition hover:text-white/50 dark:text-white dark:hover:text-white/80">
                            {t('welcome.results')}
                        </Link>
                        {auth.user ? (
                            <Link href={route('shop')} className="rounded-md px-3 py-2 text-white/90 ring-1 ring-white transition hover:text-white/50 hover:ring-white/50 dark:text-white dark:hover:text-white/80">
                                {t('welcome.store')}
                            </Link>
                        ) : (
                            <Link href={route('register')} className="rounded-md px-3 py-2 text-white/90 ring-1 ring-white transition hover:text-white/50 hover:ring-white/50 dark:text-white dark:hover:text-white/80">
                                {t('welcome.register')}
                            </Link>
                        )}
                    </nav>
                    <div className="col-span-2 flex justify-center z-10">
                        <Button asChild variant="transparent" size="xl">
                            <a href="https://www.instagram.com/choricillofc/">Instagram</a>
                        </Button>
                    </div>
                </header>

                <section className="bg-[#191919] text-white shadow-lg">
                    <div className="flex mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                            {/* Equipo */}
                            <div className="text-center animate-fade-in">
                                <Link href={route('team')} title="Team">
                                    <img src="/recursos/equipo.jpg" alt={t('welcome.team')} className="mx-auto h-[250px] w-full object-cover rounded" />
                                </Link>
                                <h2 className="mt-4 text-lg font-bold">
                                    <Link href={route('team')} className="text-[#c6aa76]">{t('welcome.main_team')}</Link>
                                </h2>
                                <p className="mt-2">{t('welcome.main_team_desc')}</p>
                                <Link href={route('team')} className="mt-4 inline-block border-2 border-[#c6aa76] text-[#c6aa76] px-4 py-2 rounded hover:bg-[#c6aa76] hover:text-white transition">
                                    {t('welcome.main_team_cta')}
                                </Link>
                            </div>

                            {/* Noticias */}
                            <div className="text-center animate-fade-in">
                                <Link href={route('notices')} title="News">
                                    <img src="/recursos/noticias.jpg" alt={t('welcome.news')} className="mx-auto h-[250px] w-full object-cover rounded" />
                                </Link>
                                <h2 className="mt-4 text-lg font-bold text-[#c6aa76]">
                                    <Link href={route('notices')} className="text-[#c6aa76]">{t('welcome.main_news')}</Link>
                                </h2>
                                <p className="mt-2">{t('welcome.main_news_desc')}</p>
                                <Link href={route('notices')} className="mt-4 inline-block border-2 border-[#c6aa76] text-[#c6aa76] px-4 py-2 rounded hover:bg-[#c6aa76] hover:text-white transition">
                                    {t('welcome.main_news_cta')}
                                </Link>
                            </div>

                            {/* Resultados */}
                            <div className="text-center animate-fade-in">
                                <Link href={route('matches')} title="Results">
                                    <img src="/recursos/resultados.jpg" alt={t('welcome.results')} className="mx-auto h-[250px] w-full object-cover rounded" />
                                </Link>
                                <h2 className="mt-4 text-lg font-bold text-[#c6aa76]">
                                    <Link href={route('matches')} className="text-[#c6aa76]">{t('welcome.main_results')}</Link>
                                </h2>
                                <p className="mt-2">{t('welcome.main_results_desc')}</p>
                                <a href={route('matches')} className="mt-4 inline-block border-2 border-[#c6aa76] text-[#c6aa76] px-4 py-2 rounded hover:bg-[#c6aa76] hover:text-white transition">
                                    {t('welcome.main_results_cta')}
                                </a>
                            </div>

                            {/* Tienda */}
                            <div className="text-center animate-fade-in">
                                <Link href={route('shop')} title="Shop">
                                    <img src="/recursos/tienda.jpg" alt={t('welcome.store')} className="mx-auto h-[250px] w-full object-cover rounded" />
                                </Link>
                                <h2 className="mt-4 text-lg font-bold text-[#191919]">
                                    <Link href={route('shop')} className="text-[#c6aa76]">{t('welcome.main_shop')}</Link>
                                </h2>
                                <p className="mt-2">{t('welcome.main_shop_desc')}</p>
                                <Link href={route('shop')} className="mt-4 inline-block border-2 border-[#c6aa76] text-[#c6aa76] px-4 py-2 rounded hover:bg-[#c6aa76] hover:text-white transition">
                                    {t('welcome.main_shop_cta')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#191919] text-white shadow-lg">
                    <div className="container mx-auto px-4 py-8 max-w-full">
                        <h2 className="inline sm:hidden text-2xl font-bold text-center">{t('welcome.last_news')}</h2>
                        <HeadNotices notices={notices} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
