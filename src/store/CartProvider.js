import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        //findIndex function returns the index in first match
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        if(existingCartItem.amount === 5)
        {
            alert('Max 5 items allowed per dish.');
            return { items: state.items, totalAmount: state.totalAmount };
        }
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item); //concat() returns a hole new array by adding item object into array.
      }
      return { items: updatedItems, totalAmount: updatedAmount };
    case "REMOVE":
      const removeItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const removeCartItemObj = state.items[removeItemIndex];
      let updatedItemss;
      if (removeCartItemObj.amount === 1) {
        updatedItemss = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItemObj = {
          ...removeCartItemObj,
          amount: removeCartItemObj.amount - 1,
        };
        updatedItemss = [...state.items];
        updatedItemss[removeItemIndex] = updatedItemObj;
      }
      const updatedAmounts = state.totalAmount - (removeCartItemObj.price);
      return { items: updatedItemss, totalAmount: updatedAmounts };

    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const CartContextData = {
    item: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };
  return (
    <CartContext.Provider value={CartContextData}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
