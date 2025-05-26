const initialState = {
  cartData: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const alreadyInCart = state.cartData.some(
        (item) => item.id === action.payload.id
      );

      if (alreadyInCart || action.payload.quantity <= 0) {
        return state;
      }

      return {
        ...state,
        cartData: [...state.cartData, { ...action.payload, count: 1 }],
      };
      break;
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartData: state.cartData.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      break;
    case "INCREMENT_CART_COUNT":
      return {
        ...state,
        cartData: state.cartData.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        ),
      };
      break;
    case "DECREMENT_CART_COUNT":
      console.log(action.payload);
      return {
        ...state,
        cartData: state.cartData.map((item) =>
          item.id === action.payload.id && item.count > 1
            ? { ...item, count: item.count - 1 }
            : item
        ),
      };
      break;
    default:
      return state;
  }
};

export { cartReducer, initialState };
