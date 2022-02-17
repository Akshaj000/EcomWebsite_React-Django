import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom";

const LoginPage = () => {
    let {loginUser} =  useContext(AuthContext)
    return(
        <div className="card mb-4 box-shadow loginclose">
            <h1 className="head">Login!</h1>
            <div className ="body">
            <form onSubmit={loginUser} >
                <h3 style={{color:"red"}}><p id="loginOT" style={{display:"none"}}>Incorrect password or username.</p></h3>
                <input className="loginfield" type="text" name="username" placeholder="Enter Username" required />
                <input className="loginfield" type="password" name="password" placeholder="Enter Password"  required/>
                <input className ="btnlog" type="submit" value= "Login" />
            </form>
            <Link to="/signup"><button className="btnlog">Sign up</button></Link>
            <Link className="nav-link px-2 text-muted" to="/">Home</Link>
            </div>
        </div>
    );
}


export default LoginPage