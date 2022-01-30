import React, {useRef, useState} from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const [validAmount, setValidAmount] = useState(true);
    const amountInputRef = useRef();
    const submitFormHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setValidAmount(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }

    return(
        <form className={classes.form} onSubmit={submitFormHandler}>
            <Input 
                ref={amountInputRef}
                label="Amount"
                input={{
                    id:"amount_" + props.id,
                    type:"number",
                    min:"1",
                    max:"5",
                    step:"1",
                    defaultValue:"1"
                }}        
            />
            <button type='submit'>+ Add</button>
            {!validAmount && <p>please enter a valid input(1-5).</p>}
        </form>
    );
};

export default MealItemForm;