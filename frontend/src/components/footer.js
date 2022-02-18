import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){
    const footerstyle ={
        "background-color":"#f8f9fa",
        clear: "both",
        position: "relative",
        height: "100px",
    }
    return(
        <div className="">
            <footer style={footerstyle} className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-muted">2022 Company, Inc</p>
                <ul className="nav col-md-4 justify-content-end">
                    <Footeritem to="/" name="Home"/>
                    <Footeritem to="/cart" name="Cart"/>
                    <Footeritem to="/profile" name="Profile"/>
                    <Footeritem to="/orders" name="Orders"/>
                </ul>
            </footer>
        </div>

    );
}

function Footeritem(props){
    return(
      <li className="nav-item"><Link to={props.to} className="nav-link px-2 text-muted">{props.name}</Link></li>
    )
}