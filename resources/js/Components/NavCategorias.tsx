import NavLink from '@/Components/NavLink';

export default function NavCategorias() {
    return (
        <div className='flex py-2 '>   
                    <div className="hidden sm:flex">
                        <NavLink
                            href={route('shop')}
                            active={route().current('shop') 
                                && !route().current('shop', 'camisetas') 
                                && !route().current('shop', 'pantalones') 
                                && !route().current('shop', 'accesorios')}
                        >
                            Inicio
                        </NavLink>
                    </div>

                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                        <NavLink href={route('shop', 'camisetas')} active={route().current('shop', 'camisetas')}>
                            Camisetas
                        </NavLink>
                    </div>

                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                        <NavLink href={route('shop', 'pantalones')} active={route().current('shop', 'pantalones')}>
                            Pantalones
                        </NavLink>
                    </div>

                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                        <NavLink href={route('shop','accesorios')} active={route().current('shop', 'accesorios')}>
                            Accesorios
                        </NavLink>
                    </div>
                </div>
    )
}