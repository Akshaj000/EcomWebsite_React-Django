import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function ChangePasscodeForm(){

    let {changePassword} = useContext(AuthContext)

    return(
        <div className="card mb-4 box-shadow loginclose ">
            <h1 className="head">Change password</h1>
            <div className ="body">
            <form onSubmit={changePassword}>
                <h3 style={{color:"red"}}>error here</h3>
                <input className="loginfield" type="password" name="old_password" placeholder="Enter old Password" required/>
                <input className="loginfield" type="password" name="new_password" placeholder="Enter new Password" required/>
                <input className="loginfield" type="password" name="new_password2" placeholder="Confirm new Password"  required/>
                <input class ="btnlog" type="submit" value="Change Password" />
            </form>
              <Link className="nav-link px-2 text-muted" to="/">Home</Link>
            </div>
        </div>

    )
}