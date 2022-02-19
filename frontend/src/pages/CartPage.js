import React, { useState } from "react";
import axios from "axios";
import CartListCard from "../components/cartCard";
import { useContext} from "react";
import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";
import { useNavigate } from 'react-router';
import {increment, decrement} from '../utils/functions'
import Warningcard from "../components/WarningCard";
import { Link } from "react-router-dom";
import Googlepaybutton from "../components/googlepaycard";


export default function CartPage(){
    let {productList} = useContext(ProductContext)
    let {fetchCart} = useContext(CartContext)
    let [shouldfetch,setShouldfetch]=useState(true)
    if(shouldfetch){
        fetchCart()
    }
    let {cartList}  = useContext(CartContext)
    let totalprice = 0
    let cards = []
    
    if(cartList.length>0){
        for (let i=0  ; i<cartList.length;i++){
            for (let j=0  ; j<productList.length;j++){
                if(productList[j].id===cartList[i].product){
                    let tp = parseFloat(cartList[i].count)*parseFloat(productList[j].price)
                    totalprice+=tp
                    cards.push(
                        <CartListCard
                        to={'/product/'+productList[j].id+"/"}
                        name ={productList[j].name}
                        image={"http://127.0.0.1:8000"+productList[j].image}
                        price = {parseFloat(productList[j].price)}
                        quantity = {cartList[i].count}
                        increment = {function(){
                            increment(productList[j].id)
                        }}
                        decrement = {function(){
                            decrement(productList[j].id)
                        }}
                        totalprice = {tp.toFixed(2)}
                        />
                    )
                }
            }
        }
    }
    else {
        cards.push(
            <Warningcard message="🛒 Cart is Empty"/>
        )
    }


    let handleOnClick=()=>{
        setShouldfetch(false)
        var elements=document.getElementsByClassName("incrementbtn")
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
        var elements=document.getElementsByClassName("decrementbtn")
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
        document.getElementById("checkoutbutton").style.display="none"
    }

    let handleOnCancel=()=>{
        setShouldfetch(true)
        var elements=document.getElementsByClassName("incrementbtn")
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "block";
        }
        var elements=document.getElementsByClassName("decrementbtn")
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "block";
        }
        document.getElementById("checkoutbutton").style.display="block"
    }

    return(
        <main class="main" >
            <div className="album py-5 bg-light" style={{marginLeft:"5%",marginRight:"5%"}}>
                    <div className="row">
                        {cards}
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <h4>Total price : </h4>
                        <h3 style={{color:"green"}}><strong>{totalprice.toFixed(2)} INR</strong></h3>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        {shouldfetch ?
                        <button onClick={()=>handleOnClick()} id="checkoutbutton" type="button" className="btn btn-lg btn-outline-success updatecart">CHECKOUT</button>
                        :
                        <>
                          <Googlepaybutton id="googlepaybutton" style={{display:"none"}} totalPrice={totalprice.toFixed(2)}/>
                          <button onClick={()=>handleOnCancel()} id="cancelpaybutton" type="button" className="btn btn-lg btn-outline-secondary updatecart">cancel</button>
                        </>
                        }
                    </div>
                </div>
        </main>
    )
}


