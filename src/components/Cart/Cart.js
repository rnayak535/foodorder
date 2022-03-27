import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalCartAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.item.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  }

  const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id);
}

  const onOrder = () => {
    setIsCheckout(true);
  }
  const onCancelCartForm = () => {
    setIsCheckout(false);
  };

  const onCheckoutFormSubmit = async (userData) => {
    setIsLoading(true);
    await fetch('https://react-http-c1e91-default-rtdb.firebaseio.com/order.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.item
      }),
    });

    setIsLoading(false);
    setDidSubmit(true);
    cartCtx.cleanCart();
  }

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.item.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null, item.id)} 
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>  //The bind() method returns a new function, when invoked, we can set the parameter also.
  );

  const modalActions = <div className={classes.actions}>
  <button
    className={classes["button--alt"]}
    onClick={props.onCloseOfCart}
  >
    Close
  </button>
  {hasItem && <button className={classes.button} onClick={onOrder}>Order</button>}
</div>;

const CartFormData = <React.Fragment>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalCartAmount}</span>
      </div>
      {isCheckout && <Checkout onCheckout={onCheckoutFormSubmit} onCancel={onCancelCartForm} />}
      {!isCheckout && modalActions}
</React.Fragment>

const cartIsLoading = <p>Sending Order...</p>;
const cartSentTheData = <React.Fragment>
    <p>Successfully Submitted the Data.</p>
    <div className={classes.actions}>
      <button
        className={classes.button}
        onClick={props.onCloseOfCart}
      >
        Close
      </button>
    </div>
  </React.Fragment>;

  return (
    <Modal onCloseOfCart={props.onCloseOfCart}>
        {!isloading && !didSubmit && CartFormData}
        {isloading && cartIsLoading}
        {didSubmit && !isloading && cartSentTheData}
    </Modal>
  );
};

export default Cart;
