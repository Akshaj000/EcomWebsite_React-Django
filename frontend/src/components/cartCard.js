import React from "react";
import { Link } from "react-router-dom";

export default function CartListCard(props){
    const imagestyle ={
        "object-fit":"contain",
        maxHeight:"200px", 
        overflow:"hidden", 
        maxWidth:"300px",
        width:"auto", display: "block", 
        marginLeft: "auto", 
        marginRight: "auto", 
        marginTop:"20px"
    }
    return(
        <div className="col-md-4">
            <div className="card mb-4 box-shadow">
                <div className="select2-container--classic">
                    <img className="card-img-top" src={props.image} style={imagestyle} />
                </div>
                <div className="card-body">
                    <h4 className="card-text">{props.name}</h4>
                    <h5 style={{color:"green"}}>{props.price+" INR"}</h5>
                    <div className = "count">
                        {"quantity  : "+props.quantity} 
                        <div className="btn-group"  style={{marginLeft:"5px"}}>
                            <button onClick={props.increment} type="button" className="btn-small">⬆️</button>
                            <button onClick={props.decrement} type="button" className="btn-small">⬇️</button>
                        </div>
                    </div>
                    <div style={{color:"grey"}}>{"Total : "+props.totalprice+" INR"}</div>
                    <br/>
                    <div className="d-flex justify-content-between align-items-center">
                        <br/>
                        <div className="btn-group">
                        <Link to={props.to}><button type="button" className="btn btn-sm btn-outline-secondary">View</button></Link>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    );
}