import React from "react";
import axios from "axios";
import { rooturl } from "../utils/functions";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function ProfilePage(){
    let Token = JSON.parse(localStorage.getItem('authToken')).access
    let data ;
    let {user} = useContext(AuthContext)
    let [customerDetail,setCustomerDetail] = useState([])
    axios.get(rooturl+'/api/customer-detail/',{
        headers:{
            'Authorization':`Bearer ${Token}`
        }
    })
    .then(res => {
        data = res.data;
        setCustomerDetail(data)
    })
    .catch(err => {
        console.log(err)
    })
    let image = []
    if (customerDetail.photo){
        image = <img id="profilepic" src={rooturl+customerDetail.photo} className="img-fluid profile-image" width="70"/>
    }
    return(
        <div className="container" style={{padding:"20px"}}>
            <div className="card">
                    <div className="container" style={{"text-align":"justify",padding:"50px"}}>
                    <h5 className="" ><strong>@{user.username}</strong></h5>
                    </div>
                    {image}
                    <div className="container" style={{"text-align":"justify",padding:"50px"}}>
                        <p className=" " >name : {customerDetail.name}</p>
                        <p className=" ">email : {customerDetail.email}</p>
                        <p className="">phone : {customerDetail.phone}</p>
                        <p className="">Country : {customerDetail.country}</p>
                        <p className="">State : {customerDetail.state}</p>                                  
                        <p className=" ">District : {customerDetail.district}</p>
                        <p className="">Address : {customerDetail.address}</p>
                        <p className="">postalcode : {customerDetail.postalcode}</p>
                        <Link to=""><button type="button" style={{margin:"1px","alignContent":"right"}} className="btn btn-sm btn-outline-warning">EDIT</button></Link>
                    </div>
            </div>
        </div>
    )
}