import {Notice} from "@/types";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

interface Props {
    notice: Notice;
}   

const NoticeDetail: React.FC<Props> = ({ notice }) => {
    const formattedDate = new Intl.DateTimeFormat('es-ES').format(new Date(notice.date));
    const imageUrl = notice?.image === 'notice_default.jpg'
            ? '/recursos/notice_default.jpg'
            : `/storage/${notice?.image}`;
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
    const { t } = useTranslation();

    return (
        <BaseLayout>
            <Head title={notice.title} />
            <div className="flex flex-col max-w-full mx-auto p-4 gap-4 bg-white shadow-md rounded-lg relative">
                <p className="mt-2 text-lg">{formattedDate}</p>
                <div className="flex flex-row items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold mb-4">{notice.title}</h1>
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={handleShare}
                            className="group flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                            title="Compartir esta noticia"
                        >
                            {/* Icono SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
                                >
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                            <span className="hidden sm:inline">{t("notices.share")}</span>
                        </button>
                    </div>
                </div>
                <img src={imageUrl} alt={notice.title} className="w-5/6 h-auto self-center rounded-lg mb-4" />
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