import React, { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { rooturl } from "../utils/functions";
import { useContext } from "react";
import OrderContext from "../context/OrderContext";
import { Link } from "react-router-dom";

export default function Invoice(){

    let {orderList} = useContext(OrderContext)
    const { id } = useParams();
    const [product, setProduct] = React.useState({ product: ''});

    let data;
    axios.get(rooturl+'/api/product-detail/'+id+"/")
    .then(res => {
        data = res.data;
        setProduct({product:data})
    })

    const imagestyle={
        "maxHeight": "120px",
        width: "auto",
        display: "block",
        marginLeft: "auto",
        marginRight: "20%"
    }

    return(
        <main class="main">
                <div className="card mb-4 box-shadow" style={{marginTop:"1%",marginLeft:"5%",marginRight:"5%"}}>
                    <div  style={{padding:"20px",marginTop:"1%"}}>
                        <Link to={"/product/"+product.product.id+"/"}><h3 className="card-text">{product.product.name}</h3></Link>
                        <img id="ProductImage" className="card-img-top" src={rooturl+product.product.image} style={imagestyle} />
                    </div>
                    <div className="card-body">
                        <div id="productDetails" style={{display:"block"}}>
                            <h2 className="card-text" style={{color:"green"}}>{product.product.price +" INR"}</h2>
                            <br/>
                            <p className ="card-text">{product.product.description}</p>
                            <div className="d-flex justify-content-between align-items-center"></div>
                            <div>
                              <p className ="card-text">{"Quantity  : "}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
    );
}

