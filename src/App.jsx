import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetailView from "./components/ProductDetailView";
import CartView from "./components/CartView";
import { useLanguage } from "./context/LanguageContext";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentView, setCurrentView] = useState("list");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    const titleMatch = product.title?.toLowerCase().includes(term);
    const descMatch = product.description?.toLowerCase().includes(term);
    const categoryMatch = product.category?.toLowerCase().includes(term);
    const brandMatch = product.brand?.toLowerCase().includes(term);

    return titleMatch || descMatch || categoryMatch || brandMatch;
  });

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentView("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    setCurrentView("list");
    setSelectedProduct(null);
  };

  const handleOpenCart = () => {
    setCurrentView("cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col m-0 p-0">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenCart={handleOpenCart}
        onGoHome={handleGoHome}
      />

      <main className="flex-1 w-full pt-28 pb-12">
        {currentView === "details" && selectedProduct ? (
          <ProductDetailView product={selectedProduct} onBack={handleGoHome} />
        ) : currentView === "cart" ? (
          <CartView onBack={handleGoHome} />
        ) : (
          <div className="w-full px-6 sm:px-10 lg:px-12">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {t("exploreProducts")}
              </h1>
              <p className="text-gray-500 text-sm mt-1.5">{t("exploreSub")}</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="h-72 bg-gray-200 animate-pulse rounded-2xl"
                  />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                <p className="text-lg font-medium">
                  {t("noProducts").replace("{term}", searchTerm)}
                </p>
                <p className="text-xs text-gray-400 mt-1">{t("tryAnother")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
