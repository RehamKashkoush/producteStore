import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, CreditCard, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        >
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-xs">Add items to get started!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-contain bg-white rounded-xl p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-800 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-indigo-600 font-bold mt-0.5">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded bg-white shadow-sm hover:bg-gray-100 text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded bg-white shadow-sm hover:bg-gray-100 text-gray-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Proceeding to checkout! Redirecting...</span>
                  </motion.div>
                )}

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all"
                >
                  <CreditCard className="w-5 h-5" />
                  Checkout (${totalPrice.toFixed(2)})
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartDrawer;
