import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { AdminLayout } from './components/layout/AdminLayout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { OrderTrack } from './pages/OrderTrack';
import { Login } from './pages/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { AdminOrders } from './pages/admin/Orders';

function AppContent() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {/* @ts-expect-error AnimatePresence needs key on Routes for page transitions */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-track" element={<OrderTrack />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
      
      <footer className="border-t-2 border-stone-950 bg-stone-50 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-950">
          <h2 className="font-heading font-bold text-3xl uppercase tracking-tighter mb-4">Eleven Drops</h2>
          <p className="font-medium text-stone-600">Elevating the culture, one drop at a time.</p>
          <div className="mt-8 text-xs font-bold uppercase tracking-widest text-stone-400">
            &copy; {new Date().getFullYear()} Eleven Drops BD. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </BrowserRouter>
  );
}

