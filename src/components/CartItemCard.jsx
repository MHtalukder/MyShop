import { useContext, useState } from "react";
import { CartContext, ProductContext } from "../context/index.js";
import { getImgUrl } from "../utils/shop-utils.js";

const CartItemCard = ({ cartItem }) => {
  const { cartData, setCartData } = useContext(CartContext);
  const { productList, setProductList } = useContext(ProductContext);
  const [count, setCount] = useState(1);

  const handleIncrease = (e, itemId) => {
    const findProduct = productList.find((item) => item.id === itemId);
    if (!findProduct || findProduct.quantity === 0) return;

    setProductList((prevItem) =>
      prevItem.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
          : item
      )
    );

    // Update cart data
    const isInCart = cartData.find((item) => item.id === itemId);

    if (isInCart) {
      // If already in cart, increase its count
      setCartData((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      // If not in cart, add it with count: 1
      setCartData([...cartData, { ...findProduct, count: 1 }]);
    }

    // Optional: Track count separately if you still need it
    setCount(count + 1);
  };

  const handleRemove = (e, itemId) => {
    setProductList((prevItem) =>
      prevItem.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + count, isAdded: false }
          : item
      )
    );
    setCartData((prevItem) => prevItem.filter((item) => item.id != itemId));
    setCount(0);
  };

  const handleDecrease = (e, itemId) => {
    if (count <= 1) return;
    setProductList((prevItem) =>
      prevItem.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    // Update cart data
    const isInCart = cartData.find((item) => item.id === itemId);

    if (isInCart) {
      // If already in cart, increase its count
      setCartData((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, count: item.count - 1 } : item
        )
      );
    } else {
      // If not in cart, add it with count: 1
      setCartData([...cartData, { ...findProduct, count: 1 }]);
    }

    // Optional: Track count separately if you still need it
    setCount(count - 1);
  };

  return (
    <div className="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
        <img
          src={getImgUrl(cartItem.imageUrl)}
          alt="Gradient Graphic T-shirt"
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{cartItem.title}</h3>
          <button
            className="text-red-500 text-sm"
            onClick={(e) => handleRemove(e, cartItem.id)}
          >
            ×
          </button>
        </div>
        <p className="text-sm text-gray-500">Size: {cartItem.size}</p>
        <p className="text-sm text-gray-500">Color: {cartItem.color}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold">${cartItem.price}</p>
          <div className="flex items-center space-x-2">
            <button
              className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"
              onClick={(e) => handleDecrease(e, cartItem.id)}
            >
              −
            </button>
            <span className="text-sm">{count}</span>
            <button
              className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"
              onClick={(e) => handleIncrease(e, cartItem.id)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
