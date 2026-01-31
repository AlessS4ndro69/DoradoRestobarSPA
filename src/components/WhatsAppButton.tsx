import React from 'react';
import { Send } from 'lucide-react'; // Icono opcional (instala lucide-react o usa otro)

type WhatsAppButtonProps = {
  className?: string; // Clases CSS opcionales
  phoneNumber: string; // Número de teléfono en formato internacional (ejemplo: +51925968311)
  message: string; // Mensaje predefinido
  children?: React.ReactNode; // Contenido del botón
}

const WhatsAppButton = ({
  className,
  phoneNumber, 
  message, 
  children 
}: WhatsAppButtonProps) => {
  
  const handleClick = () => {
    // 1. Limpiar el número: Quitar +, guiones y espacios
    const cleanNumber = phoneNumber.replace(/[^\w\s]/gi, '').replace(/ /g, '');

    // 2. Codificar el mensaje para URL (Maneja espacios, tildes, emojis)
    const encodedMessage = encodeURIComponent(message);

    // 3. Crear la URL
    const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    // 4. Abrir en nueva pestaña
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button 
      onClick={handleClick}
      className={className}
    >
      {children || "Enviar WhatsApp"}
      {/* Icono opcional */}
      <Send size={18} />
    </button>
  );
};

export default WhatsAppButton;