import React, { useState } from "react";
import { BREAKFAST_OPTIONS } from "../Constants/Options";
const AuthContext = React.createContext({
    menu : 'all',
    breakfast : 'default',
    lunch : 'default',
    dinner : 'default',
    shakes : 'default',
    currentMenu : [],
    cartCount : 0,
    showMenu : false,
    showCart : false,
    cartMenu  : [],
    totalAmount : 0,
    clearCartHandler : ()=>{},
    setShowCartHandler : ()=>{},
    setShowMenuHandler : ()=>{},
    addToCartCountHandler : ()=>{},
    removeFromCartCountHandler : ()=>{},
    allHandler : ()=>{},
    setBreakFastHandler : ()=>{},
    setLunchHandler : ()=>{},
    setDinnerHandler : ()=>{},
    setShakesHandler : ()=>{},
});


export const AuthContextProvider = (props) =>{
    //let options = [...BREAKFAST_OPTIONS];
    let options = [];
    for(let key in BREAKFAST_OPTIONS){
        options[key] = BREAKFAST_OPTIONS[key];
    }
    let totalCartValue = 0;
    const[menuClass, setMenuClass] = useState('menu-clicked');
    const[breakfastClass, setBreakfastClass] = useState('default');
    const[lunchClass, setLunchClass] = useState('default');
    const[dinnerClass, setDinnerClass] = useState('default');
    const [shakeClass, setShakeClass] = useState('default');
    const[cartCount, setCartCount] = useState(0);
    const [currentMenu, setCurrentMenu] = useState(options);
    const [showMenu, setShowMenu] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [cartMenu, setCartMenu] = useState(options);
    const[totalAmount, setTotalAmount] = useState(0); 

    const allHandler = () =>{
        setMenuClass('menu-clicked');
        setBreakfastClass('default');
        setDinnerClass('default');
        setLunchClass('default');
        setShakeClass('default');
        setCurrentMenu(options);
    }
    const setBreakFastHandler = () =>{
        setMenuClass('menu');
        setBreakfastClass('breakfast');
        setDinnerClass('default');
        setLunchClass('default');
        setShakeClass('default');
        setCurrentMenu(options.filter((events)=> {
            return events.category === 'Breakfast'
        }))
    }
    const setLunchHandler = () =>{
        setMenuClass('menu');
        setBreakfastClass('default');
        setDinnerClass('default');
        setLunchClass('lunch');
        setShakeClass('default');
        setCurrentMenu(options.filter((events)=> {
            return events.category === 'Lunch'
        }))
    }
    const setDinnerHandler = () =>{
        setMenuClass('menu');
        setBreakfastClass('default');
        setDinnerClass('dinner');
        setLunchClass('default');
        setShakeClass('default');
        setCurrentMenu(options.filter((events)=> {
            return events.category === 'Dinner'
        }))
    }
    const setShakesHandler = () =>{
        setMenuClass('menu');
        setBreakfastClass('default');
        setDinnerClass('default');
        setLunchClass('default');
        setShakeClass('shake');
        setCurrentMenu(options.filter((events)=> {
            return events.category === 'Beverages'
        }))
    }
    const addCartCountHandler = (values) =>{
        totalCartValue = totalAmount;
        for(let key in options){
            if(options[key].id === values){
                options[key].count = options[key].count + 1;  
                options[key].amount = options[key].prices + options[key].amount; 
                totalCartValue = totalCartValue + options[key].prices;         
            }
        }
        setTotalAmount(totalCartValue);
        setCartMenu(options);
        setCartCount((prev)=>{
            return prev + 1;
        })
    }
    const setShowMenuHandler = () =>{
        setShowMenu((prev)=>{
            return !prev;
        })
    }
    const removeFromCartCountHandler = (values)=>{
        totalCartValue = totalAmount;
        for(let key in options){
            if(options[key].id === values){
                options[key].count = options[key].count - 1; 
                if(options[key].amount > 0){
                    options[key].amount = options[key].amount -options[key].prices;    
                    totalCartValue = totalCartValue - options[key].prices;                  
                }
            }
        }
        setTotalAmount(totalCartValue);
        setCartMenu(options);
        setCartCount((prev)=>{
            return prev-1;
        })
    }
    const setShowCartHandler = () => {
        setShowCart((prev)=>{
                return !prev;
        })
    }
    const clearCartHandler = () =>{
        setCartMenu([]);
        setCartCount(0);
        setTotalAmount(0);
        for(let key in options){
            options[key].count = 0;
            options[key].amount = 0;
        }
        setCurrentMenu(options);
        setMenuClass('menu-clicked');
        setBreakfastClass('default');
        setDinnerClass('default');
        setLunchClass('default');
        setShakeClass('default');
    }
    const passedValues = {
        menu : menuClass,
        breakfast : breakfastClass,
        lunch : lunchClass,
        dinner : dinnerClass,
        shakes : shakeClass,
        currentMenu : currentMenu,
        cartCount  :cartCount,
        showMenu : showMenu,
        showCart  : showCart,
        cartMenu : cartMenu,
        totalAmount : totalAmount,
        clearCartHandler : clearCartHandler,
        setShowCartHandler : setShowCartHandler,
        addToCartCountHandler : addCartCountHandler, 
        removeFromCartCountHandler : removeFromCartCountHandler,
        allHandler : allHandler,
        setShowMenuHandler : setShowMenuHandler,
        setBreakFastHandler : setBreakFastHandler,
        setLunchHandler : setLunchHandler,
        setDinnerHandler : setDinnerHandler,
        setShakesHandler : setShakesHandler,
    }
    return (
    <AuthContext.Provider value={passedValues}>
        {props.children}
    </AuthContext.Provider>)

}

export default AuthContext;