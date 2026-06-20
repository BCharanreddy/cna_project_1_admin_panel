import { useState } from "react";
import "../styles/login.css"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import DashboardLayout from "../layouts/DashboardLayout";

function TempLogin(){
    const [email,setEmail] =useState("");
    const [password,setPassword]=useState("");
    const [login,setLogin] =useState(false);
    const navigate =useNavigate();
    const url="http://localhost:5000"
    // function handleLogin(){

    // }
    
    const handleLogin=async (e)=>{
        e.preventDefault();
        const admin={
            email:email,
            password:password
        }
        try{
            const response= await axios.post("http://localhost:5000/api/login",admin);
            if(response.data.message=="Login Successful"){
                alert("Logged in successfully");
                // setLogin(true);
                const token=response.data.token;
                const existAdmin=response.data.admin;
                localStorage.setItem("token",token);
                localStorage.setItem("admin",JSON.stringify(existAdmin));
                navigate("/adminDashboard");
                
            }
            else{
                alert("Invalid Email or Password");
                // setLogin(false);
            }

        }catch(error){
            console.log(error);
            alert("Login Failed");
        }
    }
    // if(login){
    //     return(
    //         <h1>hello Admin</h1>
    //     )
    // }
    return(
        <div className="login">
        <main>
            <div id="img">
                <div>
                    <h1>Welcome Admin</h1>
                    <p>Glad to see you again!.please login to continue your journey</p>
                </div>
            </div>
            <div id="details">
                <div className="heading">
                    <h1>Welcome Admin</h1>
                    <p>Login to your account to continue</p>
                </div>

                <form onSubmit={handleLogin}>
                    <label >Email</label>
                    <br/>
                    <input type="email" placeholder="Enter your mail" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <br/>
                    <label >password</label>
                    <br/>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <br/>
                    <div>
                        <p>
                            <input type="checkbox" />
                            Remember me</p>
                        <span>Forgot Password?</span>
                    </div>
                    <br/>
                    <button type="submit" id="loginBtn">Login</button>

                    <p className="or">or</p>
                    <button>Login With Google</button>

                    <div>
                        <h4>Don't have account..?</h4>
                        <span>Register here</span>
                    </div>

                </form>
            </div>
        </main>
        </div>
    )

}
export default TempLogin;