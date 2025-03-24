import { ImgHTMLAttributes } from "react";

interface ApplicationLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
    src?: string; // Hacemos que el src sea opcional
}

export default function ApplicationLogo({
    src = "/recursos/logoChoricillo.png", // Valor por defecto
    ...props
}: ApplicationLogoProps) {
    return (
        <img
            src={src} // Usa el src dinámico
            alt="Logo Choricillo"
            style={{
                border: "none",
                objectFit: "contain",
                maxWidth: "100px",
                height: "auto",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                ...props.style, // Permite estilos adicionales desde props
            }}
            {...props} // Aplica otras props como className, id, etc.
        />
    );
}
