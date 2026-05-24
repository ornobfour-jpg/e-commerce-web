import React from 'react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../lib/utils';
import { Banknote, ShoppingCart, PackageSearch, Tag } from 'lucide-react';

export const Dashboard = () => {
  const { orders, products } = useShop();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  
  const totalProducts = products.length;
  const itemsSold = orders.reduce((sum, order) => 
    sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0)
  , 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter text-stone-950 mb-2">Overview</h1>
        <p className="text-stone-500 font-medium">Real-time metrics for current active drop.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <div className="bg-white border-2 border-stone-950 p-6 shadow-[4px_4px_0_theme(colors.stone.950)] relative">
          <div className="absolute w-[calc(100%+4px)] h-2 bg-stone-950 -bottom-2 -left-2 z-[-1]" />
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-heading font-bold uppercase text-stone-500 tracking-widest text-xs">Total Revenue</h3>
            <Banknote className="w-5 h-5 text-red-600" />
          </div>
          <p className="font-heading font-bold text-3xl uppercase tracking-tighter mb-2">{formatPrice(totalRevenue)}</p>
          <p className="text-sm font-bold text-red-600">+12.5% <span className="text-stone-500 font-normal">vs last drop</span></p>
        </div>

        <div className="bg-white border-2 border-stone-950 p-6 shadow-[4px_4px_0_theme(colors.stone.950)] relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-heading font-bold uppercase text-stone-500 tracking-widest text-xs">Orders</h3>
            <ShoppingCart className="w-5 h-5 text-stone-950" />
          </div>
          <p className="font-heading font-bold text-3xl uppercase tracking-tighter mb-2">{totalOrders}</p>
          <p className="text-sm font-bold text-red-600">+5.2% <span className="text-stone-500 font-normal">vs last drop</span></p>
        </div>

        <div className="bg-white border-2 border-stone-950 p-6 shadow-[4px_4px_0_theme(colors.stone.950)] relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-heading font-bold uppercase text-stone-500 tracking-widest text-xs">Total Products</h3>
            <PackageSearch className="w-5 h-5 text-stone-950" />
          </div>
          <p className="font-heading font-bold text-3xl uppercase tracking-tighter mb-2">{totalProducts}</p>
          <p className="text-sm font-bold text-stone-500 flex items-center gap-2">
            In Catalog
          </p>
        </div>

        <div className="bg-white border-2 border-stone-950 p-6 shadow-[4px_4px_0_theme(colors.stone.950)] relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-heading font-bold uppercase text-stone-500 tracking-widest text-xs">Items Sold</h3>
            <Tag className="w-5 h-5 text-stone-950" />
          </div>
          <p className="font-heading font-bold text-3xl uppercase tracking-tighter mb-2">{itemsSold}</p>
          <p className="text-sm text-stone-500">Across all orders</p>
        </div>
      </div>
      
      <div className="bg-white border-2 border-stone-950 shadow-[4px_4px_0_theme(colors.stone.950)] p-6">
        <h2 className="text-2xl font-heading font-bold uppercase tracking-tighter mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-stone-950 font-heading text-xs uppercase tracking-widest text-stone-500">
                <th className="py-4 font-bold">Order ID</th>
                <th className="py-4 font-bold">Customer</th>
                <th className="py-4 font-bold">Date</th>
                <th className="py-4 font-bold">Total</th>
                <th className="py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="border-b border-stone-200">
                  <td className="py-4 font-mono font-medium text-sm">{order.id}</td>
                  <td className="py-4 font-bold text-sm">{order.customerInfo.name}</td>
                  <td className="py-4 text-sm text-stone-500">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-4 font-mono font-bold">{formatPrice(order.total)}</td>
                  <td className="py-4">
                     <span className={`inline-block px-2 py-1 text-xs font-heading uppercase font-bold tracking-widest border-2 ${
                        order.status === 'Pending' ? 'border-yellow-500 text-yellow-700 bg-yellow-50' :
                        order.status === 'Processing' ? 'border-blue-500 text-blue-700 bg-blue-50' :
                        order.status === 'Shipped' ? 'border-indigo-500 text-indigo-700 bg-indigo-50' :
                        'border-green-500 text-green-700 bg-green-50'
                      }`}>
                        {order.status}
                      </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-stone-500 font-medium">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
