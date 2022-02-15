import { 
createContext,     
useState,
useEffect } from "react";
import axios from 'axios';

const ProductContext = createContext()
export default ProductContext;

export  const ProductProvider = ({children}) => {

    let rooturl = "http://localhost:8000"
    let [productList,setProductList] = useState([])
    let [isFetched,setIsFetched]= useState(true)


    let fetchProducts=()=>{
        let data ;
        axios.get(rooturl+'/api/product-list/')
        .then(res => {
            data = res.data;
            setProductList(data)
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
            fetchProducts()
        }
        let interval = setInterval(() => {
            fetchProducts()
        },30000)
        return ()=>clearInterval(interval)
    })

    let contextData ={
        productList:productList,
    }


    return(
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    )
}

