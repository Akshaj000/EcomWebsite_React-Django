import React from "react";
import { useContext } from "react";
import Warningcard from "../components/WarningCard";
import OrderContext from "../context/OrderContext";
import ProductContext from "../context/ProductContext";
import { Link } from "react-router-dom";

export default function Order(){

    let {orderList} = useContext(OrderContext)
    let{productList} = useContext(ProductContext)
    let {setThisOrder} = useContext(OrderContext)

    let giveoutName=(id)=>{
        for (let i=0;i<productList.length;i++){
            if (productList[i].id===id){
                return(productList[i].name)
            }
        }
    }

    let onClickhandler=(order)=>{
        setThisOrder(order)
    }

    return(
        <main class="main">
        <div class="card" style={{padding:"2%",marginTop:"2%",marginRight:"5%",marginLeft:"5%"}}>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your Orders</span>
                <span className="badge bg-primary text-white rounded-pill">{orderList.length}</span>
            </h4>
            <ul className="list-group mb-3">
            {orderList.length>0? orderList.map(order=>(

                <li className="list-group-item d-flex justify-content-between lh-sm ">
                <div>
                    <Link to={"/invoice/"+order.id+"/"}><h6 onClick={()=>onClickhandler(order)} className="my-0"><span className="text-secondary">{giveoutName(order.product)}</span><span className="text-info"><strong>{" x "+order.count}</strong></span></h6></Link>
                    <small className="text-muted">{order.date_ordered.substring(0,10)}</small>
                </div>
                {order.payment_status?
                    <span style={{color:"green"}} >{order.totalprice+" INR"}</span>
                :
                    <span style={{color:"red"}}>{order.totalprice+" INR"}</span> 
                }
                </li>
            )):
            <Warningcard message="No orders found!"/>
            }
            </ul>
        </div>
        </main>

    )
}