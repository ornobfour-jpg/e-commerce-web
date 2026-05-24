import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Button } from '../ui/Button';
import { formatPrice, getImageUrl } from '../../lib/utils';

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, updateQuantity, removeFromCart, products } = useShop();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-stone-950/50 z-50 transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex z-50">
        <div className="w-screen max-w-md w-full bg-stone-50 h-full flex flex-col shadow-xl border-l-2 border-stone-950">
          <div className="flex items-center justify-between px-4 py-6 border-b-2 border-stone-950">
            <h2 className="text-xl font-heading font-bold uppercase tracking-widest flex items-center gap-2">
              <ShoppingBag /> Your Cart
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-200">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center text-stone-500 mt-20 flex flex-col items-center">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-heading uppercase text-lg">Your cart is empty.</p>
              </div>
            ) : (
              cart.map((item) => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return null;
                return (
                  <div key={item.id} className="flex gap-4 border-b border-stone-200 pb-4">
                    <img src={getImageUrl(product.images[0])} alt={product.name} className="w-24 h-24 object-cover skeleton" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-heading font-bold uppercase text-sm">{product.name}</h3>
                        <p className="text-sm text-stone-500">{item.edition} - Size: {item.size}</p>
                        <p className="font-bold mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border-2 border-stone-950">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-stone-200">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-stone-200">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-sm underline font-heading text-stone-500 hover:text-stone-950 uppercase">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t-2 border-stone-950 p-6 bg-stone-50">
              <div className="flex justify-between font-heading font-bold uppercase text-lg mb-4">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-sm text-stone-500 mb-6">Delivery charges calculated at checkout.</p>
              <Button fullWidth onClick={() => { onClose(); navigate('/checkout'); }}>
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
