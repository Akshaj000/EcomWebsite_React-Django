import React from "react"

export default function Warningcard(props){
    return(
        <div className="container">
            <div className="">
                <div className="card-body">
                      <br/>
                      <h4 style={{"text-align": "center", color:"#FF7F50"}}>{props.message}</h4>
                      <br/>
                </div>
            </div>
        </div>
    )
}