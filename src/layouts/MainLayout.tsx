import React from 'react';
import { Outlet } from 'react-router';
import TopNavBar from '@/components/TopNavBar';
import BottomNav from '@/components/BottomNav';

// React.FC es el tipo estándar para componentes funcionales
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar Superior (Desktop) */}
      <TopNavBar />

      {/* Contenido dinámico */}
      <main className="container mx-auto px-4 py-4 pb-24 md:pb-8"> 
        <Outlet /> 
      </main>

      {/* Navbar Inferior (Móvil) */}
      <BottomNav />
    </div>
  );
};

export default MainLayout;