import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const ProductDetailView = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const { lang, t } = useLanguage();
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images.length > 0
      ? product.images[0]
      : product.thumbnail,
  );

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const ArrowIcon = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <div className="w-full px-6 sm:px-10 lg:px-12 py-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium text-sm shadow-sm hover:bg-gray-50 transition-all mb-6 cursor-pointer"
      >
        <ArrowIcon className="w-4 h-4" />
        {t("backToProducts")}
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <div className="w-full h-80 sm:h-96 rounded-2xl bg-gray-50 border border-gray-100 p-6 flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl border-2 p-1 bg-gray-50 overflow-hidden transition-all shrink-0 cursor-pointer ${
                      selectedImage === img
                        ? "border-indigo-600 ring-2 ring-indigo-100"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 mb-2 uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {product.title}
              </h1>
              {product.brand && (
                <p className="text-sm text-gray-400 mt-1">
                  {t("brand")}:{" "}
                  <span className="font-medium text-gray-600">
                    {product.brand}
                  </span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 border-y border-gray-100 py-4">
              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-amber-800">
                  {product.rating}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
                ${product.price}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {t("description")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all shadow-lg cursor-pointer ${
                  added
                    ? "bg-emerald-600 text-white shadow-emerald-200"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    {t("addedToCart")}
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    {t("addToCart")}
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <Truck className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <span className="text-xs font-medium text-gray-600 block">
                  {t("freeShipping")}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <span className="text-xs font-medium text-gray-600 block">
                  {t("warranty")}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <RefreshCw className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <span className="text-xs font-medium text-gray-600 block">
                  {t("easyReturn")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
