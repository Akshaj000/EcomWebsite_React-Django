import React from "react";
import axios from "axios";
import { rooturl } from "../utils/functions";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProfileForm from "../components/EditProfileForm";

export default function ProfilePage(){
    let Token = JSON.parse(localStorage.getItem('authToken')).access
    let data ;
    let {user} = useContext(AuthContext)

    const editbtnhandler=()=>{
        document.getElementById("profileform").style.display = "block";
        document.getElementById("savedprofilecontent").style.display="none";
    }

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

    return(
        <main>
            <div className="container" style={{padding:"20px"}}>
                <div className="card">
                        <div className="container" style={{"text-align":"justify",padding:"50px"}}>
                            <h5><strong>@{user.username}</strong></h5>
                        </div>
                        <div className="container" style={{"text-align":"justify",paddingRight:"50px",paddingBottom:"50px",paddingLeft:"50px"}}>
                            <div id="savedprofilecontent" style={{display:"block"}}>
                                <pre><p>Name       :  {customerDetail.name}</p></pre>
                                <pre><p>Email      :  {customerDetail.email}</p></pre>
                                <pre><p>Phone      :  {customerDetail.phone}</p></pre>
                                <pre><p>Country    :  {customerDetail.country}</p></pre>
                                <pre><p>State      :  {customerDetail.state}</p></pre>                                  
                                <pre><p>District   :  {customerDetail.district}</p></pre>
                                <pre><p>Address    :  {customerDetail.address}</p></pre>
                                <pre><p>Postalcode :  {customerDetail.postalcode}</p></pre>
                                <button type="button" onClick={()=>editbtnhandler()} style={{margin:"1px","alignContent":"right"}} className="btn btn-sm btn-outline-warning">EDIT</button>
                            </div>
                            <ProfileForm
                            style={{display:"none"}} 
                            photo={customerDetail.photo}
                            name={customerDetail.name} 
                            email={customerDetail.email} 
                            phone={customerDetail.phone} 
                            country={customerDetail.country}
                            state={customerDetail.state}
                            district={customerDetail.district}
                            address={customerDetail.address}
                            postalcode={customerDetail.postalcode}
                            />
                        </div>
                </div>
            </div>
        </main>
    )
}