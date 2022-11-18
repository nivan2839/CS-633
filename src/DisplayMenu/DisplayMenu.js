import IndividualItem from "./IndividualItem.js";
import "./DisplayMenu.css";
import { useContext } from "react";
import AuthContext from "../ContextApi/AuthContext.js";
const DisplayMenu = () =>{
    const cxt = useContext(AuthContext);
    return (
    <div className="test">
    <div className="menu-options">
        {cxt.currentMenu.map(events => <IndividualItem key={events.id} names = {events.food_name} description = {events.description} category = {events.category} images = {events.image} price = {events.price} count = {events.count} id ={events.id}></IndividualItem>)}
    </div>
    </div>
    )
}

export default DisplayMenu;