import React from "react";
import Card from "../components/card";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { increment } from "../utils/functions";
import { rooturl } from "../utils/functions";
import Warningcard from "../components/WarningCard";

const Homepage=()=>{

    let{productList} = useContext(ProductContext)
    return (
        <main role="main">
            <div className="album py-5 bg-light ">
                <div className="container">
                    <div className="row">
                        {productList.length>0 ? productList.map(productlist=>(
                            <Card 
                            view={"product/"+productlist.id+"/"} 
                            imageurl={rooturl+productlist.image} 
                            name={productlist.name} 
                            price={productlist.price}
                            addtocart  =  {()=>increment(productlist.id)}
                            />
                        )):<Warningcard message={<img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp" width={"100px"}/>}/>}
                    </div>
                </div>
            </div>
        </main>
    );
        
}

export default Homepage



