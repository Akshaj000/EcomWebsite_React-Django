import React from "react";
import ProductForm from "../components/AddproductForm";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";

export default function AddProductPage(){
    let {addProduct} = useContext(ProductContext)
    return(
        <div className="container">
          <div className="container card" style={{"padding":"20px",marginTop:"30px"}}>
            <h3>ADD NEW PRODUCT</h3>
            <ProductForm
            onSubmit={addProduct}
            />
          </div>
        </div>
    )
}