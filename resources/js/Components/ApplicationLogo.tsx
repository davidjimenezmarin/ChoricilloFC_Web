import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            src="/recursos/logoChoricillo.png" 
            alt="Logo Choricillo" 
            style={{
                border: "none",
                objectFit: "contain",
                maxWidth: "100px",
                height: "auto",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                ...props.style // Esto asegura que cualquier estilo pasado por props se respete
            }}
            {...props} // Aplica cualquier otra prop como className, id, etc.
        />
    );
}
