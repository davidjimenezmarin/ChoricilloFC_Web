import { Head, usePage } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import { PageProps,Notice } from '@/types'; 

const Notices = () => {

    const { notices } = usePage<PageProps>().props;

    const mainNotice = notices.length > 0 ? notices[0] : null;
    const secondaryNotices = notices.slice(1);

    return (
        <BaseLayout titulo="Noticias">
            <Head title="Noticias" />
            <section className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Noticia principal */}
                    {mainNotice && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <img
                                src={`/recursos/${mainNotice.image}`}
                                alt={mainNotice.title}
                                className="w-full h-auto object-cover rounded-lg shadow-md"
                            />
                            <div className="bg-gray-100 rounded-lg flex items-center justify-center p-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                                    {mainNotice.title}
                                </h2>
                            </div>
                        </div>
                    )}

                    {/* Noticias secundarias */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {secondaryNotices.map((notice) => (
                            <div key={notice.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                                <img
                                    src={`/recursos/${notice.image}`}
                                    alt={notice.title}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h3 className="text-sm font-semibold text-gray-900">{notice.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
};

export default Notices;
