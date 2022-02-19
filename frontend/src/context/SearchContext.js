import {
    createContext,
    useState,
    useEffect
} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { rooturl } from "../utils/functions";

const SearchContext = createContext()
export default SearchContext;

export const SearchProvider = ({ children }) => {

    const navigate = useNavigate()
    let [searchList, setSearchList] = useState([])

    let fetchSearch=(query)=>{
        query.preventDefault()
        let data;
        axios.get(rooturl + '/api/product-search/?q='+query.target.q.value)
        .then(res => {
            navigate("/search")
            data = res.data;
            console.log(data)
            setSearchList(data)
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    let contextData = {
        searchList: searchList,
        fetchSearch:fetchSearch
    }


    return ( 
        <SearchContext.Provider value = { contextData }>
          {children } 
        </SearchContext.Provider>
    )
}