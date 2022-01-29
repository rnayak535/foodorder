import React, {useRef} from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const enteredItemAmount = useRef(0);
    const addItemHandler = (event) => {
        event.preventDefault();
        enteredItemAmount.current+=1;
        alert(enteredItemAmount.current);
    }
    return(
        <form className={classes.form}>
            <Input 
                label="Amount"
                input={{
                    id:"amount_" + props.id,
                    type:"number",
                    min:"1",
                    max:"5",
                    step:"1",
                    defaultValue:"1",
                    ref: {enteredItemAmount}
                }}        
            />
            <button type="submit" onClick={addItemHandler}>+ Add</button>
        </form>
    );
};

export default MealItemForm;