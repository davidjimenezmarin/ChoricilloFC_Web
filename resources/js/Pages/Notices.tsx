import { Head, usePage } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps } from '@/types'; 
import { HeadNotices } from '@/Components/HeadNotices';
import { Link } from '@inertiajs/react';
const Notices = () => {

    const { notices } = usePage<PageProps>().props;
    
    return (
        <BaseLayout titulo="Noticias">
            <Head title="Noticias" />
            <HeadNotices notices={notices} />
        </BaseLayout>
    );
};

export default Notices;
