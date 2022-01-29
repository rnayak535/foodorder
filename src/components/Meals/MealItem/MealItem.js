import React from "react";
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";

const MealItem = (props) => {
  

  const price = `$${props.price.toFixed(2)}`;
//   const addItemEventHandler = (event) => {
//     event.preventDefault();
//     let itemObj = {
//       id: props.id,
//       name: props.name,
//       description: props.description,
//       price: props.price,
//     };

//     props.itemAddedToCart(itemObj);
//   };
  return (
    <div className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} />
      </div>
    </div>
  );
};

export default MealItem;
