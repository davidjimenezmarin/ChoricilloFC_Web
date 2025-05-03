import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/shadcn/ui/sheet"
import { Button } from "@/shadcn/ui/button"
import ApplicationLogo from '@/Components/ApplicationLogo';
import { HeadNotices } from '@/Components/HeadNotices';

export default function Welcome({
    auth,notices
}: PageProps){
    const mainNotice = notices.length > 0 ? notices[0] : null;
    const secondaryNotices = notices.slice(1);
    return (
        <>
            <Head title="Welcome" />    
            <main className='flex flex-col w-auto h-auto'>
                <header className="h-[60vh] grid grid-cols-2 items-center gap-2 bg-cover bg-[center_bottom_59%] bg-no-repeat bg-[url('/recursos/mainBackground.jpg')]
                before:absolute before:inset-0 before:bg-black before:opacity-20 before:z-0 before:h-[60vh]">
                    <div className="flex justify-start z-10 sm:pl-8">
                        <div className='flex sm:hidden justify-start pl-2 pr-2 z-10'>
                            <Sheet>
                                <SheetTrigger>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 text-white hover:text-white/50"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                </SheetTrigger>
                                <SheetContent className="w-[90vw]" side="left">
                                    <div className='grid grid-rows-2 gap-2'>
                                        <div className='flex justify-center items-center h-[30vh]'>
                                            <Link href="/">
                                                <ApplicationLogo className="w-30 h-auto fill-current hover:opacity-80" src='/recursos/logoChoricilloNegro.png'/>
                                            </Link>
                                        </div>
                                        <div className='grid grid-row gap-4'>
                                            <Link
                                                href={route('team')}
                                                className="rounded-md px-3 py-2 text-black/90 ring-1 ring-transparent transition hover:text-black/50 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Equipo
                                            </Link>
                                            <Link
                                                href={route('notices')}
                                                className="rounded-md px-3 py-2 text-black/90 ring-1 ring-transparent transition hover:text-black/50 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Noticias
                                            </Link>
                                            <Link
                                                href={route('shop')}
                                                className="rounded-md px-3 py-2 text-black/90 ring-1 ring-transparent transition hover:text-black/50 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Resultados
                                            </Link>
                                            <Link
                                                href={route('shop')}
                                                className="rounded-md px-3 py-2 text-black/90 ring-1 ring-transparent transition hover:text-black/50 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Tienda
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
                    <nav className="hidden sm:flex flex-row justify-end pr-8 z-10 ">
                        <Link
                            href={route('notices')}
                            className="rounded-md px-3 py-2 text-white/90 ring-1 ring-transparent transition hover:text-white/50 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Noticias
                        </Link>
                        <Link
                            href={route('shop')}
                            className="rounded-md px-3 py-2 text-white/90 ring-1 ring-transparent transition hover:text-white/50 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Resultados
                        </Link>
                        {auth.user ? (
                            <Link
                                href={route('shop')}
                                className="rounded-md px-3 py-2 text-white/90 ring-1 ring-white transition hover:text-white/50 hover:ring-white/50 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Tienda
                            </Link>
                        ) : (
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-white/90 ring-1 ring-white transition hover:text-white/50 hover:ring-white/50 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Regístrate
                            </Link>
                        )}
                       
                    </nav>
        
                    <div className='col-span-2 flex justify-center z-10'>
                        <Button asChild variant="transparent" size="xl">
                            <a href="https://www.instagram.com/choricillofc/">Instagram</a>
                        </Button>
                    </div>
                </header>
                <section className="bg-[#191919] text-white shadow-lg">
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                        {/* Equipo */}
                        <div className="text-center animate-fade-in">
                            <a href="/lec" title="Sin título-1">
                            <img src="/recursos/equipo.jpg" alt="Equipo" className="mx-auto h-[250px] w-full object-cover rounded" />
                            </a>
                            <h2 className="mt-4 text-lg font-bold">  
                            <a href="/lec/" className="text-[#c6aa76]">EQUIPO</a>
                            </h2>
                            <p className="mt-2">Compitiendo en el mayor nivel de la MLA, estas son las personas que lo hacen posible.</p>
                            <Link href={route('team')} className="mt-4 inline-block border-2 border-[#c6aa76] text-[#c6aa76] px-4 py-2 rounded hover:bg-[#c6aa76] hover:text-white transition">VER EQUIPO</Link>
                        </div>

                        {/* <!-- Noticias --> */}
                        <div className="text-center animate-fade-in">
                            <a href="/game-changers-val" title="Game Changers">
                            <img src="/recursos/noticias.jpg" alt="Valorant Game Changers" className="mx-auto h-[250px] w-full object-cover rounded" />
                            </a>
                            <h2 className="mt-4 text-lg font-bold text-[#c6aa76]">NOTICIAS</h2>
                            <p className="mt-2">No te pierdas ningún detalle de todo lo que ocurre dentro y fuera del terreno de juego.</p>
                            <Link href={route('notices')} className="mt-4 inline-block border-2 border-[#c6aa76] text-[#c6aa76] px-4 py-2 rounded hover:bg-[#c6aa76] hover:text-white transition">SABER MÁS</Link>

                        </div>

                        {/* <!-- Resultados --> */}
                        <div className="text-center animate-fade-in">
                            <a href="/our-partners/" title="MDK">
                            <img src="/recursos/resultados.jpg" alt="Our Partners" className="mx-auto h-[250px] w-full object-cover rounded" />
                            </a>
                            <h2 className="mt-4 text-lg font-bold text-[#c6aa76]">RESULTADOS</h2>
                            <p className="mt-2">Mantente al día con cada resultado y vive la pasión del fútbol en cada partido.</p>
                            <a href="/our-partners/" className="mt-4 inline-block border-2 border-[#c6aa76] text-[#c6aa76] px-4 py-2 rounded hover:bg-[#c6aa76] hover:text-white transition">SABER MÁS</a>
                        </div>

                        {/* <!-- Tienda --> */}
                        <div className="text-center animate-fade-in">
                            <Link href={route('shop')} title="Our Shop">
                            <img src="/recursos/tienda.jpg" alt="Our Shop" className="mx-auto h-[250px] w-full object-cover rounded" />
                            </Link>
                            <h2 className="mt-4 text-lg font-bold text-[#191919]">
                            <Link href={route('shop')} className="text-[#c6aa76]">NUESTRA TIENDA</Link>
                            </h2>
                            <p className="mt-2">Para quienes quieran representar al equipo en casa, no busquen más.</p>
                            <Link href={route('shop')} className="mt-4 inline-block border-2 border-[#c6aa76] text-[#c6aa76] px-4 py-2 rounded hover:bg-[#c6aa76] hover:text-white transition">COMPRA AHORA</Link>
                        </div>
                        </div>
                    </div>
                </section> 
                <section className="bg-[#191919] text-white shadow-lg">
                    <div className="container mx-auto px-4 py-8">
                        <h2 className="inline sm:hidden text-2xl font-bold text-center">ÚLTIMAS NOTICIAS</h2>
                        <HeadNotices notices={notices} />
                    </div>
                </section>
            </main>
        </>
    );
}

   

