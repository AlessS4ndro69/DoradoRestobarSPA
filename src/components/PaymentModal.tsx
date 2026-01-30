import { PaymentElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { useEffect, useState } from "react";

// Asegúrate de que tu variable de entorno empiece con VITE_ si usas Vite estándar
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mount: number;
}

// --- COMPONENTE HIJO (Formulario) ---
// Solo se encarga de confirmar el pago
function PaymentForm({ mount, onClose }: { mount: number, onClose: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage(null);

    // Confirmamos el pago usando los elementos que ya cargaron con el clientSecret
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirección o manejo post-pago
        return_url: window.location.origin + "/payment-success",
      },
      // Si quieres evitar la redirección y manejarlo en la misma página:
      redirect: "if_required", 
    });

    if (error) {
      setErrorMessage(error.message || "Error desconocido");
      setLoading(false);
    } else {
      // Pago exitoso
      console.log("Pago exitoso!");
      setLoading(false);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <PaymentElement />
      
      {errorMessage && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
          {errorMessage}
        </div>
      )}
      
      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50 transition-colors"
      >
        {loading ? "Procesando..." : `Pagar S/ ${mount.toFixed(2)}`}
      </button>
    </form>
  );
}

// --- COMPONENTE PADRE (Modal y Lógica de Fetch) ---
export function PaymentModal({ isOpen, onClose, mount }: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingSecret, setIsLoadingSecret] = useState(false);

  // Variable de entorno para el backend (Asegúrate de usar VITE_ si usas Vite)
  const backendUrl = import.meta.env.BACKEND_STRIPE_URL || "https://subglottal-nonnationally-cierra.ngrok-free.dev/payments/create-payment-intent"; 

  // 1. EFECTO: Obtener el ClientSecret apenas se abre el modal
  useEffect(() => {
    if (isOpen) {
      const fetchClientSecret = async () => {
        setIsLoadingSecret(true);
        try {
          const response = await fetch(backendUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              amount: Math.round(mount * 100), // Enviar en centavos
              currency: "pen" 
            }),
          });
          
          if (!response.ok) throw new Error("Error al conectar con el servidor");
          
          const data = await response.json();
          console.log("✅ ClientSecret obtenido:", data);
          setClientSecret(data.clientSecret);
          
        } catch (error) {
          console.error("❌ Error obteniendo intent:", error);
        } finally {
          setIsLoadingSecret(false);
        }
      };

      fetchClientSecret();
    } else {
      // Limpiar el secreto si se cierra el modal para forzar uno nuevo la próxima vez
      setClientSecret(null); 
    }
  }, [isOpen, mount, backendUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-2xl">
        <DialogHeader className="mb-4 text-left p-6 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Pagar Pedido
          </DialogTitle>
          <DialogDescription className="text-gray-700 mt-2">
            Total a pagar: <span className="font-bold text-black">S/ {mount.toFixed(2)}</span>
          </DialogDescription>
        </DialogHeader>

        {/* 2. LOGICA DE RENDERIZADO CONDICIONAL */}
        {isLoadingSecret ? (
          <div className="p-10 flex justify-center items-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : clientSecret ? (
          /* Solo renderizamos Elements si tenemos el clientSecret */
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: Math.round(mount * 100), // Stripe usa centavos
              currency: "pen",
            }}
          >
            <PaymentForm mount={mount} onClose={onClose} />
          </Elements>
        ) : (
          <div className="p-6 text-red-500 text-center">
            No se pudo iniciar la pasarela de pago. Intente nuevamente.
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}