import {useContext} from "react";
import AuthContext from "../ContextApi/AuthContext";
import "./SortingButtons.css";
const SortingButtons = () =>{
    const cxt = useContext(AuthContext);
    return (
        <div className="sorting-buttons">
            <p className={cxt.menu} onClick = {cxt.allHandler}>All</p>
            <p className= {cxt.breakfast} onClick = {cxt.setBreakFastHandler} >Breakfast</p>
            <p className={cxt.lunch} onClick={cxt.setLunchHandler}>Lunch</p>
            <p className={cxt.dinner} onClick = {cxt.setDinnerHandler}>Dinner</p>
            <p className={cxt.shakes} onClick={cxt.setShakesHandler}>Beverages</p>
        </div>)



}

export default SortingButtons;