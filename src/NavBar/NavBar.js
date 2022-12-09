import { useContext } from "react";
import AuthContext from "../ContextApi/AuthContext";
import "./NavBar.css";
const NavBar = () =>{
    const cxt = useContext(AuthContext);
    let classVal = "franchise";
    let content = <li onClick={cxt.setShowCartHandler} className="carts-contents"><i className='fas fa-cart-plus'><sup><sup></sup></sup></i></li>;
    if(cxt.cartCount) {
        classVal = "franchise-added"
        content = <li onClick={cxt.setShowCartHandler} className="carts-contents"><i className='fas fa-cart-plus'><sup><sup>{cxt.cartCount}</sup></sup></i></li>;
    }
    return (
    <div className="navbar">
        <ul className="intro-bar">
            {content}
            <li className={classVal}><i class="fab fa-instagram"></i></li>
            <li className="twitter"><i class="fab fa-twitter"></i></li>
        </ul>
    </div>
    )
}

export default NavBar;