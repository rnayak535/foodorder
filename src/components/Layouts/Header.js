import React, {Fragment} from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
        <header className={classes.header}>
            <h1>Order Food</h1>
            <HeaderCartButton onclick={props.onClickOfCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="A table of delicious food." />
        </div>
    </Fragment>
    
  );
};

export default Header;