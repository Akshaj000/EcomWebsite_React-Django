import { 
createContext,     
useState,
useEffect,
useContext } from "react";
import axios from 'axios';
import { rooturl } from "../utils/functions";
import { removecart } from "../utils/functions";
import { useNavigate } from "react-router-dom";

const OrderContext = createContext()
export default OrderContext;

export  const OrderProvider = ({children}) => {

    let [orderList,setOrderList] = useState([])
    let [isFetched,setIsFetched]= useState(true)
    let [thisOrder,setThisOrder] = useState()

    let navigate = useNavigate()

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

    let addOrder=(cart,bool)=>{
        for(let i=0;i<cart.length;i++){
            let data;
            axios.get(rooturl+'/api/product-detail/'+cart[i].product+"/")
            .then(res => {
                data = res.data
                let product = cart[i].product
                let totalprice = (parseFloat(data.price)*parseFloat(cart[i].count)).toFixed(2)
                let count  = cart[i].count
                let payment_status =  bool
                let status = "Pending"
                //console.log(i,product,totalprice,count,payment_status,status)
                let Token = JSON.parse(localStorage.getItem('authToken')).access
                axios.post(rooturl+'/api/order-add/',{
                    product : product,
                    totalprice : totalprice,
                    count : count,
                    payment_status : payment_status,
                    status : status
                },{
                    headers:{
                        'Authorization':`Bearer ${Token}`
                    }
                }).then(res=>{
                    removecart(product)
                    navigate("/orders")
                })

            })
        }

    }

    let contextData ={
        orderList:orderList,
        setIsFetched:setIsFetched,
        fetchOrder:fetchOrder,
        setThisOrder:setThisOrder,
        thisOrder:thisOrder,
        addOrder:addOrder
        
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