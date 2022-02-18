import React, { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { increment } from "../utils/functions";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ProductForm from "../components/AddproductForm";
import ProductContext from "../context/ProductContext";
import { rooturl } from "../utils/functions";

export default function Product(){

    let {editProduct} = useContext(ProductContext)
    let {setThisProduct} = useContext(ProductContext)
    let {isSuperUser} = useContext(AuthContext)
    const { id } = useParams();
    const [product, setProduct] = React.useState({ product: ''});

    let data;
    axios.get(rooturl+'/api/product-detail/'+id+"/")
    .then(res => {
        data = res.data;
        setProduct({product:data})
    })

    let handleEdit=()=>{
        setThisProduct(1)
        document.getElementById("productDetails").style.display = "none";
        document.getElementById("ProductImage").style.display = "none";
        document.getElementById("ProductEditForm").style.display="block";
        for(let i=0;i<product.product.category.length;i++){
           document.getElementById(product.product.category[i]).selected = "true";
        }
    }

    const imagestyle={
        maxHeight:"450px", 
        width:"auto", 
        display: "block", 
        marginLeft: "auto", 
        marginRight: "auto", 
        marginTop:"20px"
    }

    return(
        <main class="main">
            <br/>
            <div className="container">
                <div className="card mb-4 box-shadow">
                    <div className="select2-container--classNameic">
                        <img id="ProductImage" className="card-img-top" src={rooturl+product.product.image} style={imagestyle} />
                    </div>
                    <div className="card-body">
                    <div id="productDetails" style={{display:"block"}}>
                        <h3 className="card-text">{product.product.name}</h3>
                        <h2 className="card-text" style={{color:"green"}}>{product.product.price +" INR"}</h2>
                        <br/>
                        <p className ="card-text">{product.product.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <Link to="/cart"><button onClickCapture={()=>increment(product.product.id)} type="button" style={{margin:"1px"}} className="btn btn-sm btn-outline-info">ADD TO CART</button></Link>
                            {isSuperUser?
                                <>
                                 <button onClick={()=>handleEdit()} type="button" style={{margin:"1px"}} className="btn btn-sm btn-outline-warning">EDIT</button>
                                 <button type="button" onclick="" style={{margin:"1px"}} className="btn btn-sm btn-outline-danger">DELETE</button>
                                </>:""}
                            </div>
                        </div>
                    </div>
                    {isSuperUser?
                        <ProductForm id="ProductEditForm"
                        onSubmit={editProduct}
                        style={{display:"none"}}
                        name={product.product.name}
                        image = {product.product.image}
                        price={product.product.price}
                        description ={product.product.description}
                        category = {product.product.category}
                        />:""
                    }
                    </div>
                </div>
            </div>
        </main>
    );
}

