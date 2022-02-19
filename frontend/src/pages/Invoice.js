import React, { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { rooturl } from "../utils/functions";
import { Link } from "react-router-dom";
import { useContext } from "react";
import InvoiceContext from "../context/InvoiceContext";

export default function Invoice(){

    let {product} = useContext(InvoiceContext);
    let {order} = useContext(InvoiceContext);
    const imagestyle={
        marginTop:"3%",
        "maxHeight": "200px",
        width: "auto",
        display: "block",
        marginLeft: "auto",
        marginRight: "20%"
    }

    console.log(order)

    return(
        <main class="main">
                <div className="card mb-4 box-shadow" style={{marginTop:"1%",marginLeft:"5%",marginRight:"5%"}}>
                    <div  style={{padding:"20px",marginTop:"1%"}}>
                        <Link to={"/product/"+product.id+"/"}><h3 style={{color:"grey"}} className="card-text">{product.name}</h3></Link>
                        <img id="ProductImage" className="card-img-top" src={rooturl+product.image} style={imagestyle} />
                    </div>
                    <div className="card-body">
                        <div id="productDetails" style={{display:"block"}}>
                            <h2 className="card-text" style={{color:"green"}}>{product.price +" INR"}</h2>
                            <br/>
                            <p className ="card-text">{product.description}</p>
                            <div className="d-flex justify-content-between align-items-center"></div>
                            <div>
                            <hr/>
                              <h3 className ="card-text">Payment status  : {order.payment_status ? <span className="text-success">Successful</span>:<span className="text-danger">Failed!</span>}</h3>
                              <h5 className ="card-text">Total  : <span className="text-success">{order.totalprice} INR</span></h5>
                              <p className ="card-text">Quantity  : <span><strong>{order.count}</strong></span></p>
                              <p className ="card-text">Ordered on  : {order.date_ordered? order.date_ordered.substring(0,10):order.date_ordered}</p>
                              <p className ="card-text">Status  : {order.status}</p>
                              <hr/>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
    );
}

