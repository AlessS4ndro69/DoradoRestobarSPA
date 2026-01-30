import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Asegúrate de que esta ruta sea correcta según tu proyecto
import { Button } from "@/components/ui/button";
import { Phone, ShoppingCart, X } from "lucide-react"; // Iconos
import { useCartStore } from '@/store/useCartStore';

interface Product {
  id: string;
  title: string;
  price: number;
  url: string;
  description?: string; // Campo opcional para ingredientes
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const addItem = useCartStore((state) => state.addItem);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-2xl">
        
        {/* LAYOUT: Grid para separar imagen del contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* 1. IMAGEN (Ocupa todo el ancho en móvil, mitad en PC) */}
          <div className="relative h-64 md:h-full bg-gray-100">
            <img 
              src={product.url} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 2. CONTENIDO */}
          <div className="p-6 flex flex-col h-full justify-between">
            <div>
              <DialogHeader className="mb-4 text-left">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {product.title}
                </DialogTitle>
                <div className="text-yellow-500 font-extrabold text-xl mt-2">
                  S/ {product.price.toFixed(2)}
                </div>
              </DialogHeader>

              <DialogDescription className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.description || "Deliciosa preparación con los ingredientes más frescos de la casa. Incluye salsas y guarnición."}
              </DialogDescription>
            </div>

            {/* 3. BOTONES DE ACCIÓN */}
            <div className="flex flex-col gap-3 mt-4">
              {/* Botón Principal: Agregar */}
              <Button 
                onClick={() => {
                  addItem({ id: product.id, title: product.title, price: product.price, url: product.url });
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-12 rounded-xl text-md"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al Pedido
              </Button>

              {/* Botón Secundario: Llamar */}
              <Button 
                variant="outline"
                className="w-full border-gray-300 text-gray-700 h-12 rounded-xl hover:bg-gray-50"
                onClick={() => window.open('tel:+51925968311')} // Reemplaza con tu número
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar para consultar
              </Button>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};