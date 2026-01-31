import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { PaymentModal } from './PaymentModal';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function CartPage() {
  // Extraemos todo lo necesario
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mount, setMount] = useState<number>(0);

  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return <div className="p-10 text-center">Tu carrito está vacío 😢</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tu Pedido</h1>
      
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-gray-500">S/ {item.price}</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Controles de cantidad */}
            <div className="flex items-center border rounded">
              <button 
                className="px-2 py-1 hover:bg-gray-100"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus size={16} />
              </button>
              <span className="px-2 text-sm">{item.quantity}</span>
              <button 
                className="px-2 py-1 hover:bg-gray-100"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>

            <button 
              onClick={() => removeItem(item.id)} 
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>S/ {getTotalPrice().toFixed(2)}</span>
        </div>
        
        {/* Aquí iría tu botón de ir a Pagar con Stripe */}
        <WhatsAppButton
          className="flex items-center justify-center w-full mt-4 bg-orange-600 text-white py-3 rounded-lg font-bold"
          phoneNumber="+51925968311"
          message={
            `
            Hola, me gustaría hacer un pedido. El total es S/ ${getTotalPrice().toFixed(2)}
            ${items.map(item => `\n - ${item.title} x${item.quantity} = S/ ${(item.price * item.quantity).toFixed(2)}`).join('')}
            `
          }
          >
          Realizar pedido
        </WhatsAppButton>
        <button 
          className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg font-bold"
          onClick = {() => {
            setIsModalOpen(true);
            setMount(Number(getTotalPrice().toFixed(2)));
          }}
          >
          Pagar con tarjeta
        </button>

        <PaymentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          mount={mount} 
        />
      </div>
    </div>
  );
}