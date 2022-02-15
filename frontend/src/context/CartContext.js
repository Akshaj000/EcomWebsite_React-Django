import { 
createContext,     
useState,
useEffect,
useContext } from "react";
import axios from 'axios';

const CartContext = createContext()
export default CartContext;

export  const CartProvider = ({children}) => {

    let rooturl = "http://localhost:8000"
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


    useEffect(()=>{
        if(isFetched){
            fetchCart()
        }
        let interval = setInterval(() => {
            fetchCart()
        },10000)
        return ()=>clearInterval(interval)
    })

    let contextData ={
        cartList:cartList,
    }


    return(
        <CartContext.Provider value={contextData}>
            {children}
        </CartContext.Provider>
    )
}
    
    