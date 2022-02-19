import React from "react"
import axios from "axios"

export let rooturl ="http://127.0.0.1:8000"

export function increment(id){
    let Token = JSON.parse(localStorage.getItem('authToken')).access
    axios.get(rooturl+'/api/cart-add/'+id+"/",{
        headers:{
            'Authorization':`Bearer ${Token}`
        }
    })

}

export function decrement(id){
    let Token = JSON.parse(localStorage.getItem('authToken')).access
    axios.get(rooturl+'/api/cart-remove/'+id+"/false/",{
        headers:{
            'Authorization':`Bearer ${Token}`
        }
    }).then(res=>{})

}


export function removecart(id){
    console.log("here",id)
    let Token = JSON.parse(localStorage.getItem('authToken')).access
    axios.delete(rooturl+'/api/cart-remove/'+id+"/true/",{
        headers:{
            'Authorization':`Bearer ${Token}`
        }
    }).then(res=>{})
}
