import { Head, usePage } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types'; 
import { HeadNotices } from '@/Components/HeadNotices';

const Notices = () => {

    const { notices } = usePage<PageProps>().props;

    const mainNotice = notices.length > 0 ? notices[0] : null;
    const secondaryNotices = notices.slice(1);

    return (
        <BaseLayout titulo="Noticias">
            <Head title="Noticias" />
            <HeadNotices notices={notices} />
        </BaseLayout>
    );
};

export default Notices;
