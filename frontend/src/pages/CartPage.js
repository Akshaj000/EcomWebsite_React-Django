import React from "react";
import axios from "axios";
import CartListCard from "../components/cartCard";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";
import { useState } from "react";

export default function CartPage(){
    let {productList} = useContext(ProductContext)
    let {cartList}  = useContext(CartContext)
    let totalprice = 0
    let cards = []
    let rooturl ="http://127.0.0.1:8000"
    console.log(cartList.length)

    for (let i=0  ; i<cartList.length;i++){
        for (let j=0  ; j<productList.length;j++){
            if(productList[j].id===cartList[i].product){
                totalprice+=parseFloat(productList[j].price)
                cards.push(
                    <CartListCard
                    to={'/product/'+productList[j].id+"/"}
                    name ={productList[j].name}
                    image={rooturl+productList[j].image}
                    price = {parseFloat(productList[j].price)}
                    quantity = {cartList[i].count}
                    totalprice = {parseFloat(cartList[i].count)*parseFloat(productList[j].price)}
                    />
                )
            }
        }
    }
    console.log(cards)
    return(
        <main role="main">
            <div className="album py-5 bg-light">
            <div className="container">
                    <div className="row">
                        {cards}
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <h4>Total price : </h4>
                        <h3 style={{color:"green"}}><strong>{totalprice} INR</strong></h3>
                    </div>
                    <div className="list-group-item d-flex justify-content-between">
                        <a  href=""><button type="button" className="btn btn-lg btn-outline-success updatecart">CHECKOUT</button></a>
                    </div>
                </div>
            </div>
        </main>
    )
}


