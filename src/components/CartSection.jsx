import { useContext } from "react";
import { CartContext } from "../context";
import CartItemCard from "./CartItemCard";
import OrderSummary from "./OrderSummary";

const CartSection = () => {
  const { state } = useContext(CartContext);

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">YOUR CART</h2>

        {state.cartData.map((item) => (
          <CartItemCard key={item.id} cartItem={item} />
        ))}

        <OrderSummary />
      </div>
    </div>
  );
};

export default CartSection;
