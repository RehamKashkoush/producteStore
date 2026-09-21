import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, onSelect }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(product)}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
    >
      <div>
        <div className="relative w-full h-48 rounded-xl bg-gray-50 overflow-hidden mb-4 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-gray-600 shadow-sm">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>

        <p className="text-gray-500 text-xs line-clamp-2 mb-3">
          {product.description}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-gray-600">
            {product.rating}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>

          <button
            onClick={handleQuickAdd}
            className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200"
            title="Quick Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
