import { 
createContext,     
useState,
useEffect,
} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { rooturl } from "../utils/functions";

const InvoiceContext = createContext()
export default InvoiceContext;

export  const InvoiceProvider = ({children}) => {

    let [product, setProduct] = useState([]);
    let [order, setOrder] = useState([]);
    let [isfetched,setIsfetched] = useState(false)
    const { id } = useParams();
    

    let fetchInvoice=(id)=>{
        console.log("here")
        let token = JSON.parse(localStorage.getItem('authToken')).access
        let data;
        axios.get(rooturl+'/api/order-detail/'+id+"/",{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        .then(res => {
            data = res.data;
            setOrder(data)
            axios.get(rooturl+'/api/product-detail/'+data.product+"/")
            .then(res => {
                setProduct(res.data)
                setIsfetched(true)
            })
        })
    }

    let contextData ={
        product:product,
        order:order
    }

    useEffect(()=>{
        if(!isfetched){
            fetchInvoice(id)
        }

    })


    return(
        <InvoiceContext.Provider value={contextData}>
            {children}
        </InvoiceContext.Provider>
    )
}