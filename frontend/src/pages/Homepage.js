import React from "react";
import Card from "../components/card";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { increment } from "../utils/functions";

const Homepage=()=>{

    let{productList} = useContext(ProductContext)

    return (
        <main role="main">
            <div className="album py-5 bg-light ">
                <div className="container">
                    <div className="row">
                        {productList.map(productlist=>(
                            <Card 
                            view={"product/"+productlist.id+"/"} 
                            imageurl={"http://localhost:8000"+productlist.image} 
                            name={productlist.name} 
                            price={productlist.price}
                            addtocart  =  {()=>increment(productlist.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
        
}

export default Homepage



