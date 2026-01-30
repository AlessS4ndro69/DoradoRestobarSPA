import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import MainLayout from './layouts/MainLayout.tsx';
import CartPage from './components/CartPage';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <Routes>  
          <Route element={<MainLayout />}>
            <Route index element={<App />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="profile" element={<div>Profile Page</div>} />
          </Route>
        </Routes>
      </Elements>
    </BrowserRouter>
  </StrictMode>,
)
