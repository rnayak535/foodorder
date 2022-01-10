import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <h1>Order Food</h1>
      <HeaderCartButton />
    </div>
  );
};

export default Header;