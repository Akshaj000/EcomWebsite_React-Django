import React from "react";


export default function CartPage(){
    return(
        <main role="main">
            <div className="album py-5 bg-light">
              <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-4 box-shadow">
                                    <div className="select2-container--classic">
                                    <img className="card-img-top" src="" style={{"object-fit":"contain", maxHeight:"200px", overflow:"hidden", maxWidth:"300px", width:"auto", display: "block", marginLeft: "auto", marginRight: "auto", marginTop:"10px"}} />
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">name</p>
                                        <h5 style={{color:"green"}}>price INR</h5>
                                        <div className = "count">
                                            quantity  : 1 
                                            quantity  : quantity
                                            
                                            <div className="btn-group">
                                                <a href=""><button type="button" className="btn-small">+</button></a>
                                                <a href=""><button type="button" className="btn-small  ">--</button></a>
                                            </div>
                                        </div>
                                        <div>Total : totalprice INR</div>
                                        <br/>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <br/>
                                            <div className="btn-group">
                                            <a href=""><button type="button" className="btn btn-sm btn-outline-secondary">View</button></a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="list-group-item d-flex justify-content-between">
                        <h4>Total price : </h4>
                        <h3 style={{color:"green"}}><strong>totalprice INR</strong></h3>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <a  href=""><button type="button" className="btn btn-lg btn-outline-success updatecart">CHECKOUT</button></a>
                    </div>
                </div>
            </div>
        </main>
    )
}