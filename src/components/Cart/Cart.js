import React from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const Cart = (props) => {
//   const [totalPrice, setTotalPrice] = useState(0);
//   const priceAry = props.itemsInCart.map(item => item.price);
//   const cartValue = priceAry.reduce((total, currentPrice) => total+currentPrice, 0);
//   setTotalPrice(0);

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {props.itemsInCart.map((item) => {
        const uniqueId = Math.random().toString(2);
        return <CartItem key={uniqueId} name={item.name} price={item.price} />;
      })}
    </ul>
  );
  return (
    <Modal onCloseOfCart={props.onCloseOfCart}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>$92</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.onCloseOfCart}
        >
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
