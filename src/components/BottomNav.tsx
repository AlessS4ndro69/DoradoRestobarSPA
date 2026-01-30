// src/components/BottomNav.jsx
import { useCartStore } from '@/store/useCartStore';
import { Home, ShoppingCart, User, FileText } from 'lucide-react';
import {Routes, Route, Link, useLocation} from "react-router";

export default function BottomNav() {
  const location = useLocation();
  const totalItems = useCartStore((state) => state.getTotalItems());

  // Función auxiliar para determinar si el link está activo
  const isActive = (path: string) => location.pathname === path;

  // Clases base para los items
  const baseClass = "flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors";
  const activeClass = "text-orange-600"; // Tu color primario
  const inactiveClass = "text-gray-500 hover:text-gray-900";

  return (
    // 'md:hidden': Visible solo en móvil. Fixed bottom.
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden pb-safe"> 
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        
        {/* Inicio / Menú */}
        <Link to="/" className={`${baseClass} ${isActive('/') ? activeClass : inactiveClass}`}>
          <Home className="w-6 h-6 mb-1" />
          <span>Inicio</span>
        </Link>

        {/* Pedidos */}
        <Link to="/orders" className={`${baseClass} ${isActive('/orders') ? activeClass : inactiveClass}`}>
          <FileText className="w-6 h-6 mb-1" />
          <span>Pedidos</span>
        </Link>

        {/* Carrito (Con badge opcional) */}
        <Link to="/cart" className={`${baseClass} ${isActive('/cart') ? activeClass : inactiveClass} relative`}>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 mb-1" />
            {/* Badge de contador (ejemplo estático) */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <span>Carrito</span>
        </Link>

        {/* Perfil */}
        <Link to="/profile" className={`${baseClass} ${isActive('/profile') ? activeClass : inactiveClass}`}>
          <User className="w-6 h-6 mb-1" />
          <span>Perfil</span>
        </Link>

      </div>
    </div>
  );
}