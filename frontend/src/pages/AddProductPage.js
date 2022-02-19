import React from "react";
import ProductForm from "../components/AddproductForm";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";

export default function AddProductPage(){
    let {addProduct} = useContext(ProductContext)
    return(
      <main className="main">
          <div className="card" style={{"padding":"2%",marginTop:"1%",marginRight:"3%",marginLeft:"3%"}}>
            <h3>ADD NEW PRODUCT</h3>
            <ProductForm
            onSubmit={addProduct}
            />
          </div>
        </main>
    )
}