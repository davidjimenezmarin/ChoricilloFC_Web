import {Notice} from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head } from "@inertiajs/react";

interface Props {
    notice: Notice;
}   

const NoticeDetail: React.FC<Props> = ({ notice }) => {
    const formattedDate = new Intl.DateTimeFormat('es-ES').format(new Date(notice.date));

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: notice.title,
                text: 'Mira esta noticia interesante:',
                url: window.location.href,
            })
            .then(() => console.log('Compartido exitosamente'))
            .catch((error) => console.log('Error al compartir', error));
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('El enlace ha sido copiado al portapapeles.');
        }
    };

    return (
        <BaseLayout titulo="Noticias">
            <Head title={notice.title} />
            <div className="flex flex-col max-w-full mx-auto p-4 gap-4 bg-white shadow-md rounded-lg relative">
                <p className="mt-2 text-lg">{formattedDate}</p>
                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold mb-4">{notice.title}</h1>
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                            title="Compartir esta noticia"
                        >
                            {/* Icono SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.828 10.172a4 4 0 00-5.656 0L4.93 13.414a4 4 0 105.656 5.656l1.415-1.414m2.828-2.828a4 4 0 005.656 0 4 4 0 000-5.656l-1.414-1.415a4 4 0 00-5.656 0L11.414 8.586"
                                />
                            </svg>
                            <span className="hidden sm:inline">Compartir</span>
                        </button>
                    </div>
                </div>
                <img src={`/recursos/${notice.image}`} alt={notice.title} className="w-5/6 h-auto self-center rounded-lg mb-4" />
                <div className="flex flex-col items-center justify-between self-center mb-8 px-4 border-x-2 border-gray-500 w-fit">
                    <p className="max-w-3xl text-lg sm:text-xl text-gray-700 mb-4 italic text-center leading-relaxed">
                        {notice.short_description}
                    </p>
                    <p className="max-w-3xl text-base sm:text-lg text-gray-800 leading-7 text-justify">
                        {notice.description}
                    </p>
                </div>

            </div>
        </BaseLayout>
    );
};
export default NoticeDetail;