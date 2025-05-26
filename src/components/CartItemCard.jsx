import { useContext } from "react";
import { CartContext, ProductContext } from "../context/index.js";
import { getImgUrl } from "../utils/shop-utils.js";

const CartItemCard = ({ cartItem }) => {
  const { state, dispatch } = useContext(CartContext);
  const { productState, productDispatch } = useContext(ProductContext);

  const handleIncrease = (e, product) => {
    const findProduct = productState.productList.find(
      (item) => item.id === product.id
    );
    if (!findProduct || findProduct.quantity === 0) return;

    productDispatch({
      type: "MARK_ADDED_AND_DECREMENT",
      payload: product,
    });

    const isInCart = state.cartData.find((item) => item.id === product.id);

    if (isInCart) {
      dispatch({
        type: "INCREMENT_CART_COUNT",
        payload: product,
      });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: findProduct });
    }
  };

  const handleDecrease = (e, product) => {
    const itemId = product.id;
    const isInCart = state.cartData.find((item) => item.id === itemId);

    console.log(isInCart);

    if (!isInCart || isInCart.count <= 1) return;

    productDispatch({ type: "MARK_ADDED_AND_INCREMENT", payload: product });

    dispatch({ type: "DECREMENT_CART_COUNT", payload: product });
  };

  const handleRemove = (e, product) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

    productDispatch({
      type: "RESTORE_PRODUCT_ON_REMOVE",
      payload: {
        id: product.id,
        count: product.count,
      },
    });
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
            onClick={(e) => handleRemove(e, cartItem)}
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
              onClick={(e) => handleDecrease(e, cartItem)}
            >
              −
            </button>
            <span className="text-sm">{cartItem.count}</span>
            <button
              className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"
              onClick={(e) => handleIncrease(e, cartItem)}
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
