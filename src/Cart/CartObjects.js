import { useContext } from "react";
import AuthContext from "../ContextApi/AuthContext";
import "./CartObject.css";
const CartObjects = (props) =>{
    let values = props.food_name;
    let cxt = useContext(AuthContext);
    const addInCart = () =>{
        cxt.addToCartCountHandler(props.id);
    }
    const removeFromCart = () =>{
        cxt.removeFromCartCountHandler(props.id);
    }
    return (
        <div className="cartobjects">
            <div className="object-description">
            </div>
            <div className="flex-box">
                <p>{values}</p>
                <div className="quantity">
                    <button className="subtract" onClick={removeFromCart}>-</button>
                    <p>{props.count}</p>
                    <button className="add-products" onClick={addInCart}>+</button>
                </div>
                <p className="amount"><i class="fas fa-rupee-sign"></i>{props.amount}</p>
            </div>
        </div>
    )


}

export default CartObjects;