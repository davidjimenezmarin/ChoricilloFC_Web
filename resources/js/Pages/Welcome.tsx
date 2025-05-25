import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/ui/sheet";
import { Button } from "@/shadcn/ui/button";
import ApplicationLogo from '@/Components/ApplicationLogo';
import { HeadNotices } from '@/Components/HeadNotices';
import HighlightsCard from '@/Components/HighlightsCard';
import Footer from '@/Components/Footer';
import { useTranslation } from 'react-i18next';

/**
 * Página principal de bienvenida.
 * 
 * Contiene navegación responsiva, acceso a secciones clave (equipo, noticias, resultados, tienda),
 * presentación destacada con imágenes y tarjetas, y estadísticas principales del equipo.
 * 
 * Utiliza traducciones con `react-i18next` y `Inertia.js` para renderizado dinámico.
 */
export default function Welcome({ auth, notices }: PageProps) {
    const { t } = useTranslation(); // Hook de traducción
    const { highlights } = usePage<PageProps>().props; // Obtención de estadísticas desde props

    return (
        <>
            <Head title="Welcome" />
            <main className="flex flex-col w-auto h-auto bg-[#191919] text-white">

                {/* Hero header con imagen de fondo y navegación superior */}
                <header className="h-[60vh] grid grid-cols-2 items-center gap-2 bg-cover bg-[center_bottom_59%] bg-no-repeat bg-[url('/recursos/mainBackground.jpg')] before:absolute before:inset-0 before:bg-black before:opacity-20 before:z-0 before:h-[60vh]">

                    {/* Logo y menú lateral para móviles */}
                    <div className="flex justify-start z-10 sm:pl-8">
                        <div className="flex sm:hidden justify-start pl-2 pr-2 z-10">
                            <Sheet>
                                <SheetTrigger>
                                    {/* Icono hamburguesa */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white hover:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </SheetTrigger>
                                <SheetContent className="w-[90vw]" side="left">
                                    <div className="grid grid-rows-2 gap-2">
                                        {/* Logo */}
                                        <div className="flex justify-center items-center h-[30vh]">
                                            <Link href="/">
                                                <ApplicationLogo className="w-30 h-auto fill-current hover:opacity-80" src="/recursos/logoChoricilloNegro.png" />
                                            </Link>
                                        </div>
                                        {/* Enlaces de navegación móviles */}
                                        <div className="grid grid-row gap-4">
                                            <Link href={route('team')}>{t('welcome.team')}</Link>
                                            <Link href={route('notices')}>{t('welcome.news')}</Link>
                                            <Link href={route('matches')}>{t('welcome.results')}</Link>
                                            <Link href={route('shop')}>{t('welcome.store')}</Link>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Logo visible en desktop */}
                        <Link href="/">
                            <ApplicationLogo className="w-16 h-auto fill-current hover:opacity-80 sm:w-40 sm:h-40" />
                        </Link>
                    </div>

                    {/* Menú horizontal visible solo en pantallas grandes */}
                    <nav className="hidden sm:flex flex-row justify-end pr-8 z-10">
                        <Link
                            href={route('notices')}
                            className="rounded-md px-3 py-2 text-white/90 ring-1 ring-transparent transition hover:text-white/50 dark:text-white dark:hover:text-white/80"
                        >
                            {t('welcome.news')}
                        </Link>
                        <Link
                            href={route('matches')}
                            className="rounded-md px-3 py-2 text-white/90 ring-1 ring-transparent transition hover:text-white/50 dark:text-white dark:hover:text-white/80"
                        >
                            {t('welcome.results')}
                        </Link>
                        {auth.user ? (
                            <Link
                                href={route('shop')}
                                className="rounded-md px-3 py-2 text-white/90 ring-1 ring-white transition hover:text-white/50 hover:ring-white/50 dark:text-white dark:hover:text-white/80"
                            >
                                {t('welcome.store')}
                            </Link>
                        ) : (
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-white/90 ring-1 ring-white transition hover:text-white/50 hover:ring-white/50 dark:text-white dark:hover:text-white/80"
                            >
                                {t('welcome.register')}
                            </Link>
                        )}
                    </nav>


                    {/* Botón de acceso a Instagram */}
                    <div className="col-span-2 flex justify-center z-10">
                        <Button asChild variant="transparent" size="xl">
                            <a href="https://www.instagram.com/choricillofc/">Instagram</a>
                        </Button>
                    </div>
                </header>

                {/* Sección de navegación destacada (tarjetas) */}
                <section className="bg-[#191919] text-white shadow-lg">
                    <div className="flex mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                            {/* Tarjeta - Equipo */}
                            <Card
                                routeName="team"
                                img="/recursos/equipo.jpg"
                                title={t('welcome.main_team')}
                                desc={t('welcome.main_team_desc')}
                                cta={t('welcome.main_team_cta')}
                            />

                            {/* Tarjeta - Noticias */}
                            <Card
                                routeName="notices"
                                img="/recursos/noticias.jpg"
                                title={t('welcome.main_news')}
                                desc={t('welcome.main_news_desc')}
                                cta={t('welcome.main_news_cta')}
                            />

                            {/* Tarjeta - Resultados */}
                            <Card
                                routeName="matches"
                                img="/recursos/resultados.jpg"
                                title={t('welcome.main_results')}
                                desc={t('welcome.main_results_desc')}
                                cta={t('welcome.main_results_cta')}
                            />

                            {/* Tarjeta - Tienda */}
                            <Card
                                routeName="shop"
                                img="/recursos/tienda.jpg"
                                title={t('welcome.main_shop')}
                                desc={t('welcome.main_shop_desc')}
                                cta={t('welcome.main_shop_cta')}
                            />
                        </div>
                    </div>
                </section>

                {/* Sección con resumen de noticias (solo título visible en móviles) */}
                <section className="bg-[#191919] text-white shadow-lg">
                    <div className="container mx-auto px-0 py-8 max-w-full">
                        <h2 className="inline sm:hidden text-2xl font-bold text-center">{t('welcome.last_news')}</h2>
                        <HeadNotices notices={notices} />
                    </div>
                </section>

                {/* Tarjeta con los destacados del mes: goleador, asistente, más amonestado */}
                <HighlightsCard
                    top_scorer={highlights.top_scorer}
                    scorer_of_the_month={highlights.scorer_of_the_month}
                    most_booked={highlights.most_booked}
                />

                {/* Pie de página */}
                <Footer />
            </main>
        </>
    );
}

/**
 * Componente reutilizable de tarjeta destacada en la pantalla principal.
 */
type CardProps = {
    routeName: string;
    img: string;
    title: string;
    desc: string;
    cta: string;
};

const Card = ({ routeName, img, title, desc, cta }: CardProps) => (
    <div className="text-center animate-fade-in">
        <Link href={route(routeName)}><img src={img} alt={title} className="mx-auto h-[250px] w-full object-cover rounded" /></Link>
        <h2 className="mt-4 text-lg font-bold text-[#c6aa76]"><Link href={route(routeName)}>{title}</Link></h2>
        <p className="mt-2">{desc}</p>
        <Link href={route(routeName)} className="mt-4 inline-block border-2 border-[#c6aa76] text-[#c6aa76] px-4 py-2 rounded hover:bg-[#c6aa76] hover:text-white transition">{cta}</Link>
    </div>
);
