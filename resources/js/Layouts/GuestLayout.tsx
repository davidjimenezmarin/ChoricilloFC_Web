import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-[url('/recursos/guestBackground.jpg')]
             before:absolute before:inset-0 before:bg-black before:opacity-40 before:z-0">
            
            

            {/* Contenedor principal */}
            <div className="flex flex-col items-center w-full z-10 px-4 sm:px-6 mt-16 sm:mt-0">
                {/*Logo: centrado en pantallas pequeñas y alineado a la izquierda en pantallas grandes */}
                <div className="w-full flex justify-center sm:justify-start absolute top-5 p-5 z-10">
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current transition-transform duration-150 active:scale-95 hover:scale-105" />
                    </Link>
                </div>
                {/* Contenedor del formulario */}
                <div className="w-full max-w-sm bg-white bg-opacity-80 px-6 py-4 shadow-md rounded-lg sm:max-w-md sm:rounded-xl">
                    {children}
                </div>


            </div>
        </div>
    );
}
