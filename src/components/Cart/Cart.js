import React, {Fragment, useContext, useState} from 'react'
import classes from './Cart.module.css'
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem/CartItem";
import Checkout from './Checkout/Checkout'

const Cart = props => {
    const cartCtx = useContext(CartContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDidSubmit, setDidSubmit] = useState(false)

    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const isHasItems = cartCtx.items.length > 0;
    const cartTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const SymbolTestFunc = (name, surname) => {
        const _sym1 = Symbol('name')
        const _sym2 = Symbol('surname')

        return {
            [_sym1]: name,
            [_sym2]: surname,
            get fullname (){
                return `${this[_sym1]} ${this[_sym2]} `
            }
        }
    }

    const cartRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartAddHandler = (item) => {
        const symbolObj = SymbolTestFunc('Вася', 'Пупкин')
        console.log(symbolObj.fullname)
        console.log(symbolObj)
        cartCtx.addItem({...item, amount: 1})
    }

    const orderHandler = () => {
        setIsCheckingOut(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        const response = await fetch('https://maxreact-15877-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
            {
                method: "POST",
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items
                })
            }
        )
        if (!response.ok) {
            console.warn('Something is wrong!')
        }
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const cartItems = (
        <ul className={classes['cart-items']}>{cartCtx.items.map(item => {
            return <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartRemoveHandler.bind(null, item.id)}
                onAdd={cartAddHandler.bind(null, item)}
            />
        })}
        </ul>
    )

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {isHasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span> Total amount:</span>
                <span> {cartTotalAmount}</span>
            </div>
            {isCheckingOut && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler}/>}
            {!isCheckingOut && modalActions}
        </Fragment>
    )

    const isSubmittingCartContent = (
        <p>Sending order data</p>
    )

    const isDidSubmitCarContent = (
        <Fragment>
            <p>Order received</p>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            </div>
        </Fragment>
    )

    return (
        <Modal onCLose={props.onClose}>
            {!isSubmitting && !isDidSubmit && cartModalContent}
            {isSubmitting && isSubmittingCartContent}
            {isDidSubmit && isDidSubmitCarContent}
        </Modal>
    )
};

export default Cart
