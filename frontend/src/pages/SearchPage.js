import React from "react";
import Card from "../components/card";
import { useContext } from "react";
import { increment } from "../utils/functions";
import { rooturl } from "../utils/functions";
import Warningcard from "../components/WarningCard";
import SearchContext from "../context/SearchContext";

const Searchpage=()=>{
    let{searchList} = useContext(SearchContext)

    return (
        <main class="main">
            <div className="album py-3 bg-light " style={{marginTop:"1%",marginLeft:"5%",marginRight:"5%",padding:"auto"}}>
                    <div className="row">
                        {searchList.length>0 ? searchList.map(productlist=>(
                            <Card 
                            view={"/product/"+productlist.id+"/"} 
                            imageurl={rooturl+productlist.image} 
                            name={productlist.name} 
                            price={productlist.price}
                            addtocart  =  {()=>increment(productlist.id)}
                            />
                        )):<Warningcard message="No results! 🔎"/>}
                    </div>
            </div>
        </main>
    );
        
}
export default Searchpage
