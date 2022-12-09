import React, { useContext } from "react";
import SortingButtons from "./SortingButtons/SortingButton";
import Header from "./Header/Header";
import DisplayMenu from "./DisplayMenu/DisplayMenu";
import NavBar from "./NavBar/NavBar";
import AuthContext from "./ContextApi/AuthContext";
import Cart from "./Cart/Cart";
const App =() => {  
  const cxt = useContext(AuthContext);
  return (
    <React.Fragment>
    <NavBar></NavBar>
    <Header/>
    {cxt.showCart && <Cart></Cart>}
    <SortingButtons></SortingButtons>
    <DisplayMenu></DisplayMenu>
    </React.Fragment>
  );
}

export default App;
