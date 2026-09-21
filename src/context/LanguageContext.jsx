import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    storeName: "StoreX",
    searchPlaceholder: "Search products...",
    exploreProducts: "Explore Products",
    exploreSub: "Discover quality items fetched directly from DummyJSON API",
    continueShopping: "Continue Shopping",
    backToProducts: "Back to Products",
    shoppingCart: "Shopping Cart",
    cartEmpty: "Your cart is empty",
    cartEmptySub: "Looks like you haven't added anything to your cart yet.",
    startShopping: "Start Shopping",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    checkout: "Checkout",
    redirecting: "Proceeding to checkout! Redirecting to payment...",
    addToCart: "Add to Cart",
    addedToCart: "Added to Cart!",
    brand: "Brand",
    description: "Description",
    freeShipping: "Free Shipping",
    warranty: "1 Year Warranty",
    easyReturn: "Easy Return",
    noProducts: 'No products found matching "{term}"',
    tryAnother: "Try searching with another keyword",
  },
  ar: {
    storeName: "ستور إكس",
    searchPlaceholder: "ابحث عن منتج...",
    exploreProducts: "استكشف المنتجات",
    exploreSub: "اكتشف منتجات ممتازة جُذبت مباشرة من DummyJSON API",
    continueShopping: "متابعة التسوق",
    backToProducts: "العودة للمنتجات",
    shoppingCart: "سلة التسوق",
    cartEmpty: "سلة التسوق فارغة",
    cartEmptySub: "يبدو أنك لم تضف أي منتجات إلى سلتك بعد.",
    startShopping: "ابدأ التسوق",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    free: "مجاني",
    total: "الإجمالي",
    checkout: "إتمام الشراء",
    redirecting: "جاري الانتقال لإتمام الشراء والتدفّق إلى بوابة الدفع...",
    addToCart: "أضف إلى السلة",
    addedToCart: "تمت الإضافة للسلة!",
    brand: "الماركة",
    description: "الوصف",
    freeShipping: "شحن مجاني",
    warranty: "ضمان لمدة سنة",
    easyReturn: "إرجاع سهل",
    noProducts: 'لم يتم العثور على منتجات تطابق "{term}"',
    tryAnother: "جرب البحث بكلمة مفتاحية أخرى",
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key) => {
    return translations[lang]?.[key] || key;
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useLanguage = () => useContext(LanguageContext);
