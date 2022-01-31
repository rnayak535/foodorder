import React,{useEffect, useContext, useState} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const [buttonIsHighlighted, setButtonToHighlight] = useState(false);
    const cartCtx = useContext(CartContext);
    
    const numberOfItems = cartCtx.item.reduce((currentNum, item)=>{
        return currentNum + item.amount;
    }, 0);
    const btnClass = `${classes.button} ${buttonIsHighlighted ? classes.bump: ''}`;
    
    useEffect(()=>{
        if(cartCtx.item.length > 0){
            setButtonToHighlight(true);
        }
        const highlitTime= setTimeout(()=>{
            setButtonToHighlight(false);
        }, 300);

        return () => {
            clearTimeout(highlitTime);
        }
    },[cartCtx.item]);
    return(
        <button className={btnClass} onClick={props.onclick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    );
};

export default HeaderCartButton;