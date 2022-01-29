import React, { useState } from "react";
import Header from "./components/Layouts/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [showCart, setToShowCartModal] = useState(false);

  const showCartEventHandler = () => {
    setToShowCartModal(true);
  };

  const closeCartEventHandler = () => {
    setToShowCartModal(false);
  };

  // const addMealEventHandler = (mealItemObj) => {
  //   addItem((prevState) => {
  //     return [...prevState, mealItemObj];
  //   });
  // }

  return (
    <CartProvider>
      {showCart && <Cart onCloseOfCart={closeCartEventHandler} />}
      <Header onClickOfCart={showCartEventHandler}/>
      <main>
        <Meals />
      </main>
      
    </CartProvider>
  );
}

export default App;
