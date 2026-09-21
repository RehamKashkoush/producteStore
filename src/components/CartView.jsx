import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const CartView = ({ onBack }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { lang, t } = useLanguage();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3500);
  };

  const ArrowIcon = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <div className="w-full px-6 sm:px-10 lg:px-12 py-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium text-sm shadow-sm hover:bg-gray-50 transition-all mb-6 cursor-pointer"
      >
        <ArrowIcon className="w-4 h-4" />
        {t("continueShopping")}
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t("shoppingCart")}
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{t("cartEmpty")}</h2>
          <p className="text-gray-400 text-sm">{t("cartEmptySub")}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all cursor-pointer"
          >
            {t("startShopping")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-3 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-contain bg-gray-50 rounded-2xl p-2 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base truncate">
                    {item.title}
                  </h3>
                  <p className="text-indigo-600 font-bold text-sm mt-1">
                    ${item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end gap-4">
                  <span className="font-extrabold text-gray-900 text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-28 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100">
              {t("orderSummary")}
            </h2>

            {isSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{t("redirecting")}</span>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>{t("subtotal")}</span>
                <span className="font-semibold text-gray-800">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>{t("shipping")}</span>
                <span className="text-emerald-600 font-semibold">
                  {t("free")}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t border-gray-100">
                <span>{t("total")}</span>
                <span className="text-indigo-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CreditCard className="w-5 h-5" />
              {t("checkout")} (${totalPrice.toFixed(2)})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
