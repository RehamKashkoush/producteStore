import { Search, ShoppingBag, Globe } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const Navbar = ({ searchTerm, setSearchTerm, onOpenCart, onGoHome }) => {
  const { totalItems } = useCart();
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="w-full px-6 sm:px-10 lg:px-12 py-4 flex items-center justify-between">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-200">
            S
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {t("storeName")}
          </span>
        </button>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${lang === "ar" ? "right-3" : "left-3"}`}
            />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${lang === "ar" ? "pr-9 pl-4" : "pl-9 pr-4"} py-2 w-36 sm:w-80 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all border border-transparent focus:border-indigo-500/30`}
            />
          </div>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>{lang === "en" ? "عربي" : "EN"}</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
