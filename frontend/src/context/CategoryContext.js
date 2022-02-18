import { 
createContext,     
useState,
useEffect } from "react";
import axios from 'axios';
import { rooturl } from "../utils/functions";
import { useNavigate } from "react-router-dom";
const CategoryContext = createContext()
export default CategoryContext;


export  const CategoryProvider = ({children}) => {

    let [categories,setCategories] = useState([1,3])
    let [isFetched,setIsFetched]= useState(true)
    let Navigate = useNavigate()

    let fetchCategories=()=>{
        let token = JSON.parse(localStorage.getItem('authToken')) ? JSON.parse(localStorage.getItem('authToken')).access  : null
        if (token){
            axios.get(rooturl+'/api/category-list/',
            {headers:{
                Authorization  :  `Bearer ${token}`
            }})
            .then(res => {
                let data = res.data;
                setCategories(data)
            })
            if(isFetched){
                setIsFetched(false)
            } 
        }
    }

    let editCategories=(id,value)=>{
        let token = JSON.parse(localStorage.getItem('authToken')).access
        axios.post(rooturl + '/api/category-update/' + id + "/", {
            categoryname :  value
        }, {
            headers: {

                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            fetchCategories()
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    let deleteCategory=(id)=>{
        let token = JSON.parse(localStorage.getItem('authToken')).access
        axios.delete(rooturl+'/api/category-remove/'+id+"/",
        {headers:{
            Authorization  :  `Bearer ${token}`
        }})
        .then(res => {
            fetchCategories()
        })

    }

    let addCategories=(value)=>{
        console.log(value)
        let token = JSON.parse(localStorage.getItem('authToken')).access
        axios.post(rooturl + '/api/category-add/', {
            categoryname :  value
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            fetchCategories()
        })
        .catch(function(error) {
            console.log(error)
        });
    }


    let contextData ={
        categories:categories,
        editCategories:editCategories,
        addCategories:addCategories,
        deleteCategory:deleteCategory
    }

    useEffect(() => {
        if(isFetched){
          fetchCategories()
        }
    })


    return(
        <CategoryContext.Provider value={contextData}>
            {children}
        </CategoryContext.Provider>
    )
}