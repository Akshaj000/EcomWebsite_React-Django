import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom";

const SignupPage = () => {
    let {registerUser} =  useContext(AuthContext)
    return(
        <div className="card mb-4 box-shadow loginclose">
            <h1 className="head">Login!</h1>
            <div className ="body">
            <form onSubmit={registerUser}>
                <h3 style={{color:"red"}}><p id="signupOT" style={{display:"none"}}>A user with that username already exists.</p><p id="signupPNM" style={{display:"none"}}>Password didn't Match.</p></h3>
                <input className="loginfield" type="text" name="username" placeholder="Enter Username" required />
                <input className="loginfield" type="password" name="password" placeholder="Enter Password"  required/>
                <input className="loginfield" type="password" name="confirmpassword" placeholder="Confirm Password"  required/>
                <input className ="btnlog" type="submit" value= "Register" />
            </form>
            <Link to="/login"><button className="btnlog">Login</button></Link>
            <Link className="nav-link px-2 text-muted" to="/">Home</Link>
            </div>
        </div>
    );
}


export default SignupPage