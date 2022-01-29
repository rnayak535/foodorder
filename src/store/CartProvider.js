import React,{useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};
const cartReducer = (state, action) => {
    switch(action.type){
        case 'ADD':
            const updatedItems = state.items.concat(action.item); //concat() returns a hole new array by adding item object into array.
            const updatedAmount = state.totalAmount + action.item * action.amount;
            return {items: updatedItems, totalAmount: updatedAmount};
        default:
            return defaultCartState;
    }
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };
    const removeItemToCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };
    const CartContextData = {
        item: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    };
    return (
        <CartContext.Provider value={CartContextData}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;