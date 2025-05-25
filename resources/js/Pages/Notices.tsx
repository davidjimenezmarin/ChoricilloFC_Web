import { Head, usePage } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types'; 
import { HeadNotices } from '@/Components/HeadNotices';
import { useTranslation } from 'react-i18next';
const Notices = () => {

    const { notices } = usePage<PageProps>().props;
    const { t } = useTranslation();
    return (
        <BaseLayout titulo={t('welcome.news')}>
            <Head title={t('welcome.news')} />
            <HeadNotices notices={notices} />
        </BaseLayout>
    );
};

export default Notices;
