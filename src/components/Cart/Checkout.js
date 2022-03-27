import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value => value.trim() === '');
const isFiveCharacter = (value => value.trim().length === 5);

const Checkout = (props) => {
    const [formValidity, checkFormValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const nameIsValid = !isEmpty(nameInputRef.current.value);
        const streetIsValid = !isEmpty(streetInputRef.current.value);
        const cityIsValid = !isEmpty(cityInputRef.current.value);
        const postalIsValid = isFiveCharacter(postalInputRef.current.value);

        checkFormValidity({
            name: nameIsValid,
            street: streetIsValid,
            postal: postalIsValid,
            city: cityIsValid
        });

        const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

        if(!formIsValid){
            return;
        }

        const checkoutFormData = {
            name: nameInputRef.current.value,
            street: streetInputRef.current.value,
            postal: postalInputRef.current.value,
            city: cityInputRef.current.value
        };

        props.onCheckout(checkoutFormData);

    }

    const nameInputClass = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;
    const streetInputClass = `${classes.control} ${formValidity.street ? '' : classes.invalid}`;
    const cityInputClass = `${classes.control} ${formValidity.city ? '' : classes.invalid}`;
    const postalInputClass = `${classes.control} ${formValidity.postal ? '' : classes.invalid}`;

    return(
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={nameInputClass}>
                <label htmlFor="name">Your Name</label>
                <input type="text" ref={nameInputRef} id="name" />
                {!formValidity.name && <p>Name cannot be empty!</p>}
            </div>
            <div className={streetInputClass}>
                <label htmlFor="street">Street</label>
                <input type="text" ref={streetInputRef} id="street" />
                {!formValidity.street && <p>Street cannot be empty!</p>}
            </div>
            <div className={postalInputClass}>
                <label htmlFor="city">City</label>
                <input type="text" ref={cityInputRef} id="city" />
                {!formValidity.city && <p>City cannot be empty!</p>}
            </div>
            <div className={cityInputClass}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" ref={postalInputRef} id="postal" />
                {!formValidity.postal && <p>Postal code should contain 5 character!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
