import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

export const OrderTrack = () => {
  const { orders, products } = useShop();
  const location = useLocation();
  const [searchId, setSearchId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state?.orderId) {
      setSearchId(location.state.orderId);
      handleSearch(location.state.orderId);
    }
  }, [location]);

  const handleSearch = (idToSearch = searchId) => {
    setError('');
    const found = orders.find(o => o.id === idToSearch.trim());
    if (found) {
      setOrder(found);
    } else {
      setOrder(null);
      setError('Order not found. Please check your Order ID.');
    }
  };

  const statusMap = {
    'Pending': { icon: Clock, color: 'text-yellow-600' },
    'Processing': { icon: Package, color: 'text-blue-600' },
    'Shipped': { icon: Truck, color: 'text-indigo-600' },
    'Delivered': { icon: CheckCircle, color: 'text-green-600' },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter mb-4">Track Order</h1>
        <p className="text-stone-600 font-medium max-w-lg mx-auto">Enter your Order ID to view the current status and digital invoice.</p>
        
        <div className="mt-8 flex max-w-md mx-auto gap-2">
          <input 
            type="text" 
            placeholder="e.g. ORD-12345" 
            className="flex-1 border-2 border-stone-300 focus:border-stone-950 p-3 outline-none"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button onClick={() => handleSearch()}>Track</Button>
        </div>
        {error && <p className="text-red-500 font-bold mt-2 text-sm">{error}</p>}
      </div>

      {order && (
        <div className="bg-white border-2 border-stone-950 shadow-2xl p-8 lg:p-12 print:shadow-none print:border-none print:p-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b-2 border-stone-100 pb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold uppercase tracking-tighter">Invoice</h2>
              <p className="text-stone-500 font-mono mt-1">#{order.id}</p>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <p className="font-bold uppercase tracking-widest text-sm">Eleven Drops</p>
              <p className="text-stone-500 text-sm">support@elevendrops.com</p>
              <p className="text-stone-500 text-sm mt-2">{new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 border-2 ${statusMap[order.status as keyof typeof statusMap].color} border-current bg-stone-50 mb-8`}>
              {React.createElement(statusMap[order.status as keyof typeof statusMap].icon, { className: 'w-5 h-5' })}
              <span className="font-heading font-bold uppercase tracking-widest text-sm">Status: {order.status}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="font-heading font-bold uppercase tracking-widest text-stone-400 text-xs mb-2">Billed To</p>
                <p className="font-bold">{order.customerInfo.name}</p>
                <p className="text-stone-600">{order.customerInfo.phone}</p>
              </div>
              <div>
                <p className="font-heading font-bold uppercase tracking-widest text-stone-400 text-xs mb-2">Shipped To</p>
                <p className="font-bold">{order.customerInfo.address}</p>
                <p className="text-stone-600">{order.customerInfo.thana}, {order.customerInfo.zilla}, {order.customerInfo.division}</p>
              </div>
            </div>
          </div>

          <table className="w-full mb-12">
            <thead>
              <tr className="border-b-2 border-stone-950 font-heading text-xs uppercase tracking-widest text-left">
                <th className="py-4 font-bold">Item</th>
                <th className="py-4 font-bold text-center">Qty</th>
                <th className="py-4 font-bold text-right">Price</th>
                <th className="py-4 font-bold text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item: any) => {
                const product = products.find(p => p.id === item.productId);
                return (
                  <tr key={item.id} className="border-b border-stone-200">
                    <td className="py-4">
                      <p className="font-bold text-sm uppercase">{product?.name || 'Unknown Item'}</p>
                      <p className="text-xs text-stone-500 mt-1">{item.edition} - {item.size}</p>
                    </td>
                    <td className="py-4 text-center font-mono">{item.quantity}</td>
                    <td className="py-4 text-right font-mono">{formatPrice(item.price)}</td>
                    <td className="py-4 text-right font-bold font-mono">{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-full md:w-1/2 space-y-3">
              <div className="flex justify-between text-sm text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(order.total - order.deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-600">
                <span>Delivery Charge</span>
                <span className="font-mono">{formatPrice(order.deliveryCharge)}</span>
              </div>
              <div className="flex justify-between pt-4 border-t-2 border-stone-950 font-heading font-bold uppercase text-xl">
                <span>Total</span>
                <span className="font-mono">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center print:hidden">
            <Button variant="outline" onClick={() => window.print()}>Print Invoice</Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
