
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string; // o number, según tu base de datos
  title: string;
  price: number;
  quantity: number;
  url?: string;
}

interface CartState {
  items: CartItem[];
  // Acciones
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  // Computed (Getters)
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        // Verificamos si el producto ya está en el carrito
        const existingItem = items.find((i) => i.id === product.id);

        if (existingItem) {
          // Si existe, aumentamos la cantidad
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          // Si no existe, lo agregamos con cantidad 1
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      // Calculadoras auxiliares
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'dorado-cart-storage', // Nombre clave en localStorage
      storage: createJSONStorage(() => localStorage), // Por defecto usa localStorage
    }
  )
);