import React from "react";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
    return(
        <div>
            <button type="button" className={classes.button}>Your Cart<span className={classes.badge}>5</span></button>
        </div>
    );
};

export default HeaderCartButton;