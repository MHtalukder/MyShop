import { useReducer } from "preact/hooks";
import "./app.css";
import Announcement from "./components/Announcement";
import CartSection from "./components/CartSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsLetter from "./components/NewsLetter";
import ProductSection from "./components/ProductSection";
import { CartContext, ProductContext } from "./context";
import { cartReducer, initialState } from "./reducer/CartReducer";
import { productInitialState, productReducer } from "./reducer/ProductReducer";

export function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [productState, productDispatch] = useReducer(
    productReducer,
    productInitialState
  );

  return (
    <>
      <ProductContext.Provider value={{ productState, productDispatch }}>
        <CartContext.Provider value={{ state, dispatch }}>
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
