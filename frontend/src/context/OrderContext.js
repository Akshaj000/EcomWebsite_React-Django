import { 
    createContext,     
    useState,
    useEffect,
    useContext } from "react";
    import axios from 'axios';
    import { rooturl } from "../utils/functions";
    
    const OrderContext = createContext()
    export default OrderContext;
    
    export  const OrderProvider = ({children}) => {
    
        let [orderList,setOrderList] = useState([])
        let [isFetched,setIsFetched]= useState(true)
        let [thisOrder,setThisOrder] = useState()
    
        let fetchOrder=()=>{
            let Token = JSON.parse(localStorage.getItem('authToken')).access
            let data ;
            axios.get(rooturl+'/api/order-list/',{
                headers:{
                    'Authorization':`Bearer ${Token}`
                }
            })
            .then(res => {
                data = res.data;
                setOrderList(data)
            })
            .catch(err => {
                console.log(err)
            })
            if(isFetched){
                setIsFetched(false)
            }
        }
    
        let contextData ={
            orderList:orderList,
            setIsFetched:setIsFetched,
            fetchOrder:fetchOrder,
            setThisOrder:setThisOrder,
            thisOrder:thisOrder
            
        }

        useEffect(()=>{
            if(isFetched){
                fetchOrder()
            }
    
        })
    
    
        return(
            <OrderContext.Provider value={contextData}>
                {children}
            </OrderContext.Provider>
        )
    }