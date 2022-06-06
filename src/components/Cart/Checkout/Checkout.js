import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const isEmpty = (value) => value.trim().length === 0
const isFiveChars = (value) => value.trim().length === 5
const checkAllIsValid = (...args) => {
    return args.every(item => item === true)
}

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })


    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostal = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredPostalIsValid = isFiveChars(enteredPostal)
        const enteredCityIsValid = !isEmpty(enteredCity)
        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postal: enteredPostalIsValid,
            city: enteredCityIsValid
        })
        const formIsValid = checkAllIsValid(enteredNameIsValid, enteredStreetIsValid, enteredPostalIsValid, enteredCityIsValid)

        if (!formIsValid) {
            return

            //submit form data
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        })
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name'/>
                {!formInputValidity.name && <p> Please enter valid name </p> }
            </div>
            <div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input ref={streetInputRef} type='text' id='street'/>
                {!formInputValidity.street && <p> Please enter valid street </p> }
            </div>
            <div className={`${classes.control} ${formInputValidity.postal ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalInputRef} type='text' id='postal'/>
                {!formInputValidity.postal && <p> Please enter valid postal </p> }
            </div>
            <div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input ref={cityInputRef} type='text' id='city'/>
                {!formInputValidity.city && <p> Please enter valid city </p> }
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
