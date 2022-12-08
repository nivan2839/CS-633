import { useContext} from "react";
import AuthContext from "../ContextApi/AuthContext"
import CartObjects from "./CartObjects";
import "./Cart.css";
import {order} from '../dbFunctions'
const Cart = () =>{
    const cxt = useContext(AuthContext);
    let cart_total,total,clear_cart,content;
    const FOOD_IN_CART = cxt.cartMenu.filter((events)=>{
            return events.count !== 0;
    })
    let checkout_button = <button className="checkout" onClick={() => order(FOOD_IN_CART)}>Checkout</button>;
    if(FOOD_IN_CART.length === 0){
        content =  <p className="empty-cart">Your Cart is Empty!</p>; 
        checkout_button  ='';
    }
    else {
        cart_total = <p className="total-amount">Total </p>
        total = <p className="total-count"> <i class="fas fa-rupee-sign"></i>{cxt.totalAmount} </p>
        clear_cart = <button className="clear-cart" onClick={cxt.clearCartHandler}>Clear Cart</button>;
    }
    return (
        <div className="backdrop">
            <div className="cart">
                <div className="cart-object">
                    <p className="cart-heading">Your Cart</p>
                    {content}
                    {FOOD_IN_CART.map((events)=>{
                        return <CartObjects key = {events.key} count = {events.count} id={events.id}
                                            food_name = {events.food_name} price = {events.price} 
                                            image = {events.image} amount = {events.amount}>
                                </CartObjects>
                    })}
                     <div className="total">
                        {cart_total}
                        {total}
                    </div>
                    <div className="close-buttons">
                        <button className="close-cart" onClick={cxt.setShowCartHandler}>Close</button>
                        {clear_cart}
                        {checkout_button}
                        
                    </div>
                   
                </div>
            </div>
        </div>
    )


}

export default Cart;

