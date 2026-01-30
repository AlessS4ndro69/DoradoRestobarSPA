import React from 'react';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  url: string;
  onClick: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  title, 
  price, 
  url, 
  onClick 
}) => {
  
  const formattedPrice = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(price);

  return (
    <div 
      onClick={() => onClick(id)}
      className="
        group
        relative 
        w-full 
        h-[360px] md:h-72 lg:h-72            /* Altura fija */
        bg-white        /* Fondo blanco por si la imagen es PNG transparente */
        rounded-2xl     /* 👇 ESTO REDONDEA LAS ESQUINAS */
        shadow-lg       /* 👇 ESTO DA EL EFECTO DE TARJETA FLOTANTE */
        overflow-hidden /* 👇 OBLIGATORIO: Para que la imagen respete las esquinas redondas */
        transform       /* Habilita transformaciones */
        transition-all 
        duration-300
        hover:-translate-y-2  /* Efecto de elevación al pasar el mouse */
        hover:shadow-2xl      /* Sombra más fuerte al elevarse */
        cursor-pointer
        margin-5
      "
    >
      {/* 1. IMAGEN DE FONDO con efecto Zoom */}
      <img 
        src={url} 
        alt={title} 
        className="
          w-full 
          h-full 
          object-cover 
          transition-transform 
          duration-500 
          group-hover:scale-110  /* Efecto de zoom suave */
        "
      />

      {/* 2. EL GRADIENTE OSCURO (Más intenso abajo para leer bien) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

      {/* 3. EL CONTENIDO */}
      <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end h-full">
        {/* Título con mejor tipografía */}
        <h3 className="text-white text-xl font-bold leading-tight mb-1 drop-shadow-lg line-clamp-2">
          {title}
        </h3>
        
        {/* Precio y etiqueta */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-yellow-400 font-extrabold text-2xl drop-shadow-md">
            {formattedPrice}
          </p>
        </div>
      </div>
      
      {/* 4. BOTÓN FLOTANTE (Estilo FAB) */}
      <button 
        className="
          absolute 
          top-3 
          right-3 
          bg-white/90 
          backdrop-blur-sm
          hover:bg-yellow-400 
          hover:text-black
          text-gray-800 
          p-2.5
          rounded-full 
          shadow-lg 
          translate-y-[-10px] 
          opacity-0 
          group-hover:opacity-100 
          group-hover:translate-y-0 
          transition-all 
          duration-300
          z-10
        "
      >
        {/* Ícono de + simple (SVG) */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  );
};