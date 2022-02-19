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
    let {deleteProduct} = useContext(ProductContext)
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
        setThisProduct(id)
        document.getElementById("productDetails").style.display = "none";
        document.getElementById("ProductImage").style.display = "none";
        document.getElementById("ProductEditForm").style.display="block";
        for(let i=0;i<product.product.category.length;i++){
           document.getElementById(product.product.category[i]).selected = "true";
        }
    }

    let handleDelete=()=>{
        document.getElementById("DeleteProductButton").style.display = "none";
        document.getElementById("DeleteProductConfirmButton").style.display = "block";
        document.getElementById("DeleteProductCancelButton").style.display = "block";
    }

    let handleCancel=()=>{
        document.getElementById("DeleteProductButton").style.display = "block";
        document.getElementById("DeleteProductConfirmButton").style.display = "none";
        document.getElementById("DeleteProductCancelButton").style.display = "none";

    }

    const imagestyle={
        "width": "90%",
        "maxWidth": "500px",
        height: "auto",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    }

    return(
        <main class="main">
                <div className="card mb-4 box-shadow" style={{marginTop:"1%",marginLeft:"5%",marginRight:"5%"}}>
                    <div style={{marginTop:"1%"}}>
                        <img id="ProductImage" className="card-img-top" src={rooturl+product.product.image} style={imagestyle} />
                    </div>
                    <div className="card-body">
                    <div id="productDetails" style={{display:"block"}}>
                        <h3 className="card-text">{product.product.name}</h3>
                        <h2 className="card-text" style={{color:"green"}}>{product.product.price +" INR"}</h2>
                        <br/>
                        <p className ="card-text">{product.product.description}</p>
                        <div className="d-flex justify-content-between align-items-center"></div>
                            <div>
                            {isSuperUser?
                                <>
                                <div class="btn-group">
                                 <Link to="/cart"><button onClickCapture={()=>increment(product.product.id)} type="button" style={{margin:"1px"}} className="btn btn-sm btn-outline-info">ADD TO CART</button></Link>
                                 <button onClick={()=>handleEdit()} type="button" style={{margin:"1px"}} className="btn btn-sm btn-outline-warning">EDIT</button>
                                </div>
                                 <button id="DeleteProductButton" onClick={()=>handleDelete()} type="button" onclick="" style={{float:"right",margin:"1px"}} className="btn btn-sm btn-outline-danger">DELETE</button>
                                 <button id="DeleteProductCancelButton" onClick={()=>handleCancel()} type="button" onclick="" style={{float:"right",margin:"1px",display:"none"}} className="btn btn-sm btn-warning">CANCEL</button>
                                 <button id="DeleteProductConfirmButton" onClick={()=>deleteProduct(product.product.id)} type="button" onclick="" style={{float:"right",margin:"1px",display:"none"}} className="btn btn-sm btn-danger">CONFIRM DELETE !</button>
                                </>:
                                <>
                                 <Link to="/cart"><button onClickCapture={()=>increment(product.product.id)} type="button" style={{margin:"1px"}} className="btn btn-sm btn-outline-info">ADD TO CART</button></Link>
                                </>
                                }
                           
                        </div>
                    </div>
                    {isSuperUser?
                        <>
                        <ProductForm id="ProductEditForm"
                        onSubmit={editProduct}
                        style={{display:"none"}}
                        name={product.product.name}
                        image = {product.product.image}
                        price={product.product.price}
                        description ={product.product.description}
                        category = {product.product.category}
                        />
                        
                        </>
                        :""
                    }
                    </div>
                </div>
        </main>
    );
}

