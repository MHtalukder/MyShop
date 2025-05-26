import ProductItemList from "../db/productList.js";

const productInitialState = {
  productList: ProductItemList,
  originalProductList: ProductItemList,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "MARK_ADDED_AND_DECREMENT":
      return {
        ...state,
        productList: state.productList.map((item) =>
          item.id === action.payload.id && item.quantity > 0
            ? {
                ...item,
                quantity: item.quantity - 1,
                isAdded: true,
              }
            : item
        ),
      };

      break;
    case "MARK_ADDED_AND_INCREMENT":
      console.log(action.payload);

      return {
        ...state,
        productList: state.productList.map((item) =>
          item.id === action.payload.id && item.quantity > 0
            ? {
                ...item,
                quantity: item.quantity + 1,
                isAdded: true,
              }
            : item
        ),
      };

      break;

    case "RESTORE_PRODUCT_ON_REMOVE":
      return {
        ...state,
        productList: state.productList.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + action.payload.count,
                isAdded: false,
              }
            : item
        ),
      };

      break;
    case "SEARCH_PRODUCT":
      const searchValue = action.payload.toLowerCase();
      const filtered = state.originalProductList.filter((item) =>
        item.title.toLowerCase().includes(searchValue)
      );
      return {
        ...state,
        productList: searchValue ? filtered : state.originalProductList,
      };
      break;
    default:
      return state;
  }
};

export { productInitialState, productReducer };
