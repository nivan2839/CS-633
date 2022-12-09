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
    content = <button className="addition" onClick={addToCart}>Add</button>

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