import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-foreground/40" onClick={() => setIsCartOpen(false)} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border shadow-2xl animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Cart ({totalItems})
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
              <ShoppingBag className="w-16 h-16 opacity-30" />
              <p>Your cart is empty</p>
              <button onClick={() => setIsCartOpen(false)} className="text-primary text-sm font-medium hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 p-3 rounded-lg border border-border bg-card">
                <img src={product.thumbnail} alt={product.title} className="w-20 h-20 object-contain rounded-md bg-secondary/50 p-1 shrink-0" />
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="text-sm font-medium text-card-foreground line-clamp-1">{product.title}</h3>
                  <p className="text-sm font-bold text-foreground">${product.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-border rounded-lg">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-secondary rounded-l-lg">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-secondary rounded-r-lg">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex justify-between text-foreground">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              to="/cart"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3 rounded-lg bg-primary text-primary-foreground text-center font-semibold hover:bg-primary/90 transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
