import { 
createContext,     
useState,
useEffect,
useContext } from "react";
import axios from 'axios';
import { rooturl } from "../utils/functions";

const CartContext = createContext()
export default CartContext;

export  const CartProvider = ({children}) => {

    let [cartList,setCartList] = useState([])
    let [isFetched,setIsFetched]= useState(true)

    let fetchCart=()=>{
        let Token = JSON.parse(localStorage.getItem('authToken')).access
        let data ;
        axios.get(rooturl+'/api/cart-list/',{
            headers:{
                'Authorization':`Bearer ${Token}`
            }
        })
        .then(res => {
            data = res.data;
            setCartList(data)
        })
        .catch(err => {
            console.log(err)
        })
        if(isFetched){
            setIsFetched(false)
        }
    }

    let contextData ={
        cartList:cartList,
        setIsFetched:setIsFetched,
        fetchCart:fetchCart,
        
    }


    return(
        <CartContext.Provider value={contextData}>
            {children}
        </CartContext.Provider>
    )
}
    
    