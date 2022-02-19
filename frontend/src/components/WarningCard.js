import React from "react"

export default function Warningcard(props){
    return(
        <div className="card container" style={{marginTop:"2%"}}>
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