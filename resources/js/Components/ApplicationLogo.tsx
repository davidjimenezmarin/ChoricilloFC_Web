import { ImgHTMLAttributes } from "react";

interface ApplicationLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
    src?: string; // Hacemos que el src sea opcional
}

export default function ApplicationLogo({
    src = "/recursos/logoChoricilloBlanco.png", // Valor por defecto
    ...props
}: ApplicationLogoProps) {
    return (
        <img
            src={src} // Usa el src dinámico
            alt="Logo Choricillo"
            style={{
                border: "none",
                objectFit: "contain",
                maxWidth: "auto",
                height: "auto",
                boxShadow: "none",
                ...props.style, // Permite estilos adicionales desde props
            }}
            {...props} // Aplica otras props como className, id, etc.
        />
    );
}
