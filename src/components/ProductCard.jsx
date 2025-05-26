import { useContext } from "react";
import { CartContext, ProductContext } from "../context/index.js";
import { getImgUrl } from "../utils/Shop-utils.js";
import Rating from "./Rating.jsx";

const ProductCard = ({ productItem }) => {
  const { cartData, setCartData } = useContext(CartContext);
  const { productList, setProductList } = useContext(ProductContext);

  function handleAddToCart(event, product) {
    if (product.quantity <= 0) return;

    const alreadyInCart = cartData.some((item) => item.id === product.id);
    if (!alreadyInCart) {
      setCartData([...cartData, { ...product, count: 1 }]);
    }

    setProductList((prevList) =>
      prevList.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity - 1,
              isAdded: true,
            }
          : item
      )
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={getImgUrl(productItem.imageUrl)}
          alt={productItem.title}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{productItem.title}</h3>
        <div className="flex items-center justify-between">
          <Rating value={productItem.rating} />
          <span className="text-xs text-gray-700">
            ({productItem.quantity} pcs left)
          </span>
        </div>
        <p className="font-bold">${productItem.price} </p>
        {productItem.isAdded ? (
          <button className="w-full mt-2 bg-red-800 py-1 text-gray-100 rounded flex items-center justify-center">
            Remove from Cart
          </button>
        ) : (
          <button
            disabled={productItem.isLoading}
            className={`w-full mt-2 bg-gray-800 py-1 text-gray-100 rounded flex items-center justify-center
                active:translate-y-1 transition-all active:bg-gray-900
                disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed`}
            onClick={(e) => handleAddToCart(e, productItem)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
