import { useState } from "preact/hooks";
import "./app.css";
import Announcement from "./components/Announcement";
import CartSection from "./components/CartSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsLetter from "./components/NewsLetter";
import ProductSection from "./components/ProductSection";
import { CartContext, ProductContext } from "./context";
import ProductItemList from "./db/productList";

export function App() {
  const [cartData, setCartData] = useState([]);
  const [productList, setProductList] = useState(ProductItemList);
  const [originalProductList] = useState(ProductItemList);

  return (
    <>
      <ProductContext.Provider
        value={{ originalProductList, productList, setProductList }}
      >
        <CartContext.Provider value={{ cartData, setCartData }}>
          <Announcement />
          <Header />
          <main class="container mx-auto px-4 md:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ProductSection />
              <CartSection />
            </div>
          </main>
          <NewsLetter />
          <Footer />
        </CartContext.Provider>
      </ProductContext.Provider>
      s
    </>
  );
}
