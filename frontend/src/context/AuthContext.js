import { 
createContext,     
useState,
useEffect } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {rooturl} from "../utils/functions"

const AuthContext = createContext()

export default AuthContext;

export  const AuthProvider = ({children}) => {

    let token = localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem('authToken')):null
    let localuser = token? jwt_decode(token.access):null
    let [authToken,setAuthToken] = useState(()=>token)
    let [user,setUser] = useState(()=>localuser)
    let [isSuperUser,setIsSuperUser] = useState(false)
    let [loading,setLoading]= useState(true)

    const navigate = useNavigate()

    let loginUser = async (e)=>{
        e.preventDefault()
        axios.post(rooturl+'/api/token/', {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(function (response) {
            setAuthToken(response.data)
            let user = jwt_decode(response.data.access)
            setUser(user)
            setIsSuperUser(user.superuser)
            localStorage.setItem('authToken',JSON.stringify(response.data))
            navigate('/')
        })
        .catch(function (error) {
            document.getElementById("loginOT").style.display = "block";
        });
    }
    
    let registerUser = async(e)=>{
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        if(e.target.password.value==e.target.confirmpassword.value){
            axios.post(rooturl+'/api/register/', {
                username: username,
                password: password
            })
            .then(function () {
                loginUser(e)
            })
            .catch(function (e) {
                document.getElementById("signupOT").style.display = "block";
            });
        }
        else{
            document.getElementById("signupPNM").style.display = "block";
            navigate('/signup')
        }
        
    }
    let changePassword = async(e)=>{
        e.preventDefault()
        if(e.target.new_password.value===e.target.new_password2.value){
            let token = JSON.parse(localStorage.getItem('authToken')).access
            axios.patch(rooturl+'/api/change-password/', {
                old_password : e.target.old_password.value,
                new_password : e.target.new_password.value,
            },
            {headers:{
            Authorization  :  `Bearer ${token}`
            }})
            .then(res => {
                navigate("/login")
            })
            .catch(err => {
                alert(err)
                console.log(err)
            })
        }
        

    }

    let logoutUser=() =>{
        
        setAuthToken(null)
        setIsSuperUser(false)
        setUser(null)
        localStorage.removeItem('authToken')
        navigate('login/')
    }

    let updateToken = async()=>{
        token = JSON.parse(localStorage.getItem('authToken')).refresh
        axios.post(rooturl+'/api/token/refresh/', {
            refresh:token
        })
        .then(function (response) {
            setAuthToken(response.data)
            let user = jwt_decode(response.data.access)
            setUser(user)
            setIsSuperUser(user.superuser)
            localStorage.setItem('authToken',JSON.stringify(response.data))
            navigate('/')
        })
        .catch(function (error) {
            logoutUser()
        });

        if (loading){
            setLoading(false)
        }
    }


    let contextData ={
        authToken:authToken,
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser,
        changePassword:changePassword,
        isSuperUser:isSuperUser
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let fourMinutes = 1000*60*4
        let interval = setInterval(() => {
            if(authToken){
                updateToken()
            }
        },fourMinutes)
        return ()=>clearInterval(interval)

    },[authToken, loading])

    return(
        <AuthContext.Provider value={contextData}>
          {children}
        </AuthContext.Provider>
    )
}