import React from "react";

export default function Order(){
    return(
        <div style={{marginTop:"30px"}} className="container">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your Orders</span>
                <span className="badge bg-primary rounded-pill">no of order here</span>
            </h4>
            <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <a><h6 className="my-0">order name</h6></a>
                    <small className="text-muted"></small>
                </div>
                <span style={{color:"green"}} >totalprice INR</span>
                <span style={{color:"red"}}>order totalprice INR</span>
                </li>
            </ul>
        </div>

    )
}