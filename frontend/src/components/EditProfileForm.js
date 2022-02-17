import React from "react";
import { rooturl } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function ProfileForm(props){
  const navigate = useNavigate()

  const  submithandler=async(e)=>{
    e.preventDefault()
    let token = JSON.parse(localStorage.getItem('authToken')).access
    axios.post(rooturl+'/api/customer-update/', {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        country : e.target.country.value,
        state : e.target.state.value,
        district : e.target.district.value,
        address : e.target.address.value,
        postalcode : e.target.postalcode.value
    },
    {headers:{
      Authorization  :  `Bearer ${token}`
    }})
    .then(function (response) {
      document.getElementById("profileform").style.display = "none";
      document.getElementById("savedprofilecontent").style.display="block";
    })
    .catch(function (error) {
      alert(error)
    });
}
    return(
        <form onSubmit={submithandler} id="profileform" style={props.style}>
          <pre>
            Name       :  <input type="text" name='name' className="formfield" defaultValue={props.name} />
          </pre>
          <pre>
            Email      :  <input type="text" name='email' className="formfield" defaultValue={props.email} />
          </pre>
          <pre>
            Phone      :  <input type="text" name='phone' className="formfield" defaultValue={props.phone}  />
          </pre>
          <pre>
            Country    :  <input type="text" name='country' className="formfield" defaultValue={props.country} />
          </pre>
          <pre>
            State      :  <input type="text" name='state' className="formfield" defaultValue={props.state}  />
          </pre>
          <pre>
            District   :  <input type="text" name='district' className="formfield" defaultValue={props.district} />
          </pre>
          <pre>
            Address    :  <input type="text" name='address' className="formfield" defaultValue={props.address} />
          </pre>
          <pre>
            Postalcode :  <input type="text" name='postalcode' className="formfield" defaultValue={props.postalcode} />
          </pre>
          <input className="btn btn-sm btn-outline-success" value="save" type="submit"/>
        </form>
    )
}