import {
    createContext,
    useState,
    useEffect
} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { rooturl } from "../utils/functions";

const ProductContext = createContext()
export default ProductContext;

export const ProductProvider = ({ children }) => {

    const navigate = useNavigate()
    let [productList, setProductList] = useState([])
    let [isFetched, setIsFetched] = useState(true)
    let [thisProduct, setThisProduct] = useState([])

    let fetchProducts = () => {
        let data;
        axios.get(rooturl + '/api/product-list/')
            .then(res => {
                data = res.data;
                setProductList(data)
            })
            .catch(err => {
                console.log(err)
            })
        if (isFetched) {
            setIsFetched(false)
        }
    }

    let editProduct = (e) => {
        e.preventDefault()
        let name = e.target.name.value
        let image = e.target.image.files[0].name
        let description = e.target.description.value
        let price = parseInt(e.target.price.value)
        let categories = Array.from(e.target.category.options).filter(option => option.selected).map(option => parseInt(option.value));
        let token = JSON.parse(localStorage.getItem('authToken')).access
        axios.post(rooturl + '/api/product-update/' + thisProduct + "/", {
                name: name,
                description: description,
                image: image,
                price: price,
                category: categories
            }, {
                headers: {

                    Authorization: `Bearer ${token}`
                }
            })
            .then(function(response) {
                console.log(response)
            })
            .catch(function(error) {
                alert(error)
            });
    }


    useEffect(() => {
        if (isFetched) {
            fetchProducts()
        }
    })

    let contextData = {
        productList: productList,
        editProduct: editProduct,
        setThisProduct: setThisProduct,
    }


    return ( 
        <ProductContext.Provider value = { contextData }>
          {children } 
        </ProductContext.Provider>
    )
}