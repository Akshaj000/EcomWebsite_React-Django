import React from "react";
import { Link } from "react-router-dom";

export default function CartListCard(props){
    const imagestyle ={
        "object-fit":"contain",
        maxHeight:"150px", 
        overflow:"hidden", 
        maxWidth:"300px",
        width:"auto", display: "block", 
        marginLeft: "auto", 
        marginRight: "auto", 
        marginTop:"20px"
    }
    return(
        <div className="col-md-4" >
            <div className="card mb-4 box-shadow" style={{"height":"400px"}}>
                <div className="card-body" style={{overflow:"auto"}}>
                    <div className="select2-container--classic">
                        <img className="card-img-top" src={props.image} style={imagestyle} />
                    </div>
                    <p className="card-text">{props.name}</p>
                </div>
                <div className="card-body">
                    <h5 style={{color:"green"}}>{props.price+" INR"}</h5>
                    <div className = "count">
                        {"quantity  : "+props.quantity} 
                        <div className="btn-group"  style={{marginLeft:"5px"}}>
                            <button onClick={props.increment} type="button" className="btn-small incrementbtn">⬆️</button>
                            <button onClick={props.decrement} type="button" className="btn-small decrementbtn">⬇️</button>
                        </div>
                    </div>
                    <div style={{color:"grey"}}>{"Total : "+props.totalprice+" INR"}</div>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <Link to={props.to}><button type="button" className="btn btn-sm btn-outline-secondary">View</button></Link>
                </div>
            </div>
    </div>
    );
}