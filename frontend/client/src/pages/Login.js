import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useContext } from "react"
import axios from "axios"
export default function Login(){
      const {handleLogin}=useContext(AuthContext)
      const navigate=useNavigate()
      const [formData,setFormData]=useState({
        email:"",
        password:""
      })
      const [clientErrors,setClientErrors]=useState(null)
      const [serverErrors,setServerErrors]=useState(null)
      const clientValidationErrors={}

      const runClientValidations=()=>{
        if(formData.password.trim().length===0){
            clientValidationErrors.password="password is required"
        }
        if(formData.email.trim().length===0){
            clientValidationErrors.password="email is required"
        }
      }
      
      const  handleSubmit=async(e)=>{
        e.preventDefault()
        runClientValidations()
        console.log(clientValidationErrors)
        if(Object.keys(clientValidationErrors).length===0){
            try{
            //  console.log(formData)
            const response=await axios.post('http://localhost:3010/api/users/login',formData)
            localStorage.setItem('token',response.data.token)
            const userResponse=await axios.get('http://localhost:3010/api/users/account',{headers:{Authorization:localStorage.getItem('token')}})
            handleLogin(userResponse.data)
            navigate('/dashboard')
            // console.log(userResponse.data)
            // console.log(response.data)
            }catch(err){
                console.log(err)
              setServerErrors(err.response.data.error)
            }
        }
        else{
            setClientErrors(clientValidationErrors)
        }

      }
    return (
        <>
             <h2>Login page</h2>
             {serverErrors&&(
                <div>
                    <h3>{serverErrors}</h3>
                    {/* <ul>
                        {serverErrors.map((ele,i)=>{
                            return <li key={i}>{ele.msg}</li>
                        })}
                    </ul> */}
                </div>
             )}
              <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            value={formData.email} 
            onChange={(e)=>setFormData({...formData,email:e.target.value})} 
            placeholder="enter Email" />
            <br />
            {clientErrors&&<p className="clientErrors" >{clientErrors.email}</p>}

            <input type="password" 
            value={formData.password} 
            onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
            placeholder="enter password" />
            <br />
            {clientErrors&&<p className="clientErrors">{clientErrors.password}</p>}

            {/* <input type="radio"     
            name="role"
            value="buyer"
            id="buyer"
            onChange={(e)=>{setFormData({...formData,role:e.target.value})}}/>
            <label htmlFor="buyer">Buyer</label>

            <input type="radio" 
            name="role"
            value="seller"
            id="seller"
            onChange={(e)=>{setFormData({...formData,role:e.target.value})}}/>
            <label htmlFor="seller" >seller</label><br />
            {clientErrors&&<p className="clientErrors">{clientErrors.role}</p>} */}


            <input type="submit"/>
        



         

        </form>
            
        </>
        
    )
}