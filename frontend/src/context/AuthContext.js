import { 
createContext,     
useState,
useEffect } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export  const AuthProvider = ({children}) => {

    let token = localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem('authToken')):null
    let localuser = token? jwt_decode(token.access):null
    let [authToken,setAuthToken] = useState(()=>token)
    let [user,setUser] = useState(()=>localuser)
    let [loading,setLoading]= useState(true)

    const navigate = useNavigate()

    let loginUser = async (e)=>{
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/token/', {
            username: e.target.username.value,
            password: e.target.password.value
          })
          .then(function (response) {
              setAuthToken(response.data)
              setUser(jwt_decode(response.data.access))
              localStorage.setItem('authToken',JSON.stringify(response.data))
              navigate('/')
          });
    }

    let logoutUser=() =>{
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        navigate('login/')
    }

    let updateToken = async()=>{
        token = JSON.parse(localStorage.getItem('authToken')).refresh
        axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh:token
        })
        .then(function (response) {
            setAuthToken(response.data)
            setUser(jwt_decode(response.data.access))
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
        logoutUser:logoutUser
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