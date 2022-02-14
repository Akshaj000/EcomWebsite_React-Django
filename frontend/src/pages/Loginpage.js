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
                <h3 style={{color:"red"}}>eorrohere</h3>
                <p>username:</p>
                <input className="loginfield" type="text" name="username" placeholder="Enter Username" required />
                <p>Password:</p>
                <input className="loginfield" type="password" name="password" placeholder="Enter Password"  required/>
                <input className ="btnlog" type="submit" value= "Login" />
            </form>
            <a href=""><button className="btnlog">Sign up</button></a>
            <Link className="nav-link px-2 text-muted" to="/">Home</Link>
            </div>
        </div>
    );
}


export default LoginPage