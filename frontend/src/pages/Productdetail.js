import React, { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { increment } from "../utils/functions";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Product(){

    let {isSuperUser} = useContext(AuthContext)
    const { id } = useParams();
    const rooturl = "http://localhost:8000"
    const [product, setProduct] = React.useState({ product: ''});
    
    let data;
    axios.get(rooturl+'/api/product-detail/'+id+"/")
    .then(res => {
        data = res.data;
        setProduct({product:data})
    })

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
                        <img className="card-img-top" src={rooturl+product.product.image} style={imagestyle} />
                    </div>
                    <div className="card-body">
                        <h3 className="card-text">{product.product.name}</h3>
                        <h2 className="card-text" style={{color:"green"}}>{product.product.price +" INR"}</h2>
                        <br/>
                        <p className ="card-text">{product.product.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                            <Link to="/cart"><button onClickCapture={()=>increment(product.product.id)} type="button" style={{margin:"1px"}} className="btn btn-sm btn-outline-info">ADD TO CART</button></Link>
                            {isSuperUser?
                            <div className="btn-group">
                            <Link to=""><button type="button" style={{margin:"1px"}} className="btn btn-sm btn-outline-warning">EDIT</button></Link>
                            <Link to="" onclick="return confirm('Are you sure you want to delete this item?');" ><button type="button" style={{margin:"1px"}} className="btn btn-sm btn-outline-danger">DELETE</button></Link>
                            </div>:""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
