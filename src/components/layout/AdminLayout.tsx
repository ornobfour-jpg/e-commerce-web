import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { LayoutDashboard, PackageSearch, ShoppingCart, LogOut } from 'lucide-react';

export const AdminLayout = () => {
  const { isAdmin, setIsAdmin } = useShop();

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-stone-950 text-stone-50 flex flex-col">
        <div className="p-6 border-b border-stone-800">
          <h2 className="font-heading font-bold text-2xl uppercase tracking-tighter">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <NavLink 
            to="/admin" 
            end
            className={({isActive}) => `flex items-center gap-3 px-4 py-3 font-heading uppercase text-sm font-bold transition-colors ${isActive ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-white hover:bg-stone-900'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Overview
          </NavLink>
          <NavLink 
            to="/admin/products"
            className={({isActive}) => `flex items-center gap-3 px-4 py-3 font-heading uppercase text-sm font-bold transition-colors ${isActive ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-white hover:bg-stone-900'}`}
          >
            <PackageSearch className="w-5 h-5" /> Products
          </NavLink>
          <NavLink 
            to="/admin/orders"
            className={({isActive}) => `flex items-center gap-3 px-4 py-3 font-heading uppercase text-sm font-bold transition-colors ${isActive ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-white hover:bg-stone-900'}`}
          >
            <ShoppingCart className="w-5 h-5" /> Orders
          </NavLink>
        </nav>
        <div className="p-4 border-t border-stone-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 font-heading uppercase text-sm font-bold text-red-400 hover:text-red-300 transition-colors w-full">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
