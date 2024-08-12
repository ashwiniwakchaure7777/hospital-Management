import React ,{useContext, useState} from 'react'
import { Context } from '../index';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const Login = () => {

    const {isAuthenticated, setIsAuthenticated} = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/userRouter/login",
        {email, password, confirmPassword, role: "Admin" },
        { withCredentials:true,
          headers:{"Content-Type":"application/json"},
        });
        toast.success(response.data.message);
        setIsAuthenticated(true);
        navigate("/");
        
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if(isAuthenticated){
    return navigate("/login");
  }
    
  return (<>
    
    <div className='container form-component'>
        <img src='/logo.png' alt='logo' className='logo'/>
        <h1 className='form-title'>Welcome to ZeeCare</h1>
        <p>Only Admin can accessed these resources</p>
      <form onSubmit={handleLogin}>
          <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/>
          <input type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='confirm password'/>
           
            <div style={{justifyContent:"center", alignItems:"center"}}>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  
  </>
    
  )
}

export default Login