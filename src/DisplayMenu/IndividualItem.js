import { useContext } from "react"
import AuthContext from "../ContextApi/AuthContext"
import "./IndividualItems.css"
const IndividualItem = (props) =>{
    let content, contentValue, contentAdd,desc;
    const cxt = useContext(AuthContext);
    const addToCart = () =>{
        cxt.addToCartCountHandler(props.id);
    }
    const removeFromCart = () =>{
        cxt.removeFromCartCountHandler(props.id);
    }
    if(props.count === 0){
        content = <button className="addition" onClick={addToCart}>Add</button>
    }
    else {
        content = <button className="minus" onClick={removeFromCart}>-</button>
        contentValue = <p>{props.count}</p>
        contentAdd = <button className="add-more" onClick={addToCart}>+</button>
        desc = "description";
    }
    return( 
    <div className="individual-items">
        <div className="food-container">
            <img src={props.images} alt="food-images"></img>
            <p>{props.names}</p>
        </div>
        <div className="price">
            {props.price}
        </div>
        <div className="buttons">
            {content}
            {contentValue}
            {contentAdd}
        </div>
            <p className={desc}>{props.description}</p>
    </div>)
}
export default IndividualItem;