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
        let token = JSON.parse(localStorage.getItem('authToken')).access
    
        let data = new FormData();
        data.append('image', e.target.image.files[0]);
        fetch(rooturl+'/api/product-image-update/'+thisProduct+'/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
          body: data
        }).catch((error) => {
            console.error('Error:', error);
        });

        let name = e.target.name.value
        let description = e.target.description.value
        let price = e.target.price.value
        let categories = Array.from(e.target.category.options).filter(option => option.selected).map(option => parseInt(option.value));
        axios.post(rooturl + '/api/product-update/' + thisProduct + "/",{
            name : name,
            description : description,
            price : price,
            category : categories
        }, 
        {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(function(response) {
                fetchProducts()
                document.getElementById("productDetails").style.display = "block";
                document.getElementById("ProductImage").style.display = "block";
                document.getElementById("ProductEditForm").style.display="none";
            })
            .catch(function(error) {
                alert(error)
        });
    }

    let addProduct=(e)=>{
        e.preventDefault()
        let token = JSON.parse(localStorage.getItem('authToken')).access
        let name = e.target.name.value
        let description = e.target.description.value
        let price = e.target.price.value
        let categories = Array.from(e.target.category.options).filter(option => option.selected).map(option => option.value);
        let data = new FormData();
        data.append('image', e.target.image.files[0]);
        if (e.target.image.files[0]){
            axios.post(rooturl+"/api/product-add/",{
                name : name,
                description : description,
                price : price,
                category : categories
            },{
                headers: {
                Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                let id = response.data.id
                fetch(rooturl+'/api/product-image-update/'+id+'/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                      body: data
                    }).catch((error) => {
                        alert("Failed adding image")
                        console.error('Error:', error);
                        navigate("/newproduct")
                    }).then(response => {
                        fetchProducts()
                        navigate("/")
                    })
            }).catch((error) => {
                console.log(error)
            });
        }
        else{
            alert("please add image")
        }
        
        

    }

    let searchProduct=(query)=>{
        query.preventDefault()
        let data;
        axios.get(rooturl + '/api/product-search/?q='+query.target.q.value)
        .then(res => {
            data = res.data;
            if (data.length===0){
              fetchProducts()
              navigate("/")
            }else{
                console.log(data)
                navigate("/")
                setProductList(data)
            }
        })
        .catch(err => {
            console.log(err)
        })
        
    }


    let deleteProduct=(id)=>{
        let token = JSON.parse(localStorage.getItem('authToken')).access
        axios.delete(rooturl+'/api/product-delete/'+id+"/",
        {headers:{
            Authorization  :  `Bearer ${token}`
        }})
        .then(res => {
            fetchProducts()
            navigate("/")
        })
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
        deleteProduct:deleteProduct,
        addProduct:addProduct,
        searchProduct:searchProduct
    }


    return ( 
        <ProductContext.Provider value = { contextData }>
          {children } 
        </ProductContext.Provider>
    )
}