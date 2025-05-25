import {Notice} from "@/types";
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

type Props = {
  notices: Notice[];
};

export const HeadNotices: React.FC<Props> = ({ notices }) => {
    const mainNotice = notices.length > 0 ? notices[0] : null;
    const secondaryNotices = notices.slice(1);
    const { auth } = usePage().props;
    const { t } = useTranslation();
    return (
        <section className="py-10 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
                {(auth?.user?.is_admin || auth?.user?.is_player) ?(
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('notices.manage')}
                            className="inline-flex items-center px-4 py-2 bg-gray-950 text-white rounded hover:bg-gray-700 transition"
                        >
                            {t('notices.manage')}
                        </Link>
                    </div>
                ): null}
                {/* Noticia principal */}
                {mainNotice && (
                    <Link key={mainNotice.id} href={route('notice.show', mainNotice.slug)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 ">
                        <img
                            src={mainNotice.image === 'notice_default.jpg'
                                                            ? '/recursos/notice_default.jpg'
                                                            : `/storage/${mainNotice.image}`
                                                        }
                            alt={mainNotice.title}
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                        />
                        <div className="bg-gray-100 rounded-lg flex items-center justify-center p-8 shadow hover:shadow-lg transition">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                                {mainNotice.title}
                            </h2>
                        </div>
                    </Link>
                )}

                {/* Noticias secundarias */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {secondaryNotices.map((notice) => (
                        <Link key={notice.id} href={route('notice.show', notice.slug)} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                            <img
                                src={notice.image === 'notice_default.jpg'
                                                            ? '/recursos/notice_default.jpg'
                                                            : `/storage/${notice.image}`
                                                        }
                                alt={notice.title}
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-gray-900">{notice.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};