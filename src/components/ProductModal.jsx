import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between order-2 md:order-1 overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                <span className="text-xs text-gray-400">
                  Brand: {product.brand || "Generic"}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-700">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  Stock: {product.stock} units left
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-extrabold text-gray-900">
                  ${product.price}
                </span>
                {product.discountPercentage && (
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-gray-50 w-full sm:w-auto justify-between">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 rounded-lg hover:bg-white text-gray-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 rounded-lg hover:bg-white text-gray-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart (${(product.price * quantity).toFixed(2)})
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  <span>2 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center order-1 md:order-2 border-b md:border-b-0 md:border-l border-gray-100">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              src={product.thumbnail}
              alt={product.title}
              className="max-h-80 object-contain drop-shadow-xl"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;
