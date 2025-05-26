// Componente funcional Notices que muestra la página de noticias utilizando un layout base.
// Usa Inertia para obtener las props compartidas, específicamente las noticias ('notices').
// Utiliza el hook de i18n para traducción, asignando el título y el contenido textual con claves localizadas.
// Renderiza la cabecera con título y el componente HeadNotices para listar las noticias recibidas.

import { Head, usePage } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types'; 
import { HeadNotices } from '@/Components/HeadNotices';
import { useTranslation } from 'react-i18next';

const Notices = () => {
    // Extraemos las noticias del objeto props compartido por Inertia
    const { notices } = usePage<PageProps>().props;
    // Hook de traducción para textos localizados
    const { t } = useTranslation();

    return (
        <BaseLayout titulo={t('welcome.news')}>
            {/* Define el título HTML de la página */}
            <Head title={t('welcome.news')} />
            {/* Componente que muestra la lista de noticias */}
            <HeadNotices notices={notices} />
        </BaseLayout>
    );
};

export default Notices;
